/**
 * CTFL Bug Hunter 3D: Nhà Cung Cấp AI Đa Nền Tảng & Bộ Sinh Đề Thi Động
 * Tham chiếu kiến trúc LLMProvider / AIChatController / AIConfigManager từ esg-backend:
 *  - Hỗ trợ OpenRouter (mặc định openrouter/auto), Google Gemini, Ollama (Local AI), OpenAI
 *  - Bể khóa API (API Key Pool) với chiến lược Failover tức thì 0s & Round-Robin
 *  - Tải danh sách model thực tế & Ping kiểm tra toàn bộ từng key kèm độ trễ ms
 *  - AI soạn đề thi mới dựa trực tiếp trên Giáo trình Tiếng Việt ISTQB CTFL v4.0.1
 *  - Bộ sinh câu hỏi biến thể động K3 tức thì (không cần API key) & Đảo đáp án chống học vẹt
 *  - Gia sư AI giải đáp bài học theo từng mục giáo trình
 */
(function (global) {
  'use strict';

  const CONFIG_STORAGE_KEY = 'ctfl_ai_config_v1';
  const GENERATED_QUESTIONS_KEY = 'ctfl_ai_generated_questions_v1';
  const ROUND_ROBIN_STORAGE_KEY = 'ctfl_ai_rr_index_v1';

  const FAILOVER_HTTP_STATUSES = new Set([401, 402, 403, 429, 500, 502, 503]);

  const DEFAULT_CONFIG = {
    provider: 'openrouter',
    model: 'openrouter/auto',
    endpoint: 'https://ai-api.congnghevietha.vn',
    apiKeys: [],
    rotationStrategy: 'failover', // 'failover' | 'round_robin'
    temperature: 0.4,
    filterFreeOnly: true
  };

  const FALLBACK_MODELS = {
    openrouter: [
      {
        id: 'openrouter/auto',
        name: 'Free Models Router - Tự động chọn model miễn phí tốt nhất',
        isFree: true,
        context_length: 128000
      },
      {
        id: 'google/gemini-2.0-flash-exp:free',
        name: 'Google: Gemini 2.0 Flash Experimental (Miễn phí)',
        isFree: true,
        context_length: 1048576
      },
      {
        id: 'deepseek/deepseek-chat:free',
        name: 'DeepSeek: DeepSeek V3 Chat (Miễn phí)',
        isFree: true,
        context_length: 64000
      },
      {
        id: 'qwen/qwen-2.5-72b-instruct:free',
        name: 'Qwen: Qwen 2.5 72B Instruct (Miễn phí)',
        isFree: true,
        context_length: 32768
      },
      {
        id: 'meta-llama/llama-3.3-70b-instruct:free',
        name: 'Meta: Llama 3.3 70B Instruct (Miễn phí)',
        isFree: true,
        context_length: 131072
      },
      {
        id: 'google/gemini-2.0-flash-001',
        name: 'Google: Gemini 2.0 Flash 001',
        isFree: false,
        context_length: 1048576
      }
    ],
    ollama: [
      { id: 'qwen3.5:9b', name: 'Qwen 3.5 (9B) - Local', isFree: true },
      { id: 'llama3.3:70b', name: 'Llama 3.3 (70B) - Local', isFree: true },
      { id: 'deepseek-r1', name: 'DeepSeek R1 - Local', isFree: true }
    ],
    gemini: [
      { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', isFree: true },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', isFree: true },
      { id: 'gemini-2.0-flash-lite', name: 'Gemini 2.0 Flash Lite', isFree: true }
    ],
    openai: [
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', isFree: false },
      { id: 'gpt-4o', name: 'GPT-4o', isFree: false }
    ]
  };

  // =========================================================================
  // Tiện ích lưu trữ & xử lý chuỗi an toàn
  // =========================================================================

  function safeGetStorage(key) {
    try {
      if (typeof localStorage === 'undefined') return null;
      return localStorage.getItem(key);
    } catch (_e) {
      return null;
    }
  }

  function safeSetStorage(key, value) {
    try {
      if (typeof localStorage === 'undefined') return false;
      localStorage.setItem(key, value);
      return true;
    } catch (_e) {
      return false;
    }
  }

  function nowMs() {
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      return performance.now();
    }
    return Date.now();
  }

  /**
   * Chuẩn hóa bể khóa API từ mảng hoặc chuỗi ngăn cách bằng dấu phẩy, chấm phẩy, xuống dòng
   * Giống hàm getApiKeysPool() trong esg-backend
   */
  function parseApiKeys(input) {
    if (!input) return [];
    const rawList = Array.isArray(input)
      ? input
      : String(input).split(/[\n,;]+/);

    const seen = new Set();
    const cleaned = [];
    for (let i = 0; i < rawList.length; i++) {
      const k = String(rawList[i] || '').trim();
      if (k && !seen.has(k)) {
        seen.add(k);
        cleaned.push(k);
      }
    }
    return cleaned;
  }

  /**
   * Che khóa API an toàn kiểu sk-or-v1••••abcd
   */
  function maskApiKey(key) {
    const k = String(key || '').trim();
    if (!k) return '(trống)';
    if (k.length <= 8) {
      return k.slice(0, 2) + '••••' + k.slice(-2);
    }
    if (k.length <= 14) {
      return k.slice(0, 4) + '••••' + k.slice(-4);
    }
    return k.slice(0, 8) + '••••' + k.slice(-4);
  }

  function normalizeEndpoint(endpoint) {
    const raw = String(endpoint || DEFAULT_CONFIG.endpoint).trim();
    return raw.replace(/\/+$/, '');
  }

  function getConfig() {
    const raw = safeGetStorage(CONFIG_STORAGE_KEY);
    let parsed = {};
    if (raw) {
      try {
        parsed = JSON.parse(raw) || {};
      } catch (_e) {
        parsed = {};
      }
    }

    const provider = ['openrouter', 'gemini', 'ollama', 'openai'].includes(parsed.provider)
      ? parsed.provider
      : DEFAULT_CONFIG.provider;

    const apiKeys = parseApiKeys(parsed.apiKeys !== undefined ? parsed.apiKeys : parsed.apiKey);
    const rotationStrategy = parsed.rotationStrategy === 'round_robin' ? 'round_robin' : 'failover';
    const tempNum = Number(parsed.temperature);
    const temperature = Number.isFinite(tempNum) ? Math.min(1.5, Math.max(0, tempNum)) : DEFAULT_CONFIG.temperature;

    return {
      provider,
      model: String(parsed.model || DEFAULT_CONFIG.model).trim() || DEFAULT_CONFIG.model,
      endpoint: normalizeEndpoint(parsed.endpoint || DEFAULT_CONFIG.endpoint),
      apiKeys,
      rotationStrategy,
      temperature,
      filterFreeOnly: parsed.filterFreeOnly !== undefined ? Boolean(parsed.filterFreeOnly) : DEFAULT_CONFIG.filterFreeOnly
    };
  }

  function saveConfig(newConfig) {
    const current = getConfig();
    const incoming = newConfig || {};
    const merged = {
      provider: ['openrouter', 'gemini', 'ollama', 'openai'].includes(incoming.provider)
        ? incoming.provider
        : current.provider,
      model: incoming.model !== undefined ? String(incoming.model).trim() : current.model,
      endpoint: incoming.endpoint !== undefined ? normalizeEndpoint(incoming.endpoint) : current.endpoint,
      apiKeys: incoming.apiKeys !== undefined
        ? parseApiKeys(incoming.apiKeys)
        : (incoming.apiKey !== undefined ? parseApiKeys(incoming.apiKey) : current.apiKeys),
      rotationStrategy: incoming.rotationStrategy === 'round_robin'
        ? 'round_robin'
        : (incoming.rotationStrategy === 'failover' ? 'failover' : current.rotationStrategy),
      temperature: incoming.temperature !== undefined
        ? Math.min(1.5, Math.max(0, Number(incoming.temperature) || 0))
        : current.temperature,
      filterFreeOnly: incoming.filterFreeOnly !== undefined
        ? Boolean(incoming.filterFreeOnly)
        : current.filterFreeOnly
    };

    if (!merged.model) {
      merged.model = merged.provider === 'openrouter'
        ? 'openrouter/auto'
        : (FALLBACK_MODELS[merged.provider]?.[0]?.id || 'openrouter/auto');
    }

    safeSetStorage(CONFIG_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  }

  function resetConfig() {
    safeSetStorage(CONFIG_STORAGE_KEY, JSON.stringify(DEFAULT_CONFIG));
    return getConfig();
  }

  function getRoundRobinIndex() {
    const raw = safeGetStorage(ROUND_ROBIN_STORAGE_KEY);
    const num = parseInt(raw, 10);
    return Number.isFinite(num) && num >= 0 ? num : 0;
  }

  function advanceRoundRobinIndex(poolLength) {
    if (!poolLength || poolLength <= 0) return 0;
    const next = (getRoundRobinIndex() + 1) % poolLength;
    safeSetStorage(ROUND_ROBIN_STORAGE_KEY, String(next));
    return next;
  }

  // =========================================================================
  // Fetch với Timeout an toàn
  // =========================================================================

  async function fetchWithTimeout(url, options, timeoutMs = 15000) {
    if (typeof fetch !== 'function') {
      throw new Error('Môi trường hiện tại không hỗ trợ fetch API.');
    }
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    let timer = null;
    if (controller) {
      timer = setTimeout(() => controller.abort(), timeoutMs);
    }
    try {
      const fetchOpts = Object.assign({}, options || {});
      if (controller) fetchOpts.signal = controller.signal;
      return await fetch(url, fetchOpts);
    } catch (err) {
      if (err && err.name === 'AbortError') {
        throw new Error(`Hết thời gian chờ phản hồi (${Math.round(timeoutMs / 1000)} giây).`);
      }
      throw err;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  // =========================================================================
  // 2. Tải Danh Sách Models Thực Tế (fetchModels)
  // =========================================================================

  function ensureOpenRouterAutoFirst(models) {
    const autoItem = {
      id: 'openrouter/auto',
      name: 'Free Models Router - Tự động chọn model miễn phí tốt nhất',
      isFree: true,
      context_length: 128000
    };
    const filtered = (models || []).filter(m => m && m.id !== 'openrouter/auto');
    return [autoItem, ...filtered];
  }

  async function fetchModels(providerArg, customEndpointArg, filterFreeOnlyArg) {
    const cfg = getConfig();
    const provider = providerArg || cfg.provider;
    const endpoint = normalizeEndpoint(customEndpointArg || cfg.endpoint);
    const filterFreeOnly = filterFreeOnlyArg !== undefined ? Boolean(filterFreeOnlyArg) : cfg.filterFreeOnly;

    if (provider === 'openrouter') {
      try {
        const res = await fetchWithTimeout('https://openrouter.ai/api/v1/models', { method: 'GET' }, 12000);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        const rawList = Array.isArray(json?.data) ? json.data : [];

        let mapped = rawList.map(m => {
          const promptPrice = Number(m?.pricing?.prompt ?? 1);
          const completionPrice = Number(m?.pricing?.completion ?? 1);
          const isFree = (promptPrice === 0 && completionPrice === 0) ||
            String(m.id || '').includes(':free') ||
            m.id === 'openrouter/auto';
          return {
            id: m.id,
            name: (m.name || m.id) + (isFree ? ' [Miễn phí]' : ''),
            isFree,
            context_length: m.context_length || 0
          };
        });

        if (filterFreeOnly) {
          mapped = mapped.filter(m => m.isFree);
        }

        mapped.sort((a, b) => {
          if (a.isFree !== b.isFree) return a.isFree ? -1 : 1;
          return String(a.id).localeCompare(String(b.id));
        });

        const finalModels = ensureOpenRouterAutoFirst(mapped);
        return {
          success: true,
          provider: 'openrouter',
          models: finalModels,
          fromFallback: false,
          message: `Đã tải ${finalModels.length} model từ OpenRouter.`
        };
      } catch (err) {
        const fb = filterFreeOnly
          ? FALLBACK_MODELS.openrouter.filter(m => m.isFree)
          : FALLBACK_MODELS.openrouter.slice();
        return {
          success: true,
          provider: 'openrouter',
          models: ensureOpenRouterAutoFirst(fb),
          fromFallback: true,
          message: `Không thể kết nối OpenRouter (${err.message}). Đang dùng danh sách model dự phòng.`
        };
      }
    }

    if (provider === 'ollama') {
      try {
        const res = await fetchWithTimeout(`${endpoint}/api/tags`, { method: 'GET' }, 10000);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const rawModels = Array.isArray(json?.models) ? json.models : [];
        const mapped = rawModels.map(m => ({
          id: m.name || m.model,
          name: `${m.name || m.model} (Local AI)`,
          isFree: true
        })).filter(m => m.id);

        if (mapped.length === 0) {
          throw new Error('Endpoint chưa có model nào được tải về');
        }
        return {
          success: true,
          provider: 'ollama',
          models: mapped,
          fromFallback: false,
          message: `Đã tải ${mapped.length} model từ Ollama (${endpoint}).`
        };
      } catch (err) {
        return {
          success: true,
          provider: 'ollama',
          models: FALLBACK_MODELS.ollama.slice(),
          fromFallback: true,
          message: `Không kết nối được Ollama tại ${endpoint} (${err.message}). Đang dùng danh sách mặc định.`
        };
      }
    }

    if (provider === 'gemini') {
      const key = cfg.apiKeys[0];
      if (!key) {
        return {
          success: true,
          provider: 'gemini',
          models: FALLBACK_MODELS.gemini.slice(),
          fromFallback: true,
          message: 'Chưa có Gemini API Key. Hiển thị danh sách model Gemini gợi ý.'
        };
      }
      try {
        const res = await fetchWithTimeout(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`,
          { method: 'GET' },
          10000
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const rawModels = Array.isArray(json?.models) ? json.models : [];
        const mapped = rawModels
          .filter(m => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent'))
          .map(m => ({
            id: String(m.name || '').replace(/^models\//, ''),
            name: m.displayName || String(m.name || '').replace(/^models\//, ''),
            isFree: true
          }))
          .filter(m => m.id);

        return {
          success: true,
          provider: 'gemini',
          models: mapped.length ? mapped : FALLBACK_MODELS.gemini.slice(),
          fromFallback: mapped.length === 0,
          message: `Đã tải ${mapped.length} model từ Google Gemini.`
        };
      } catch (err) {
        return {
          success: true,
          provider: 'gemini',
          models: FALLBACK_MODELS.gemini.slice(),
          fromFallback: true,
          message: `Lỗi tải danh sách Gemini (${err.message}). Đang dùng danh sách mặc định.`
        };
      }
    }

    if (provider === 'openai') {
      const key = cfg.apiKeys[0];
      if (!key) {
        return {
          success: true,
          provider: 'openai',
          models: FALLBACK_MODELS.openai.slice(),
          fromFallback: true,
          message: 'Chưa có OpenAI API Key. Hiển thị danh sách model OpenAI gợi ý.'
        };
      }
      try {
        const res = await fetchWithTimeout(
          'https://api.openai.com/v1/models',
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${key}` }
          },
          10000
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const rawModels = Array.isArray(json?.data) ? json.data : [];
        const mapped = rawModels
          .filter(m => /^(gpt-|o1|o3|o4)/.test(String(m.id || '')))
          .map(m => ({ id: m.id, name: m.id, isFree: false }))
          .sort((a, b) => a.id.localeCompare(b.id));

        return {
          success: true,
          provider: 'openai',
          models: mapped.length ? mapped : FALLBACK_MODELS.openai.slice(),
          fromFallback: mapped.length === 0,
          message: `Đã tải ${mapped.length} model từ OpenAI.`
        };
      } catch (err) {
        return {
          success: true,
          provider: 'openai',
          models: FALLBACK_MODELS.openai.slice(),
          fromFallback: true,
          message: `Lỗi tải danh sách OpenAI (${err.message}). Đang dùng danh sách mặc định.`
        };
      }
    }

    return {
      success: false,
      provider,
      models: [],
      fromFallback: true,
      message: `Nhà cung cấp không được hỗ trợ: ${provider}`
    };
  }

  // =========================================================================
  // Lõi gọi LLM theo từng Provider & Cơ chế Key Pool Failover 0s
  // =========================================================================

  async function executeSingleProviderRequest({ provider, model, endpoint, apiKey, messages, temperature = 0.4, maxTokens = 2200, timeoutMs = 45000 }) {
    if (provider === 'openrouter' || provider === 'openai') {
      const url = provider === 'openrouter'
        ? 'https://openrouter.ai/api/v1/chat/completions'
        : 'https://api.openai.com/v1/chat/completions';

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      };
      if (provider === 'openrouter') {
        headers['HTTP-Referer'] = typeof location !== 'undefined' && location.origin ? location.origin : 'https://ctfl-game.local';
        headers['X-Title'] = 'CTFL Bug Hunter 3D';
      }

      const res = await fetchWithTimeout(
        url,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            model,
            messages,
            temperature,
            max_tokens: maxTokens
          })
        },
        timeoutMs
      );

      let data = null;
      try {
        data = await res.json();
      } catch (_e) {
        data = null;
      }

      if (!res.ok) {
        const errMsg = data?.error?.message || data?.message || `HTTP ${res.status}`;
        const err = new Error(errMsg);
        err.httpStatus = res.status;
        throw err;
      }

      const text = data?.choices?.[0]?.message?.content;
      if (!text) {
        throw new Error('Phản hồi từ AI không chứa nội dung văn bản.');
      }
      return { text, raw: data };
    }

    if (provider === 'gemini') {
      const cleanModel = String(model || 'gemini-2.0-flash').replace(/^models\//, '');
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(cleanModel)}:generateContent?key=${encodeURIComponent(apiKey)}`;

      const systemMsgs = messages.filter(m => m.role === 'system').map(m => m.content).join('\n\n');
      const userMsgs = messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const payload = {
        contents: userMsgs.length ? userMsgs : [{ role: 'user', parts: [{ text: 'Ping' }] }],
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens
        }
      };
      if (systemMsgs) {
        payload.systemInstruction = { parts: [{ text: systemMsgs }] };
      }

      const res = await fetchWithTimeout(
        url,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        },
        timeoutMs
      );

      let data = null;
      try {
        data = await res.json();
      } catch (_e) {
        data = null;
      }

      if (!res.ok) {
        const errMsg = data?.error?.message || `HTTP ${res.status}`;
        const err = new Error(errMsg);
        err.httpStatus = res.status;
        throw err;
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Gemini không trả về nội dung văn bản.');
      }
      return { text, raw: data };
    }

    if (provider === 'ollama') {
      const base = normalizeEndpoint(endpoint);
      const res = await fetchWithTimeout(
        `${base}/api/chat`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: model || 'qwen3.5:9b',
            messages,
            stream: false,
            options: {
              temperature,
              num_predict: maxTokens
            }
          })
        },
        timeoutMs
      );

      let data = null;
      try {
        data = await res.json();
      } catch (_e) {
        data = null;
      }

      if (!res.ok) {
        const errMsg = data?.error || `HTTP ${res.status}`;
        const err = new Error(errMsg);
        err.httpStatus = res.status;
        throw err;
      }

      const text = data?.message?.content || data?.response;
      if (!text) {
        throw new Error('Ollama không trả về nội dung văn bản.');
      }
      return { text, raw: data };
    }

    throw new Error(`Nhà cung cấp AI không hợp lệ: ${provider}`);
  }

  /**
   * Gọi LLM với cơ chế xoay vòng Key Pool & Failover tức thì 0s
   */
  async function callLLMWithFailover(messages, opts = {}) {
    const cfg = Object.assign({}, getConfig(), opts.configOverride || {});
    const provider = cfg.provider;
    const model = opts.model || cfg.model;
    const temperature = opts.temperature !== undefined ? opts.temperature : cfg.temperature;
    const maxTokens = opts.maxTokens || 2200;
    const timeoutMs = opts.timeoutMs || 45000;

    if (provider === 'ollama') {
      const start = nowMs();
      const result = await executeSingleProviderRequest({
        provider: 'ollama',
        model,
        endpoint: cfg.endpoint,
        apiKey: '',
        messages,
        temperature,
        maxTokens,
        timeoutMs
      });
      return {
        text: result.text,
        provider,
        model,
        keyUsedMasked: cfg.endpoint,
        attempts: [{ index: 0, status: 'active', duration_ms: Math.round(nowMs() - start) }]
      };
    }

    const keys = parseApiKeys(cfg.apiKeys);
    if (keys.length === 0) {
      throw new Error(`Chưa có API Key cho ${provider.toUpperCase()}. Vui lòng mở Cài đặt AI để dán ít nhất 1 khóa API (hoặc dùng nút Sinh Câu Hỏi Động K3 miễn phí không cần Key).`);
    }

    let startIdx = 0;
    if (cfg.rotationStrategy === 'round_robin') {
      startIdx = getRoundRobinIndex() % keys.length;
      advanceRoundRobinIndex(keys.length);
    }

    const orderedIndices = [];
    for (let offset = 0; offset < keys.length; offset++) {
      orderedIndices.push((startIdx + offset) % keys.length);
    }

    const attempts = [];
    let lastError = null;

    for (let i = 0; i < orderedIndices.length; i++) {
      const keyIdx = orderedIndices[i];
      const key = keys[keyIdx];
      const masked = maskApiKey(key);
      const t0 = nowMs();

      try {
        const res = await executeSingleProviderRequest({
          provider,
          model,
          endpoint: cfg.endpoint,
          apiKey: key,
          messages,
          temperature,
          maxTokens,
          timeoutMs
        });
        attempts.push({
          index: keyIdx,
          key_masked: masked,
          status: 'active',
          duration_ms: Math.round(nowMs() - t0),
          message: 'Thành công'
        });
        return {
          text: res.text,
          provider,
          model,
          keyUsedMasked: masked,
          attempts
        };
      } catch (err) {
        const status = err.httpStatus || 0;
        const dur = Math.round(nowMs() - t0);
        attempts.push({
          index: keyIdx,
          key_masked: masked,
          status: 'error',
          http_status: status,
          duration_ms: dur,
          message: err.message
        });
        lastError = err;

        // Failover tức thì 0s nếu gặp lỗi quota/auth/server hoặc lỗi mạng
        const shouldFailover = FAILOVER_HTTP_STATUSES.has(status) || status === 0;
        if (!shouldFailover || i === orderedIndices.length - 1) {
          break;
        }
      }
    }

    const summary = attempts
      .map(a => `Key #${a.index + 1} (${a.key_masked}): ${a.message}`)
      .join(' | ');
    throw new Error(`Tất cả ${keys.length} khóa API đều thất bại. Chi tiết: ${summary || (lastError && lastError.message)}`);
  }

  // =========================================================================
  // 2B. Kiểm Tra Kết Nối Toàn Bộ Key (testAllKeys - chuẩn esg-backend)
  // =========================================================================

  function translateHttpStatusToVi(status, rawMsg) {
    if (status === 401) return 'Khóa API không hợp lệ hoặc đã bị thu hồi (401).';
    if (status === 402) return 'Tài khoản hết tín dụng / quota (402).';
    if (status === 403) return 'Không có quyền truy cập model hoặc bị chặn vùng (403).';
    if (status === 429) return 'Vượt quá giới hạn tốc độ / Rate limit (429).';
    if (status >= 500) return `Lỗi máy chủ nhà cung cấp (${status}).`;
    return rawMsg || 'Lỗi kết nối không xác định.';
  }

  async function testAllKeys(customConfig = {}) {
    const baseCfg = getConfig();
    const incoming = customConfig || {};
    const cfg = {
      provider: incoming.provider || baseCfg.provider,
      model: incoming.model || baseCfg.model,
      endpoint: normalizeEndpoint(incoming.endpoint || baseCfg.endpoint),
      apiKeys: incoming.apiKeys !== undefined
        ? parseApiKeys(incoming.apiKeys)
        : (incoming.apiKey !== undefined ? parseApiKeys(incoming.apiKey) : baseCfg.apiKeys)
    };

    const pingMessages = [
      { role: 'user', content: 'Trả lời đúng 1 từ: OK' }
    ];

    if (cfg.provider === 'ollama') {
      const t0 = nowMs();
      try {
        await executeSingleProviderRequest({
          provider: 'ollama',
          model: cfg.model || 'qwen3.5:9b',
          endpoint: cfg.endpoint,
          apiKey: '',
          messages: pingMessages,
          temperature: 0,
          maxTokens: 10,
          timeoutMs: 12000
        });
        const dur = Math.round(nowMs() - t0);
        return {
          success: true,
          message: `Kết nối Ollama (${cfg.endpoint}) thành công sau ${dur}ms!`,
          total_keys: 1,
          active_keys: 1,
          details: [
            {
              index: 0,
              key_masked: cfg.endpoint,
              status: 'active',
              duration_ms: dur,
              message: `Hoạt động tốt (${cfg.model})`
            }
          ]
        };
      } catch (err) {
        const dur = Math.round(nowMs() - t0);
        return {
          success: false,
          message: `Kết nối Ollama thất bại: ${err.message}`,
          total_keys: 1,
          active_keys: 0,
          details: [
            {
              index: 0,
              key_masked: cfg.endpoint,
              status: 'error',
              duration_ms: dur,
              message: err.message
            }
          ]
        };
      }
    }

    const keys = cfg.apiKeys;
    if (!keys || keys.length === 0) {
      return {
        success: false,
        message: 'Chưa nhập API Key nào để kiểm tra.',
        total_keys: 0,
        active_keys: 0,
        details: []
      };
    }

    const details = [];
    let activeCount = 0;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const masked = maskApiKey(key);
      const t0 = nowMs();
      try {
        await executeSingleProviderRequest({
          provider: cfg.provider,
          model: cfg.model,
          endpoint: cfg.endpoint,
          apiKey: key,
          messages: pingMessages,
          temperature: 0,
          maxTokens: 10,
          timeoutMs: 15000
        });
        const dur = Math.round(nowMs() - t0);
        activeCount++;
        details.push({
          index: i,
          key_masked: masked,
          status: 'active',
          duration_ms: dur,
          message: 'Hoạt động tốt'
        });
      } catch (err) {
        const dur = Math.round(nowMs() - t0);
        const httpStatus = err.httpStatus || 0;
        details.push({
          index: i,
          key_masked: masked,
          status: httpStatus === 429 || httpStatus === 402 ? 'quota_exceeded' : 'error',
          http_status: httpStatus,
          duration_ms: dur,
          message: translateHttpStatusToVi(httpStatus, err.message)
        });
      }
    }

    const success = activeCount > 0;
    const message = success
      ? `Kiểm tra hoàn tất: ${activeCount}/${keys.length} khóa API hoạt động bình thường.`
      : `Không có khóa API nào hoạt động (0/${keys.length}). Vui lòng kiểm tra lại khóa hoặc hạn mức.`;

    return {
      success,
      message,
      total_keys: keys.length,
      active_keys: activeCount,
      details
    };
  }

  // =========================================================================
  // Trích xuất ngữ cảnh Giáo trình Tiếng Việt (RAG Context)
  // =========================================================================

  function extractSyllabusContext(chapterId, sectionCode) {
    const chId = Number(chapterId) || 1;
    const fullSyllabus = global.CTFL_FULL_SYLLABUS_VI;

    if (fullSyllabus && Array.isArray(fullSyllabus.chapters)) {
      if (sectionCode && typeof fullSyllabus.getSection === 'function') {
        const sec = fullSyllabus.getSection(chId, String(sectionCode));
        if (sec && (sec.rawText || sec.html)) {
          const text = sec.rawText || String(sec.html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          return {
            title: `Chương ${chId} - Mục ${sec.code}: ${sec.title || ''}`,
            text: text.slice(0, 10000),
            source: 'CTFL_FULL_SYLLABUS_VI'
          };
        }
      }
      const chap = typeof fullSyllabus.getChapter === 'function'
        ? fullSyllabus.getChapter(chId)
        : fullSyllabus.chapters.find(c => Number(c.id) === chId);

      if (chap && Array.isArray(chap.sections)) {
        const combined = chap.sections
          .map(s => `### ${s.code} ${s.title || ''}\n${s.rawText || String(s.html || '').replace(/<[^>]+>/g, ' ')}`)
          .join('\n\n');
        if (combined.trim()) {
          return {
            title: `Chương ${chId}: ${chap.title || ''}`,
            text: combined.slice(0, 11000),
            source: 'CTFL_FULL_SYLLABUS_VI'
          };
        }
      }
    }

    // Fallback sang CTFL_CHAPTERS_123 / CTFL_CHAPTERS_456
    const fallbackChapters = []
      .concat(Array.isArray(global.CTFL_CHAPTERS_123) ? global.CTFL_CHAPTERS_123 : [])
      .concat(Array.isArray(global.CTFL_CHAPTERS_456) ? global.CTFL_CHAPTERS_456 : []);

    const fbChap = fallbackChapters.find(c => Number(c.id) === chId);
    if (fbChap) {
      let pieces = [`Chương ${fbChap.id}: ${fbChap.title}`, fbChap.summary || ''];
      if (Array.isArray(fbChap.cheatSheet)) {
        const matchingSheets = sectionCode
          ? fbChap.cheatSheet.filter(cs => String(cs.section || '').startsWith(String(sectionCode)))
          : fbChap.cheatSheet;
        const targetSheets = matchingSheets.length ? matchingSheets : fbChap.cheatSheet;
        pieces = pieces.concat(
          targetSheets.map(cs => `${cs.section} ${cs.title}: ${(cs.points || []).join(' ')}`)
        );
      }
      return {
        title: `Chương ${fbChap.id}: ${fbChap.title}`,
        text: pieces.join('\n').slice(0, 9000),
        source: 'CTFL_CHAPTERS_FALLBACK'
      };
    }

    return {
      title: `Chương ${chId} (ISTQB CTFL v4.0.1)`,
      text: 'Kiểm thử phần mềm theo chuẩn ISTQB Foundation Level v4.0.1.',
      source: 'DEFAULT'
    };
  }

  // =========================================================================
  // 4A. Đảo Đáp Án Chống Học Vẹt (shuffleQuestionOptions)
  // =========================================================================

  function stripOptionPrefix(optText) {
    return String(optText || '').replace(/^[A-Da-d][\.\)\:]\s*/, '').trim();
  }

  /**
   * Đảo ngẫu nhiên vị trí 4 phương án A, B, C, D và cập nhật chính xác chỉ số correct (0..3)
   */
  function shuffleQuestionOptions(question) {
    if (!question || !Array.isArray(question.options) || question.options.length !== 4) {
      return question;
    }

    const correctIdx = Number.isInteger(question.correct) && question.correct >= 0 && question.correct < 4
      ? question.correct
      : 0;

    const items = question.options.map((opt, idx) => ({
      body: stripOptionPrefix(opt),
      isCorrect: idx === correctIdx
    }));

    // Fisher-Yates shuffle
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = items[i];
      items[i] = items[j];
      items[j] = tmp;
    }

    const letters = ['A', 'B', 'C', 'D'];
    const newOptions = items.map((item, idx) => `${letters[idx]}. ${item.body}`);
    const newCorrect = items.findIndex(item => item.isCorrect);

    return Object.assign({}, question, {
      options: newOptions,
      correct: newCorrect >= 0 ? newCorrect : 0
    });
  }

  // =========================================================================
  // Parse & Chuẩn hóa JSON Câu hỏi từ LLM
  // =========================================================================

  function cleanLLMJsonString(rawText) {
    let text = String(rawText || '').trim();
    // Loại bỏ thẻ <think>...</think> của các model reasoning như DeepSeek R1
    text = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
    // Loại bỏ markdown code fences
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    return text;
  }

  function parseQuestionsJSON(rawText, defaults = {}) {
    const cleaned = cleanLLMJsonString(rawText);
    let parsed = null;

    try {
      parsed = JSON.parse(cleaned);
    } catch (_e) {
      const arrStart = cleaned.indexOf('[');
      const arrEnd = cleaned.lastIndexOf(']');
      if (arrStart !== -1 && arrEnd > arrStart) {
        try {
          parsed = JSON.parse(cleaned.slice(arrStart, arrEnd + 1));
        } catch (_e2) {
          parsed = null;
        }
      }
    }

    if (parsed && !Array.isArray(parsed) && Array.isArray(parsed.questions)) {
      parsed = parsed.questions;
    }

    if (!Array.isArray(parsed)) {
      throw new Error('AI không trả về đúng định dạng mảng JSON câu hỏi. Vui lòng thử lại.');
    }

    const letters = ['A', 'B', 'C', 'D'];
    const stamp = Date.now();
    const normalized = [];

    for (let i = 0; i < parsed.length; i++) {
      const item = parsed[i];
      if (!item || !item.scenario || !Array.isArray(item.options) || item.options.length < 4) {
        continue;
      }

      const opts4 = item.options.slice(0, 4).map((o, idx) => {
        const body = stripOptionPrefix(o);
        return `${letters[idx]}. ${body}`;
      });

      let correctIdx = parseInt(item.correct, 10);
      if (!Number.isInteger(correctIdx) || correctIdx < 0 || correctIdx > 3) {
        correctIdx = 0;
      }

      const qObj = {
        id: item.id || `ai_ch${defaults.chapter || 1}_${stamp}_${i + 1}`,
        chapter: Number(item.chapter) || Number(defaults.chapter) || 1,
        section: String(item.section || defaults.section || `${defaults.chapter || 1}.1`),
        kLevel: ['K1', 'K2', 'K3'].includes(String(item.kLevel).toUpperCase())
          ? String(item.kLevel).toUpperCase()
          : (defaults.kLevel && defaults.kLevel !== 'mixed' ? defaults.kLevel : 'K2'),
        difficulty: ['easy', 'normal', 'hard'].includes(item.difficulty)
          ? item.difficulty
          : (defaults.difficulty || 'normal'),
        scenario: String(item.scenario).trim(),
        options: opts4,
        correct: correctIdx,
        explanation: String(item.explanation || 'Đáp án dựa theo tài liệu giáo trình ISTQB CTFL v4.0.1.').trim(),
        mnemonic: String(item.mnemonic || 'Đọc kỹ từ khóa trong câu hỏi và đối chiếu giáo trình ISTQB!').trim(),
        isAiGenerated: true,
        createdAt: new Date().toISOString()
      };

      normalized.push(shuffleQuestionOptions(qObj));
    }

    if (normalized.length === 0) {
      throw new Error('Không trích xuất được câu hỏi hợp lệ nào từ phản hồi của AI.');
    }

    return normalized;
  }

  // =========================================================================
  // Lưu & Đọc Câu hỏi AI đã tạo trong localStorage
  // =========================================================================

  function getGeneratedQuestions(chapterFilter = null) {
    const raw = safeGetStorage(GENERATED_QUESTIONS_KEY);
    if (!raw) return [];
    try {
      const list = JSON.parse(raw);
      if (!Array.isArray(list)) return [];
      if (chapterFilter !== null && chapterFilter !== undefined) {
        return list.filter(q => Number(q.chapter) === Number(chapterFilter));
      }
      return list;
    } catch (_e) {
      return [];
    }
  }

  function saveGeneratedQuestions(newQuestions) {
    if (!Array.isArray(newQuestions) || newQuestions.length === 0) return getGeneratedQuestions();
    const existing = getGeneratedQuestions();
    const existingIds = new Set(existing.map(q => q.id));
    const merged = existing.slice();
    for (let i = 0; i < newQuestions.length; i++) {
      if (!existingIds.has(newQuestions[i].id)) {
        merged.push(newQuestions[i]);
        existingIds.add(newQuestions[i].id);
      }
    }
    // Giới hạn tối đa 200 câu AI lưu trữ để không đầy localStorage
    const capped = merged.slice(-200);
    safeSetStorage(GENERATED_QUESTIONS_KEY, JSON.stringify(capped));
    return capped;
  }

  function clearGeneratedQuestions() {
    safeSetStorage(GENERATED_QUESTIONS_KEY, '[]');
    return [];
  }

  // =========================================================================
  // 3. AI Soạn Đề Thi & Câu Hỏi Mới Dựa Vào Giáo Trình (generateQuestionsFromSyllabus)
  // =========================================================================

  async function generateQuestionsFromSyllabus({
    chapterId = 1,
    sectionCode = null,
    count = 5,
    kLevel = 'mixed',
    difficulty = 'normal'
  } = {}) {
    const safeCount = Math.min(15, Math.max(1, parseInt(count, 10) || 5));
    const ctx = extractSyllabusContext(chapterId, sectionCode);

    const kLevelInstruction = kLevel === 'mixed'
      ? 'Kết hợp đa dạng mức độ K1 (Nhớ), K2 (Hiểu/Phân biệt) và K3 (Áp dụng tình huống thực tế).'
      : `Tập trung chủ yếu vào mức độ nhận thức ${kLevel}.`;

    const diffInstruction = difficulty === 'hard'
      ? 'Độ khó CAO: tình huống lắt léo giống đề thi thật ISTQB quốc tế, các phương án nhiễu rất sát nhau.'
      : (difficulty === 'easy'
        ? 'Độ khó CƠ BẢN: rõ ràng, giúp người mới nắm chắc khái niệm cốt lõi.'
        : 'Độ khó TRUNG BÌNH - CHUẨN ĐỀ THI: tình huống thực tế trong dự án phần mềm.');

    const systemPrompt = [
      'Bạn là Trưởng ban ra đề thi Quốc tế ISTQB CTFL v4.0.1.',
      'NHIỆM VỤ: Dựa SÁT vào đoạn Tài liệu Giáo trình Tiếng Việt được cung cấp bên dưới để soạn các câu hỏi trắc nghiệm HOÀN TOÀN MỚI.',
      'QUY TẮC BẮT BUỘC:',
      '1. Dùng 100% Tiếng Việt chuẩn thuật ngữ ISTQB (có thể giữ thuật ngữ tiếng Anh trong ngoặc đơn như Verification, Defect, Equivalence Partitioning...).',
      '2. Tạo tình huống thực tế MỚI, số liệu MỚI, góc hỏi MỚI để chống học thuộc lòng đáp án cũ.',
      '3. Mỗi câu hỏi có đúng 4 phương án bắt đầu bằng "A. ", "B. ", "C. ", "D. ", chỉ có 1 đáp án đúng duy nhất (correct là số nguyên 0, 1, 2 hoặc 3).',
      '4. Phân bổ đáp án đúng ngẫu nhiên giữa 0, 1, 2, 3 (KHÔNG dồn hết vào 0 hay 1).',
      '5. Trả về DUY NHẤT một mảng JSON hợp lệ (không thêm lời bình luận ngoài JSON).',
      'Cấu trúc mỗi phần tử JSON:',
      '{"id":"ai_q1","chapter":' + Number(chapterId) + ',"section":"' + (sectionCode || `${chapterId}.1`) + '","kLevel":"K2","difficulty":"' + difficulty + '","scenario":"...","options":["A. ...","B. ...","C. ...","D. ..."],"correct":0,"explanation":"Giải thích chi tiết tại sao đáp án đúng và tại sao các đáp án khác sai dựa vào giáo trình.","mnemonic":"Mẹo ghi nhớ ngắn gọn 1 câu."}'
    ].join('\n');

    const userPrompt = [
      `Hãy soạn đúng ${safeCount} câu hỏi trắc nghiệm mới cho: ${ctx.title}.`,
      kLevelInstruction,
      diffInstruction,
      '',
      '=== TÀI LIỆU GIÁO TRÌNH GỐC ISTQB CTFL v4.0.1 (TIẾNG VIỆT) ===',
      ctx.text,
      '=== HẾT TÀI LIỆU ===',
      '',
      `Trả về ngay mảng JSON gồm ${safeCount} câu hỏi.`
    ].join('\n');

    const llmRes = await callLLMWithFailover([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], {
      maxTokens: Math.max(2000, safeCount * 450),
      timeoutMs: 60000
    });

    const questions = parseQuestionsJSON(llmRes.text, {
      chapter: chapterId,
      section: sectionCode || `${chapterId}.1`,
      kLevel,
      difficulty
    });

    saveGeneratedQuestions(questions);

    return {
      success: true,
      questions,
      provider: llmRes.provider,
      model: llmRes.model,
      keyUsedMasked: llmRes.keyUsedMasked,
      attempts: llmRes.attempts,
      sourceContext: ctx.title,
      message: `AI (${llmRes.model}) đã soạn thành công ${questions.length} câu hỏi mới từ "${ctx.title}".`
    };
  }

  // =========================================================================
  // 4B. Bộ Sinh Câu Hỏi Biến Thể Động K3 (Không cần API Key - 0.1 giây)
  // =========================================================================

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function buildDynamicBVAQuestion(idx) {
    const scenarios = [
      {
        topic: 'Tuổi hưởng ưu đãi vé tàu',
        unit: 'tuổi',
        minRange: [6, 18],
        spanRange: [8, 20]
      },
      {
        topic: 'Giá trị đơn hàng được miễn phí vận chuyển',
        unit: 'nghìn đồng',
        minRange: [100, 300],
        spanRange: [100, 400]
      },
      {
        topic: 'Nhiệt độ vận hành an toàn của máy chủ',
        unit: '°C',
        minRange: [15, 22],
        spanRange: [10, 20]
      },
      {
        topic: 'Dung lượng tệp tin ảnh tải lên hệ thống',
        unit: 'MB',
        minRange: [2, 10],
        spanRange: [10, 40]
      },
      {
        topic: 'Số lượng sản phẩm đặt mua trong một lượt',
        unit: 'sản phẩm',
        minRange: [5, 15],
        spanRange: [15, 35]
      }
    ];

    const sc = pickRandom(scenarios);
    const min = randInt(sc.minRange[0], sc.minRange[1]);
    const max = min + randInt(sc.spanRange[0], sc.spanRange[1]);
    const isThreeValue = Math.random() < 0.5;

    if (!isThreeValue) {
      const correctVals = [min - 1, min, max, max + 1];
      const wrong1 = [min, min + 1, max - 1, max];
      const wrong2 = [min - 1, min, min + 1, max - 1, max, max + 1];
      const wrong3 = [min - 2, min - 1, max, max + 2];

      return shuffleQuestionOptions({
        id: `dyn_bva2_${Date.now()}_${idx}`,
        chapter: 4,
        section: '4.2.2',
        kLevel: 'K3',
        difficulty: 'normal',
        isDynamicK3: true,
        scenario: `Một hệ thống quy định "${sc.topic}" hợp lệ là số nguyên nằm trong khoảng từ ${min} đến ${max} ${sc.unit} (bao gồm cả ${min} và ${max}). Áp dụng Phân tích Giá trị Biên 2 giá trị (2-value BVA), bộ giá trị kiểm thử nào đạt 100% độ bao phủ?`,
        options: [
          `A. {${correctVals.join(', ')}}`,
          `B. {${wrong1.join(', ')}}`,
          `C. {${wrong2.join(', ')}}`,
          `D. {${wrong3.join(', ')}}`
        ],
        correct: 0,
        explanation: `Với BVA 2 giá trị cho khoảng số nguyên [${min}, ${max}], mỗi biên lấy chính giá trị biên và giá trị lân cận ngoài biên: biên dưới là (${min - 1}, ${min}) và biên trên là (${max}, ${max + 1}). Tổng hợp được {${correctVals.join(', ')}}. (Bộ 6 giá trị là của BVA 3 giá trị).`,
        mnemonic: 'BVA 2 giá trị: Mỗi biên lấy 2 điểm (ngay biên & sát ngoài biên) = 4 điểm!'
      });
    }

    const correctVals3 = [min - 1, min, min + 1, max - 1, max, max + 1];
    const wrongA = [min - 1, min, max, max + 1];
    const wrongB = [min - 2, min - 1, min, max, max + 1, max + 2];
    const wrongC = [min, min + 1, min + 2, max - 2, max - 1, max];

    return shuffleQuestionOptions({
      id: `dyn_bva3_${Date.now()}_${idx}`,
      chapter: 4,
      section: '4.2.2',
      kLevel: 'K3',
      difficulty: 'hard',
      isDynamicK3: true,
      scenario: `Cho trường nhập liệu "${sc.topic}" nhận số nguyên hợp lệ từ ${min} đến ${max} ${sc.unit} (bao gồm hai đầu mút). Nếu áp dụng Phân tích Giá trị Biên 3 giá trị (3-value BVA) theo chuẩn ISTQB CTFL v4.0.1, tập hợp giá trị kiểm thử đầy đủ nhất là tập nào?`,
      options: [
        `A. {${correctVals3.join(', ')}}`,
        `B. {${wrongA.join(', ')}}`,
        `C. {${wrongB.join(', ')}}`,
        `D. {${wrongC.join(', ')}}`
      ],
      correct: 0,
      explanation: `Với BVA 3 giá trị cho khoảng [${min}, ${max}], mỗi biên lấy 3 điểm (ngoài biên, tại biên, sát trong biên): biên dưới (${min - 1}, ${min}, ${min + 1}) và biên trên (${max - 1}, ${max}, ${max + 1}).`,
      mnemonic: 'BVA 3 giá trị: Mỗi biên lấy 3 điểm (trước - tại - sau) = 6 điểm!'
    });
  }

  function buildDynamicEPQuestion(idx) {
    const aMax = randInt(15, 30);
    const bMax = aMax + randInt(25, 45);
    const cMax = bMax + randInt(20, 40);

    const p1 = randInt(1, aMax - 1);
    const p2 = randInt(aMax + 2, bMax - 2);
    const p3 = randInt(bMax + 2, cMax - 2);
    const invLow = 0;
    const invHigh = cMax + randInt(5, 20);

    return shuffleQuestionOptions({
      id: `dyn_ep_${Date.now()}_${idx}`,
      chapter: 4,
      section: '4.2.1',
      kLevel: 'K3',
      difficulty: 'normal',
      isDynamicK3: true,
      scenario: `Hệ thống tính điểm thưởng xếp hạng khách hàng dựa trên số điểm nguyên dương như sau: 1–${aMax} điểm (Hạng Bạc), ${aMax + 1}–${bMax} điểm (Hạng Vàng), ${bMax + 1}–${cMax} điểm (Hạng Kim Cương). Các giá trị < 1 hoặc > ${cMax} bị từ chối. Bộ dữ liệu kiểm thử nào đạt 100% độ bao phủ Phân vùng Tương đương (bao gồm cả phân vùng hợp lệ và không hợp lệ) với số test case tối thiểu?`,
      options: [
        `A. {${invLow}, ${p1}, ${p2}, ${p3}, ${invHigh}}`,
        `B. {${p1}, ${p2}, ${p3}}`,
        `C. {1, ${aMax}, ${aMax + 1}, ${bMax}, ${bMax + 1}, ${cMax}}`,
        `D. {${invLow}, ${p1}, ${p2}, ${invHigh}}`
      ],
      correct: 0,
      explanation: `Có 3 phân vùng hợp lệ ([1..${aMax}], [${aMax + 1}..${bMax}], [${bMax + 1}..${cMax}]) và 2 phân vùng không hợp lệ (<1 và >${cMax}). Để đạt 100% EP coverage cần 1 đại diện từ mỗi phân vùng: {${invLow}, ${p1}, ${p2}, ${p3}, ${invHigh}} (tổng 5 giá trị).`,
      mnemonic: 'EP = Đếm đủ số vùng Hợp lệ + Không hợp lệ, mỗi vùng lấy 1 đại diện!'
    });
  }

  function buildDynamicThreePointQuestion(idx) {
    // Chọn O, M, P sao cho (O + 4M + P) chia hết cho 6 và (P - O) chia hết cho 6
    const sd = randInt(2, 6);
    const o = randInt(4, 16);
    const p = o + 6 * sd; // => (P - O) / 6 = sd (số nguyên đẹp)

    // Cần O + 4M + P chia hết cho 6. Ta chọn M trong khoảng (O+1 .. P-1) thỏa điều kiện
    const candidatesM = [];
    for (let m = o + 2; m <= p - 2; m++) {
      if ((o + 4 * m + p) % 6 === 0) {
        candidatesM.push(m);
      }
    }
    const m = candidatesM.length ? pickRandom(candidatesM) : o + 3;
    const e = (o + 4 * m + p) / 6;

    const wrongAvg = Math.round(((o + m + p) / 3) * 10) / 10;
    const wrongE1 = e + randInt(2, 4);
    const wrongSD1 = sd + randInt(1, 3);

    return shuffleQuestionOptions({
      id: `dyn_3pt_${Date.now()}_${idx}`,
      chapter: 5,
      section: '5.1.4',
      kLevel: 'K3',
      difficulty: 'normal',
      isDynamicK3: true,
      scenario: `Trong kỹ thuật Ước lượng 3 điểm (Three-Point Estimation) cho một gói kiểm thử API mới, nhóm QA đưa ra các ước lượng: Lạc quan nhất O = ${o} giờ, Khả dĩ nhất M = ${m} giờ, Bi quan nhất P = ${p} giờ. Giá trị ước lượng kỳ vọng (E) và độ lệch chuẩn (SD) lần lượt là bao nhiêu?`,
      options: [
        `A. E = ${e} giờ, SD = ${sd} giờ`,
        `B. E = ${wrongAvg} giờ, SD = ${sd} giờ`,
        `C. E = ${e} giờ, SD = ${wrongSD1} giờ`,
        `D. E = ${wrongE1} giờ, SD = ${Math.round((p - o) / 2)} giờ`
      ],
      correct: 0,
      explanation: `Áp dụng công thức chuẩn ISTQB: E = (O + 4M + P) / 6 = (${o} + 4×${m} + ${p}) / 6 = ${o + 4 * m + p} / 6 = ${e} giờ. Độ lệch chuẩn SD = (P - O) / 6 = (${p} - ${o}) / 6 = ${sd} giờ.`,
      mnemonic: 'E = (O + 4M + P) / 6; SD = (P - O) / 6 (chia 6 hết nhé!)'
    });
  }

  function buildDynamicCoverageOrDecisionQuestion(idx) {
    if (Math.random() < 0.5) {
      // Statement & Branch coverage
      const t1 = randInt(10, 50);
      const t2 = randInt(5, 20);
      const variant = Math.random() < 0.5;
      if (variant) {
        return shuffleQuestionOptions({
          id: `dyn_cov_${Date.now()}_${idx}`,
          chapter: 4,
          section: '4.3.2',
          kLevel: 'K3',
          difficulty: 'hard',
          isDynamicK3: true,
          scenario: `Xét đoạn giả mã sau:\nIF (diem >= ${t1}) THEN\n  XepLoai = "Đạt"\nEND IF\nIF (thuong > ${t2}) THEN\n  CongThem = 10\nEND IF\nĐể đạt 100% Độ bao phủ Câu lệnh (Statement Coverage) và 100% Độ bao phủ Nhánh (Branch Coverage), số lượng ca kiểm thử tối thiểu lần lượt là bao nhiêu?`,
          options: [
            'A. 1 ca kiểm thử cho Statement Coverage và 2 ca kiểm thử cho Branch Coverage',
            'B. 2 ca kiểm thử cho Statement Coverage và 4 ca kiểm thử cho Branch Coverage',
            'C. 1 ca kiểm thử cho Statement Coverage và 1 ca kiểm thử cho Branch Coverage',
            'D. 2 ca kiểm thử cho Statement Coverage và 2 ca kiểm thử cho Branch Coverage'
          ],
          correct: 0,
          explanation: `Với 2 lệnh IF độc lập (không có ELSE), chỉ cần 1 ca kiểm thử làm cả 2 điều kiện ĐÚNG (diem >= ${t1} và thuong > ${t2}) là đi qua toàn bộ câu lệnh (100% Statement). Tuy nhiên mỗi IF có 2 nhánh (True/False), nên cần thêm 1 ca làm cả 2 điều kiện SAI để đạt 100% Branch Coverage -> tối thiểu 2 ca kiểm thử.`,
          mnemonic: '2 IF nối tiếp không ELSE: Statement chỉ cần 1 (all True), Branch cần 2 (all True + all False)!'
        });
      }

      const condCount = randInt(3, 4);
      const totalRules = Math.pow(2, condCount);
      return shuffleQuestionOptions({
        id: `dyn_dt_${Date.now()}_${idx}`,
        chapter: 4,
        section: '4.2.3',
        kLevel: 'K3',
        difficulty: 'normal',
        isDynamicK3: true,
        scenario: `Một tính năng duyệt khoản vay trực tuyến phụ thuộc vào ${condCount} điều kiện nhị phân (Đúng/Sai) độc lập nhau. Nếu lập Bảng Quyết Định đầy đủ (Full Decision Table) chưa rút gọn, bảng sẽ có tối đa bao nhiêu cột quy tắc (Rules)?`,
        options: [
          `A. ${totalRules} quy tắc`,
          `B. ${condCount * 2} quy tắc`,
          `C. ${totalRules / 2} quy tắc`,
          `D. ${condCount * condCount} quy tắc`
        ],
        correct: 0,
        explanation: `Mỗi điều kiện nhị phân có 2 trạng thái (T/F). Với ${condCount} điều kiện độc lập, số quy tắc trong Bảng Quyết Định đầy đủ là 2^${condCount} = ${totalRules} cột quy tắc.`,
        mnemonic: 'Bảng quyết định đầy đủ với n điều kiện Đúng/Sai luôn có 2^n cột!'
      });
    }

    // Dynamic Decision Table concrete evaluation
    const minBill = randInt(300, 800);
    const vipDiscount = randInt(10, 20);
    const bigBillDiscount = randInt(5, 10);
    const isVip = Math.random() < 0.5;
    const bill = isVip ? minBill - 50 : minBill + 100;

    let expectedDiscount = 0;
    if (isVip && bill >= minBill) expectedDiscount = vipDiscount + bigBillDiscount;
    else if (isVip) expectedDiscount = vipDiscount;
    else if (bill >= minBill) expectedDiscount = bigBillDiscount;

    const allPossible = new Set([0, vipDiscount, bigBillDiscount, vipDiscount + bigBillDiscount]);
    const distractors = Array.from(allPossible).filter(v => v !== expectedDiscount);
    while (distractors.length < 3) {
      distractors.push(expectedDiscount + distractors.length + 3);
    }

    return shuffleQuestionOptions({
      id: `dyn_dt_eval_${Date.now()}_${idx}`,
      chapter: 4,
      section: '4.2.3',
      kLevel: 'K3',
      difficulty: 'normal',
      isDynamicK3: true,
      scenario: `Quy tắc tính giảm giá của sàn TMĐT: Khách VIP được giảm ${vipDiscount}%; Đơn hàng từ ${minBill}k trở lên được giảm ${bigBillDiscount}%; Nếu thỏa cả hai thì được cộng dồn cả hai mức giảm. Một khách hàng ${isVip ? 'LÀ thành viên VIP' : 'KHÔNG phải VIP'} có đơn hàng trị giá ${bill}k sẽ được giảm bao nhiêu phần trăm?`,
      options: [
        `A. ${expectedDiscount}%`,
        `B. ${distractors[0]}%`,
        `C. ${distractors[1]}%`,
        `D. ${distractors[2]}%`
      ],
      correct: 0,
      explanation: `Kiểm tra từng điều kiện: VIP = ${isVip ? 'Đúng' : 'Sai'} (${isVip ? `+${vipDiscount}%` : '0%'}); Giá trị đơn ${bill}k >= ${minBill}k = ${bill >= minBill ? 'Đúng' : 'Sai'} (${bill >= minBill ? `+${bigBillDiscount}%` : '0%'}). Tổng mức giảm = ${expectedDiscount}%.`,
      mnemonic: 'Đọc kỹ từng điều kiện trong bảng quy tắc và cộng đúng phần thỏa mãn!'
    });
  }

  /**
   * Sinh bộ câu hỏi biến thể động K3 tức thì (0.1 giây, không cần API Key)
   */
  function generateDynamicK3Questions(count = 10, chapterFilter = null) {
    const safeCount = Math.min(30, Math.max(1, parseInt(count, 10) || 10));
    const chFilter = chapterFilter !== null && chapterFilter !== undefined ? Number(chapterFilter) : null;
    const result = [];

    for (let i = 0; i < safeCount; i++) {
      if (chFilter === 5) {
        result.push(buildDynamicThreePointQuestion(i));
      } else if (chFilter === 4) {
        const mod = i % 3;
        if (mod === 0) result.push(buildDynamicBVAQuestion(i));
        else if (mod === 1) result.push(buildDynamicEPQuestion(i));
        else result.push(buildDynamicCoverageOrDecisionQuestion(i));
      } else {
        const mod = i % 4;
        if (mod === 0) result.push(buildDynamicBVAQuestion(i));
        else if (mod === 1) result.push(buildDynamicEPQuestion(i));
        else if (mod === 2) result.push(buildDynamicThreePointQuestion(i));
        else result.push(buildDynamicCoverageOrDecisionQuestion(i));
      }
    }

    return result;
  }

  // =========================================================================
  // 5. Gia Sư AI Giải Đáp Bài Học (askSyllabusTutor)
  // =========================================================================

  async function askSyllabusTutor({ chapterId = 1, sectionCode = null, questionText = '' } = {}) {
    const q = String(questionText || '').trim();
    if (!q) {
      return {
        success: false,
        answer: '',
        message: 'Vui lòng nhập câu hỏi bạn muốn hỏi Gia sư AI.'
      };
    }

    const ctx = extractSyllabusContext(chapterId, sectionCode);
    const systemPrompt = [
      'Bạn là Gia sư AI chuyên luyện thi ISTQB CTFL v4.0.1 bằng Tiếng Việt.',
      'Hãy giải đáp thắc mắc của học viên một cách ngắn gọn, súc tích, dễ hiểu, bám sát tài liệu giáo trình dưới đây và kèm 1 ví dụ thực tế minh họa.',
      'Không bịa đặt thông tin trái với giáo trình ISTQB v4.0.1.'
    ].join('\n');

    const userPrompt = [
      `Mục học hiện tại: ${ctx.title}`,
      '--- TRÍCH ĐOẠN GIÁO TRÌNH ---',
      ctx.text.slice(0, 6000),
      '--- HẾT TRÍCH ĐOẠN ---',
      `Câu hỏi của học viên: ${q}`
    ].join('\n\n');

    const llmRes = await callLLMWithFailover([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], {
      maxTokens: 1200,
      timeoutMs: 35000
    });

    return {
      success: true,
      answer: llmRes.text,
      provider: llmRes.provider,
      model: llmRes.model,
      keyUsedMasked: llmRes.keyUsedMasked,
      sourceContext: ctx.title,
      message: 'Gia sư AI đã trả lời.'
    };
  }

  // =========================================================================
  // Xuất đối tượng công khai window.CTFLAIProvider
  // =========================================================================

  const CTFLAIProvider = {
    CONFIG_STORAGE_KEY,
    GENERATED_QUESTIONS_KEY,
    DEFAULT_CONFIG,
    FALLBACK_MODELS,

    // Cấu hình & Key Pool
    getConfig,
    loadConfig: getConfig,
    saveConfig,
    resetConfig,
    parseApiKeys,
    maskApiKey,

    // Models & Kiểm tra kết nối
    fetchModels,
    testAllKeys,

    // Sinh đề AI dựa vào giáo trình
    extractSyllabusContext,
    generateQuestionsFromSyllabus,
    getGeneratedQuestions,
    saveGeneratedQuestions,
    clearGeneratedQuestions,

    // Sinh câu hỏi động K3 offline & Đảo đáp án chống học vẹt
    generateDynamicK3Questions,
    shuffleQuestionOptions,
    permuteQuestion: shuffleQuestionOptions,

    // Gia sư AI giải đáp bài học
    askSyllabusTutor
  };

  global.CTFLAIProvider = CTFLAIProvider;
})(typeof window !== 'undefined' ? window : globalThis);
