# Captação iGreen — prévia protegida

Projeto: `zzcjafyunfctnujavfzy` (Ronael Consultoria Solar).
Página: https://ronaelmoura.github.io/igreen-preview/
Função: `igreen-capture`. Nenhuma dependência externa no servidor.

## Estado de entrega

Integração publicada, mas `igreen_capture_config.enabled = false`.
Sem Turnstile real configurado: a página conserva a simulação, sem enviar os
campos preenchidos. A consulta inicial de disponibilidade não contém esses dados.
O backend recusa POST enquanto desativado ou sem o segredo.

O proprietário foi configurado a partir da conta confirmada pelo usuário,
`ronaelmoura240@gmail.com`. Contato confirmado: `+55 86 99808-1535`.
Essas informações de configuração não são credenciais.

## Ativação pendente

1. Criar um widget **Managed** no Cloudflare Turnstile, permitindo somente
   `ronaelmoura.github.io` (hostname, sem protocolo/caminho).
2. Salvar a secret key diretamente em Supabase → Edge Functions → Secrets como
   `IGREEN_TURNSTILE_SECRET_KEY`. Não colocar em HTML, Git, chat ou variáveis públicas.
3. Registrar a site key pública em `public.igreen_capture_config.turnstile_site_key`.
   Não usar chaves de teste em produção. Revisar o aviso de privacidade com o
   responsável pelo atendimento e definir a rotina de retenção/exclusão dos leads.
4. Em uma sessão de ativação acompanhada, habilitar a configuração, executar
   uma submissão consentida no navegador com o Turnstile real, confirmar o lead
   e o consentimento no banco e a visualização na conta do CRM. Se falhar,
   desativar imediatamente. Não considerar o caminho completo verificado antes disso.

```sql
-- Somente depois da configuração e durante a verificação acompanhada:
update public.igreen_capture_config set enabled = true where id = 'main';
-- Desativação imediata (o servidor também bloqueia abas já abertas):
update public.igreen_capture_config set enabled = false where id = 'main';
```

Não é necessário domínio próprio, WhatsApp Business API, chave de e-mail ou
service_role no cliente. O WhatsApp é apenas contato de privacidade; este fluxo
não envia mensagens automaticamente. Outro domínio exige revisão do CORS e
do hostname verificado no servidor, além do widget Cloudflare.

## Segurança e limites

- Lista de campos permitidos, tamanho máximo do corpo 8 KiB, validação de
  nome/cidade/telefone/valor/perfil/interesse e consentimento estrito.
- O tipo de imóvel é solicitado somente no modo ativo para não classificar
  silenciosamente empresas e imóveis rurais como residências no CRM.
- Honeypot e Turnstile validado no servidor (sucesso, hostname, action
  `igreen_lead`). Tokens de uso único; o navegador renova após cada tentativa.
- Origem exata permitida. CORS não é autenticação: a proteção efetiva inclui
  Turnstile, quotas e gravação exclusiva pelo backend.
- Quota global atômica de 60 tentativas/minuto antes do Turnstile; quota por
  telefone de 3 novos leads/hora depois do Turnstile. Janelas fixas, com possível
  rajada na mudança de janela. Sem confiar em IP informado pelo cliente.
  Um ataque pode consumir a quota global e causar indisponibilidade temporária;
  reavaliar limites/controle na borda se o volume crescer.
- Telefones dos contadores usam HMAC; IP não é armazenado pela aplicação.
  Contadores antigos são apagados no próximo envio após duas horas. Se não
  houver novos envios, permanecem até a próxima limpeza. O provedor pode manter
  seus próprios logs de infraestrutura.
- Configuração e tabelas auxiliares: RLS habilitada, nenhum acesso para
  `anon`/`authenticated`. Ausência de políticas nessas tabelas é intencional
  (negação por padrão). RPCs `SECURITY INVOKER`, execução apenas `service_role`.
- As políticas existentes do CRM continuam restringindo `owner_id = auth.uid()`.
  O visitante não escolhe proprietário. A conta é verificada pela API Auth;
  a transação reconfirma o proprietário para evitar troca durante o envio.
- Inserção do lead + recibo de consentimento na mesma transação; reenvio com a
  mesma chave e conteúdo não duplica. Chave reutilizada com outro conteúdo falha.
- Consentimento: versão/texto/horário do servidor/origem em recibo privado,
  `consent_at` no lead. Exclusão do lead também remove seu recibo.
- O frontend usa apenas a URL da função e a site key pública. Não há chave
  Supabase nem segredo no frontend; o backend usa a variável nativa do projeto.
- A função é pública (`verify_jwt = false`) porque o visitante não tem login;
  a autorização específica é implementada no corpo, por Turnstile e configuração.

## Verificação reproduzível

Usar Node.js 24 para os testes (suporte nativo a TypeScript sem compilação).

```sh
node --test scripts/igreen-capture.test.mjs
npx deno check supabase/functions/igreen-capture/index.ts
npm run lint
npm run build
```

Executar `supabase/tests/igreen_capture.sql` como administrador SQL testa a
gravação, consentimento, idempotência, quotas, vínculo e isolamento RLS, com
rollback de todos os dados de teste. A configuração temporária do teste não é
visível a outras transações. Não executa CAPTCHA nem envia mensagens.

Testes de navegador: 390px e 1440px, prévia sem POST, reset, consentimento
obrigatório, falha, repetição com mesmo ID, confirmação e ausência de overflow.
O caminho ativo nesses testes usa respostas simuladas; não substitui o teste
de ativação com Turnstile real e a interface autenticada do CRM.

Avisos anteriores à mudança: proteção contra senhas vazadas desativada no Auth
e alertas de dependências de build do portfólio. O código de captação não adiciona
pacotes. Revisar separadamente para não alterar o portfólio nesta entrega.

Referências: [Edge Functions](https://supabase.com/docs/guides/functions),
[Turnstile no servidor](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/),
[RLS sem políticas](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy),
[proteção de senhas](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).

As migrações deste diretório são incrementais sobre `init_solar_crm` já existente
no projeto. Não usar este diretório para recriar um banco vazio sem o baseline.
