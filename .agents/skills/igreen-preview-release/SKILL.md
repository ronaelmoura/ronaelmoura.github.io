---
name: igreen-preview-release
description: Publish or update the iGreen preview on GitHub Pages while preserving the main portfolio, preview status, noindex behavior, and safe capture gate. Use for release, deployment, or hosting changes.
---

# iGreen preview release

The deploy workflow builds the portfolio and copies public assets to `dist`.
The served iGreen page belongs in `public/igreen-preview/`. Treat the
repository root, `src/`, shared assets, and portfolio output as separate scope
unless the user explicitly requests portfolio changes.

Before editing, record the current portfolio and preview state. Keep the iGreen
page at `/igreen-preview/`, retain `noindex,nofollow`, and preserve the visible
preview label until production activation has passed the CRM safety workflow.

Run lint and build before pushing. Inspect the diff to confirm the portfolio is
untouched. After pushing, wait for the GitHub Pages workflow and require a
successful deployment.

Verify the public preview with a cache-busting query:

- HTTP 200 and expected iGreen content.
- Current capture script loads.
- Backend configuration matches the intended enabled or disabled state.
- A preview submission does not transmit personal data while disabled.
- No browser errors or horizontal overflow on mobile.
- The public portfolio HTML remains unchanged when portfolio edits were out of
  scope.

Report the commit, workflow result, public URL, and whether capture is actually
active. Never describe a successful build as a successful lead capture.
