---
name: igreen-crm-safety
description: Safely change the iGreen Supabase CRM, Edge Function, lead ownership, RLS, LGPD consent, Turnstile, rate limits, or capture activation. Use for any backend or data-flow change in this repository.
---

# iGreen CRM safety

Read `supabase/IGREEN-CAPTURE.md` before changing the capture flow.

Preserve these invariants:

- The browser never receives `service_role`, secret keys, or a privileged
  Supabase credential.
- The server chooses `owner_id`; visitor input cannot select or override it.
- Tables exposed through `public` keep RLS enabled. Existing owner policies
  remain scoped to `auth.uid()`.
- Public visitors cannot call the lead-writing RPC directly. Service-only
  tables and RPCs remain unavailable to `anon` and `authenticated`.
- Consent records the accepted text, version, server time, and source in the
  same transaction as the lead.
- Turnstile is checked on the server for success, expected hostname, and
  action. CORS and a honeypot are secondary controls.
- Retry behavior remains idempotent, and rate limits remain atomic and
  persistent across function instances.
- Capture stays disabled if the production Turnstile site key or secret is
  absent, the owner is invalid, or the consent version differs.

Create schema changes as additive migrations. Do not rewrite applied
migrations. Avoid unrelated CRM schema changes.

Before deployment, run the focused Node tests and Deno type check. For database
changes, run the transactional SQL suite; it must roll back all test leads,
receipts, quotas, and temporary activation state. Run the Supabase security
advisor and explain intentional RLS-without-policy findings for service-only
tables.

Production activation requires the real Turnstile configuration and a
supervised end-to-end submission whose lead and consent receipt are confirmed
in the correct CRM account. If that cannot be tested, publish with capture
disabled and report the exact remaining dependency.
