import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHandler, validate, ORIGIN, CONSENT_VERSION } from '../supabase/functions/igreen-capture/handler.ts';

const valid = () => ({ full_name: 'Contato de teste', phone: '(86) 99808-1535', city: 'Tianguá', bill: 650, profile: 'Residência', solution: 'Avaliação inicial', consent: true, consent_version: CONSENT_VERSION, request_id: crypto.randomUUID(), turnstile_token: 'valid-token', website: '' });
function setup(overrides = {}) {
  const calls = [];
  const config = { enabled: true, owner_id: 'server-owner', turnstile_site_key: '0xreal-site-key', privacy_phone: '5586998081535', consent_version: CONSENT_VERSION, ...overrides.config };
  const env = key => ({ SUPABASE_URL: 'https://example.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'server-only-secret', IGREEN_TURNSTILE_SECRET_KEY: overrides.noSecret ? '' : 'captcha-secret' })[key];
  const handler = createHandler(env, async (url, options) => {
    calls.push({ url, options });
    if (overrides.failure) throw new Error('secret should never leak');
    let result;
    if (url.includes('igreen_capture_config')) result = [config];
    else if (url.includes('/auth/v1/admin/users/')) result = { id: 'server-owner', email_confirmed_at: '2026-10-08T00:00:00Z', ...overrides.owner };
    else if (url.includes('igreen_take_request_slot')) result = overrides.slot ?? true;
    else if (url.includes('siteverify')) result = { success: true, hostname: 'ronaelmoura.github.io', action: 'igreen_lead', ...overrides.challenge };
    else if (url.includes('igreen_submit_lead')) result = overrides.result || 'created';
    else throw new Error('unexpected fetch');
    return Response.json(result);
  });
  return { handler, calls };
}
const request = (data = valid(), method = 'POST', origin = ORIGIN) => new Request('https://example.supabase.co/functions/v1/igreen-capture', { method, headers: { origin, 'content-type': 'application/json' }, ...(['GET', 'OPTIONS'].includes(method) ? {} : { body: JSON.stringify(data) }) });

test('normalizes Brazilian phones and trims without trusting owner', () => {
  assert.equal(validate(valid()).phone, '+5586998081535');
  assert.equal(validate({ ...valid(), owner_id: 'attacker' }), null);
});
for (const [name, change] of Object.entries({ consent: { consent: false }, oldConsent: { consent_version: 'old' }, honeypot: { website: 'spam' }, name: { full_name: '<script>' }, city: { city: '' }, phone: { phone: '12345' }, bill: { bill: -10 }, numericString: { bill: '650' }, excessiveBill: { bill: 1000001 }, profile: { profile: 'admin' }, solution: { solution: 'injected' }, token: { turnstile_token: '' }, id: { request_id: 'bad' } })) {
  test('rejects invalid ' + name, async () => {
    const { handler, calls } = setup();
    assert.equal((await handler(request({ ...valid(), ...change }))).status, 400);
    assert.equal(calls.some(c => c.url.includes('siteverify')), false);
  });
}
test('origin, methods and preflight', async () => {
  const { handler, calls } = setup();
  assert.equal((await handler(request(valid(), 'POST', 'https://evil.example'))).status, 403);
  assert.equal((await handler(request(valid(), 'DELETE'))).status, 405);
  const response = await handler(request(null, 'OPTIONS'));
  assert.equal(response.status, 204);
  assert.equal(response.headers.get('access-control-allow-origin'), ORIGIN);
  assert.equal(calls.length, 0);
});
test('preview and absent secret reject submissions and reveal no config', async () => {
  for (const overrides of [{ config: { enabled: false } }, { noSecret: true }, { config: { turnstile_site_key: '1x00000000000000000000AA' } }]) {
    const { handler, calls } = setup(overrides);
    assert.deepEqual(await (await handler(request(null, 'GET'))).json(), { enabled: false });
    assert.equal((await handler(request())).status, 503);
    assert.equal(calls.some(c => c.url.includes('submit_lead')), false);
  }
});
test('global limit prevents CAPTCHA and writes', async () => {
  const { handler, calls } = setup({ slot: false });
  const response = await handler(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '60');
  assert.equal(calls.length, 2);
});
for (const challenge of [{ success: false }, { hostname: 'evil.example' }, { action: 'other' }]) {
  test('validates Turnstile success, hostname and action ' + JSON.stringify(challenge), async () => {
    const { handler, calls } = setup({ challenge });
    assert.equal((await handler(request())).status, 403);
    assert.equal(calls.some(c => c.url.includes('submit_lead')), false);
  });
}
test('successful request has server-controlled ownership, consent and HMAC', async () => {
  const { handler, calls } = setup();
  assert.deepEqual(await (await handler(request())).json(), { ok: true });
  const write = JSON.parse(calls.find(c => c.url.includes('submit_lead')).options.body);
  assert.equal('owner_id' in write.p_lead, false);
  assert.equal(write.p_consent_version, CONSENT_VERSION);
  assert.match(write.p_phone_hash, /^[a-f0-9]{64}$/);
  assert.equal(write.p_lead.phone, '+5586998081535');
  assert.equal(write.p_expected_owner, 'server-owner');
});
test('unconfirmed or banned owner blocks capture', async () => {
  for (const owner of [{ email_confirmed_at: null }, { banned_until: '2999-01-01T00:00:00Z' }, { id: 'different' }]) {
    const { handler, calls } = setup({ owner });
    assert.equal((await handler(request())).status, 503);
    assert.equal(calls.some(c => c.url.includes('siteverify')), false);
  }
});
test('idempotency, phone quota and unavailable RPC responses', async () => {
  for (const [result, status] of [['duplicate', 200], ['conflict', 409], ['rate_limited', 429], ['unavailable', 503]]) {
    assert.equal((await setup({ result }).handler(request())).status, status);
  }
});
test('bounded body, malformed JSON, content type and errors fail closed', async () => {
  const { handler } = setup();
  assert.equal((await handler(new Request('https://example.test', { method: 'POST', headers: { origin: ORIGIN, 'content-type': 'application/json' }, body: 'x'.repeat(9000) }))).status, 400);
  assert.equal((await handler(new Request('https://example.test', { method: 'POST', headers: { origin: ORIGIN, 'content-type': 'application/json' }, body: '{bad' }))).status, 400);
  assert.equal((await handler(new Request('https://example.test', { method: 'POST', headers: { origin: ORIGIN }, body: '{}' }))).status, 415);
  const error = await setup({ failure: true }).handler(request());
  assert.equal(error.status, 503);
  assert.equal((await error.text()).includes('secret'), false);
});
