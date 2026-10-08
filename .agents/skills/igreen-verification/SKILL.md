---
name: igreen-verification
description: Verify iGreen landing-page and CRM changes before handoff using focused tests, database checks, browser flows, and public deployment evidence. Use after implementation or when diagnosing whether a release is ready.
---

# iGreen verification

Choose checks based on the changed surface, then verify the complete affected
flow. Do not claim untested stages.

For frontend-only changes, run lint, build, and browser checks at approximately
390px and 1440px. Check required fields, validation messages, consent behavior,
success and failure states, retry behavior, JavaScript errors, accessibility
basics, and horizontal overflow.

For Edge Function changes, run:

```sh
node --test scripts/igreen-capture.test.mjs
npx deno check supabase/functions/igreen-capture/index.ts
```

For database, RLS, ownership, quota, or consent changes, run
`supabase/tests/igreen_capture.sql` against the intended project. Require its
rollback confirmation, then verify that no test leads, receipts, or quota
buckets remain. Run the security advisor.

For a release, wait for GitHub Pages and test the public URL. Verify the backend
state independently. When capture is disabled, prove that a public demo
submission sends no POST. When capture is enabled, use a real Turnstile token
and a consented test lead, then confirm the lead is visible only to the intended
CRM owner and remove the test record through the normal authorized workflow.

Distinguish these outcomes in the handoff:

- code/build verified;
- active browser path simulated;
- database transaction verified and rolled back;
- public preview verified;
- real end-to-end lead capture verified.

State any level that remains unverified and the precise blocker.
