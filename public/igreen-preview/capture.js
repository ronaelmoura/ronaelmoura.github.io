// Preview remains the default. Only the server can enable real collection.
(() => {
  'use strict';
  const endpoint = 'https://zzcjafyunfctnujavfzy.supabase.co/functions/v1/igreen-capture';
  let config = null;
  let token = '';
  let widget;
  let busy = false;
  let requestId = null;
  let lastPayload = null;
  const form = document.getElementById('evaluation-form');
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.className = 'form-privacy';
  const button = form.querySelector('button[type="submit"]');
  const updateButton = () => { button.disabled = busy || !token; };

  // Capture phase prevents the original demo handler from claiming a simulated
  // success when real capture is enabled. The demo is untouched otherwise.
  form.addEventListener('submit', async event => {
    if (!config) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (busy || !form.reportValidity()) return;
    if (!token) { status.textContent = 'Conclua a verificação de segurança.'; return; }
    const data = new FormData(form);
    const payload = {
      full_name: String(data.get('full-name')).trim(), phone: String(data.get('phone')),
      city: String(data.get('city')).trim(), bill: Number(data.get('bill')),
      profile: String(data.get('customer-type')), solution: String(data.get('solution')),
      consent: data.get('consent') === 'on', consent_version: config.consent_version,
      website: String(data.get('website') || ''),
    };
    const serialized = JSON.stringify(payload);
    if (serialized !== lastPayload) { requestId = crypto.randomUUID(); lastPayload = serialized; }
    busy = true;
    updateButton();
    status.textContent = 'Enviando sua solicitação…';
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, request_id: requestId, turnstile_token: token }), signal: AbortSignal.timeout(15000), credentials: 'omit' });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        const messages = {
          400: 'Revise os campos. Informe o WhatsApp completo com DDD e confirme o consentimento.',
          403: 'A verificação expirou ou não foi aceita. Faça uma nova verificação.',
          409: 'Atualize a página antes de iniciar uma nova solicitação.',
          429: 'Limite de envios atingido. Aguarde antes de tentar novamente.',
          503: 'O atendimento pelo formulário está temporariamente indisponível. Tente novamente mais tarde.',
        };
        status.textContent = messages[response.status] || 'Não foi possível confirmar o envio. Tente novamente.';
        return;
      }
      form.reset();
      requestId = null;
      lastPayload = null;
      status.textContent = 'Solicitação recebida! A equipe entrará em contato pelo WhatsApp informado.';
    } catch {
      status.textContent = 'Não foi possível confirmar o envio. Verifique sua conexão e tente novamente; uma repetição não duplica a solicitação.';
    } finally {
      busy = false;
      token = '';
      if (window.turnstile && widget !== undefined) window.turnstile.reset(widget);
      updateButton();
    }
  }, true);

  async function initialize() {
    try {
      const response = await fetch(endpoint, { signal: AbortSignal.timeout(8000), credentials: 'omit', cache: 'no-store' });
      if (!response.ok) return;
      const settings = await response.json();
      if (settings.enabled !== true || !settings.site_key || !/^55[1-9]\d9\d{8}$/.test(settings.privacy_phone) || settings.consent_version !== 'igreen-2026-10-08-v1' || typeof settings.consent_text !== 'string') return;
      // Prevent switching consent/behavior halfway through a demo submission.
      if (!form.isConnected) return;
      config = settings;
      form.querySelector('#consent').checked = false;
      form.querySelector('.consent span').textContent = config.consent_text;
      form.querySelector('.form-privacy').textContent = 'Dados usados para atender sua solicitação. Veja o aviso de privacidade abaixo.';
      document.querySelector('.contact-copy > p:not(.section-kicker)').textContent = 'Deixe seus dados para receber uma avaliação inicial da sua conta de energia.';
      document.querySelector('.form-top em').textContent = 'ENVIO SEGURO';
      document.querySelector('.form-heading p').textContent = 'Preencha seus dados e o tipo de imóvel.';
      document.querySelector('.preview-mark').textContent = 'PRÉVIA · CAPTAÇÃO ATIVA';
      button.textContent = 'SOLICITAR AVALIAÇÃO ↗';
      updateButton();

      const profileField = document.createElement('div');
      profileField.className = 'form-field';
      profileField.innerHTML = '<label for="customer-type">Tipo do imóvel *</label><select id="customer-type" name="customer-type" required><option value="">Selecione</option><option>Residência</option><option>Empresa</option><option>Rural</option></select>';
      form.querySelector('.consent').before(profileField);
      const honeypot = document.createElement('div');
      honeypot.hidden = true;
      honeypot.innerHTML = '<label for="website">Deixe vazio</label><input id="website" name="website" tabindex="-1" autocomplete="off" maxlength="200">';
      form.append(honeypot);
      const privacy = document.createElement('details');
      privacy.className = 'form-privacy';
      const summary = document.createElement('summary');
      summary.textContent = 'Privacidade e uso dos dados';
      const info = document.createElement('p');
      info.textContent = 'Responsável pelo atendimento: Eli Jefferson. Nome, WhatsApp, cidade, perfil do imóvel e valor da conta são registrados no CRM da equipe para avaliar seu pedido e retornar o contato, com base no consentimento acima. Usamos Supabase para armazenamento e Cloudflare Turnstile para proteção contra abuso. Não envie CPF, documentos ou sua fatura neste formulário. Você pode solicitar acesso, correção, exclusão ou revogar o consentimento pelo WhatsApp de privacidade. Seus dados não são usados para campanhas sem uma autorização específica. Versão do aviso: ' + config.consent_version + '.';
      const contact = document.createElement('a');
      contact.href = 'https://wa.me/' + config.privacy_phone;
      contact.textContent = 'Falar sobre meus dados: +55 86 99808-1535';
      contact.rel = 'noopener noreferrer';
      privacy.append(summary, info, contact);
      form.append(privacy, status);
      const challenge = document.createElement('div');
      button.before(challenge);
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = () => {
        widget = window.turnstile.render(challenge, {
          sitekey: config.site_key, action: 'igreen_lead', language: 'pt-br', size: 'flexible',
          callback: value => { token = value; updateButton(); },
          'expired-callback': () => { token = ''; updateButton(); },
          'error-callback': () => { token = ''; updateButton(); status.textContent = 'A verificação não carregou. Recarregue a página para tentar novamente.'; },
        });
      };
      script.onerror = () => { status.textContent = 'A verificação não carregou. Recarregue a página para tentar novamente.'; };
      document.head.append(script);
    } catch { /* Fail closed: no live capture without server confirmation. */ }
  }
  initialize();
})();
