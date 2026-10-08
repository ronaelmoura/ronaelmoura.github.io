// Dependency-free handler shared by the Edge runtime and Node security tests.
export const ORIGIN = 'https://ronaelmoura.github.io';
export const CONSENT_VERSION = 'igreen-2026-10-08-v1';
export const CONSENT_TEXT = 'Autorizo Eli Jefferson e a equipe responsável pelo atendimento a usar meu nome, WhatsApp, cidade, perfil e valor da conta para avaliar minha solicitação e entrar em contato. Posso revogar este consentimento pelo contato de privacidade.';
const solutions = ['Avaliação inicial', 'Conexão Placas', 'Conexão Solar', 'Conexão Green', 'Conexão Livre'];
const profiles = ['Residência', 'Empresa', 'Rural'];
const keys = ['full_name', 'phone', 'city', 'bill', 'profile', 'solution', 'consent', 'consent_version', 'request_id', 'turnstile_token', 'website'];
const clean = (v: unknown, min: number, max: number): v is string => typeof v === 'string' && v.trim().length >= min && v.trim().length <= max && !/[\u0000-\u001f\u007f<>]/u.test(v);

export function validate(input: unknown) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).some(k => !keys.includes(k))) return null;
  const data = input as Record<string, unknown>;
  if (!clean(data.full_name, 2, 120) || !clean(data.city, 2, 100)) return null;
  if (typeof data.phone !== 'string' || data.phone.length > 25 || !/^[+\d ()-]+$/.test(data.phone)) return null;
  let phone = data.phone.replace(/\D/g, '');
  if (phone.length === 10 || phone.length === 11) phone = '55' + phone;
  if (!/^55[1-9]\d(?:9\d{8}|[2-5]\d{7})$/.test(phone)) return null;
  if (typeof data.bill !== 'number' || !Number.isFinite(data.bill) || data.bill < 1 || data.bill > 1000000 || !Number.isInteger(data.bill * 100)) return null;
  if (typeof data.profile !== 'string' || typeof data.solution !== 'string' || !profiles.includes(data.profile) || !solutions.includes(data.solution)) return null;
  if (data.consent !== true || data.consent_version !== CONSENT_VERSION || data.website !== '') return null;
  if (typeof data.request_id !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(data.request_id)) return null;
  if (!clean(data.turnstile_token, 1, 2048)) return null;
  return { full_name: data.full_name.trim(), phone: '+' + phone, city: data.city.trim(), estimated_monthly_bill: data.bill, customer_type: data.profile, solution: data.solution };
}

async function readBody(req: Request) {
  if (Number(req.headers.get('content-length')) > 8192) throw new Error('size');
  const reader = req.body?.getReader();
  if (!reader) throw new Error('body');
  let size = 0;
  const chunks = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 8192) { await reader.cancel(); throw new Error('size'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
}

export function createHandler(env: (key: string) => string | undefined, send: typeof fetch = fetch) {
  const secret = () => { const value = env('SUPABASE_SERVICE_ROLE_KEY'); if (!value) throw new Error('configuration'); return value; };
  const timedFetch = (url: string, options: RequestInit = {}) => send(url, { ...options, signal: AbortSignal.timeout(8000) });
  async function db(path: string, body?: unknown) {
    const res = await timedFetch(env('SUPABASE_URL') + '/rest/v1/' + path, {
      method: body === undefined ? 'GET' : 'POST',
      headers: { apikey: secret(), Authorization: 'Bearer ' + secret(), 'Content-Type': 'application/json' },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    if (!res.ok) throw new Error('database');
    return res.json();
  }
  async function digest(value: string) {
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    return Array.from(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode('igreen:' + value))), x => x.toString(16).padStart(2, '0')).join('');
  }
  return async function handler(req: Request) {
    const allowed = req.headers.get('origin') === ORIGIN;
    const headers: Record<string, string> = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Vary': 'Origin', 'X-Content-Type-Options': 'nosniff', ...(allowed ? { 'Access-Control-Allow-Origin': ORIGIN, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'content-type', 'Access-Control-Max-Age': '600' } : {}) };
    const reply = (status: number, body: unknown, extra: Record<string, string> = {}) => new Response(JSON.stringify(body), { status, headers: { ...headers, ...extra } });
    if (!allowed) return reply(403, { error: 'origin_not_allowed' });
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (!['GET', 'POST'].includes(req.method)) return reply(405, { error: 'method_not_allowed' }, { Allow: 'GET, POST, OPTIONS' });
    try {
      const [config] = await db('igreen_capture_config?id=eq.main&select=enabled,owner_id,turnstile_site_key,privacy_phone,consent_version');
      const ready = config?.enabled === true && !!config.owner_id && !!config.turnstile_site_key && !config.turnstile_site_key.startsWith('1x') && !config.turnstile_site_key.startsWith('2x') && !!config.privacy_phone && config.consent_version === CONSENT_VERSION && !!env('IGREEN_TURNSTILE_SECRET_KEY');
      if (req.method === 'GET') return reply(200, ready ? { enabled: true, site_key: config.turnstile_site_key, privacy_phone: config.privacy_phone, consent_version: CONSENT_VERSION, consent_text: CONSENT_TEXT } : { enabled: false });
      if (!ready) return reply(503, { error: 'capture_unavailable' });
      if (req.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return reply(415, { error: 'json_required' });
      // Shared persistent global quota: cannot be evaded with forged proxy/IP headers.
      if (!(await db('rpc/igreen_take_request_slot', {}))) return reply(429, { error: 'rate_limited' }, { 'Retry-After': '60' });
      let data;
      try { data = await readBody(req); } catch { return reply(400, { error: 'invalid_request' }); }
      const lead = validate(data);
      if (!lead) return reply(400, { error: 'invalid_request' });
      // Use the supported Auth admin API; service_role has no direct auth.users SELECT.
      const ownerResponse = await timedFetch(env('SUPABASE_URL') + '/auth/v1/admin/users/' + config.owner_id, {
        headers: { apikey: secret(), Authorization: 'Bearer ' + secret() },
      });
      if (!ownerResponse.ok) throw new Error('owner');
      const owner = await ownerResponse.json();
      if (owner.id !== config.owner_id || !owner.email_confirmed_at || (owner.banned_until && new Date(owner.banned_until).getTime() > Date.now())) return reply(503, { error: 'capture_unavailable' });
      const verification = await timedFetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: env('IGREEN_TURNSTILE_SECRET_KEY'), response: data.turnstile_token }),
      });
      if (!verification.ok) throw new Error('captcha');
      const challenge = await verification.json();
      if (challenge.success !== true || challenge.hostname !== 'ronaelmoura.github.io' || challenge.action !== 'igreen_lead') return reply(403, { error: 'verification_failed' });
      const result = await db('rpc/igreen_submit_lead', { p_request_id: data.request_id, p_lead: lead, p_phone_hash: await digest(lead.phone), p_payload_hash: await digest(JSON.stringify(lead)), p_consent_version: CONSENT_VERSION, p_consent_text: CONSENT_TEXT, p_expected_owner: config.owner_id });
      if (result === 'rate_limited') return reply(429, { error: result }, { 'Retry-After': '3600' });
      if (result === 'conflict') return reply(409, { error: 'request_conflict' });
      if (!['created', 'duplicate'].includes(result)) return reply(503, { error: 'capture_unavailable' });
      return reply(200, { ok: true });
    } catch {
      // Never return/log PII, request bodies, service credentials or raw database errors.
      return reply(503, { error: 'capture_unavailable' });
    }
  };
}
