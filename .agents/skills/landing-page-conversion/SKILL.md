---
name: landing-page-conversion
description: Create, review, or improve a landing page around one measurable conversion goal, including offer, copy, hierarchy, CTA, form friction, mobile UX, proof, analytics, and experiments. Use for campaign and lead-generation pages; do not use for general multi-page sites without a conversion objective.
---

# Landing page conversion

Build the page around a single audience, problem, promise, and primary action.
Treat visual polish as support for comprehension and trust, not as the goal.

## Start with evidence

Inspect the existing page, traffic source, offer, current CTA, form, target
device, and any analytics available. Preserve working brand elements and user
content unless the request includes a redesign.

If essential business facts are missing, continue with the structure and mark
the exact claims or credentials that need confirmation. Never invent savings,
deadlines, certifications, customer counts, testimonials, ratings, scarcity, or
guarantees. Research current references when the task requests research or
depends on changing facts, and cite the sources used.

Define the conversion event before editing. Prefer one primary CTA label that
describes what the visitor receives. Secondary actions may support visitors who
are not ready, but must not compete visually with the primary action.

## Shape the message

Make the first viewport answer:

- Is this for me?
- What outcome is offered?
- Why should I believe it?
- What should I do next?

Use concrete language, short paragraphs, meaningful headings, and objection
handling close to the relevant decision. Put the strongest differentiator and
the primary CTA early. Repeat the same primary action only where new context
reduces uncertainty; do not create unrelated CTAs.

Use proof only when attributable and verifiable. Explain qualifications,
limitations, eligibility, price conditions, or expected next steps where they
affect the decision. Avoid generic badges and decorative statistics.

## Design the flow

Choose sections from the visitor's decision needs rather than a fixed template:
offer, benefits, how it works, proof, objections, form, and privacy may be
enough. Remove sections that repeat the same point.

Design mobile first. Keep the reading order intact without animation, keyboard
or touch. Use visible labels, useful focus states, sufficient contrast, stable
layouts, reduced-motion support, and no horizontal overflow. Images must
reinforce the offer, load efficiently, and have appropriate alternative text.

Ask only for information required for the next operational step. Explain why
sensitive or unusual fields are needed. Preserve user input after recoverable
errors, show specific validation, prevent accidental duplicates, and never show
success before the server confirms receipt. Consent must be voluntary, specific,
unchecked by default, and linked to an understandable privacy notice.

For the iGreen preview, preserve `noindex,nofollow`, the visible preview
status, the existing visual direction, and the portfolio boundary. Do not claim
guaranteed savings or activate real capture without the CRM safety workflow.

## Measure and learn

Define a small measurement plan with the primary conversion plus the few events
needed to diagnose it, such as CTA click, form start, validation error, submit
failure, and confirmed success. Do not send personal field values to analytics.
Record the page/version so results can be compared.

Treat conversion hypotheses as hypotheses. Change one meaningful variable per
experiment when possible, define the success metric and stopping condition
before launch, and avoid claiming improvement without comparable traffic and
enough data.

For a full audit or experiment plan, read
[references/conversion-review.md](references/conversion-review.md).

After implementation, use `$igreen-verification` for the affected frontend
flow. Use `$igreen-crm-safety` as well when forms, data collection, consent,
ownership, or anti-abuse behavior changes. Use `$igreen-preview-release` when
publishing the result.
