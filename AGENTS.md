# Project instructions

Keep the portfolio at the repository root and the iGreen landing page in
`public/igreen-preview/`. Do not change the portfolio while working only on
the iGreen preview.

- Before changing Supabase schema, RLS, Edge Functions, lead ownership,
  consent, anti-abuse controls, or activation state, use
  `$igreen-crm-safety`.
- Before publishing or changing GitHub Pages behavior, use
  `$igreen-preview-release`.
- Before handing off a change that affects the iGreen page, capture flow,
  deployment, or CRM, use `$igreen-verification`.

The real lead capture must remain disabled until a production Cloudflare
Turnstile widget is configured and an end-to-end submission is verified.

