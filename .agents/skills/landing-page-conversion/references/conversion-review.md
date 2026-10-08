# Conversion review

Read this reference for a full page audit, a redesign brief, or an experiment
plan. Skip it for a small copy or layout change.

## Audit sequence

Record the page version, device sizes, traffic source, audience, offer, primary
conversion, and the evidence available. Review the page in this order:

1. **Message match:** Does the first viewport continue the promise or context
   that brought the visitor here?
2. **Clarity:** Can a new visitor explain the offer, audience, outcome, next
   step, and relevant condition after a quick scan?
3. **Motivation:** Are benefits concrete and tied to the visitor's problem?
4. **Trust:** Are claims attributable, limitations visible, identity clear, and
   proof authentic?
5. **Friction:** Does every field, choice, section, interruption, and secondary
   CTA earn its place?
6. **Usability:** Can visitors complete the flow with keyboard, touch, zoom,
   reduced motion, slow loading, and common mobile widths?
7. **Recovery:** Do validation, server failure, timeout, and retry states
   preserve input and tell the visitor what to do?
8. **Measurement:** Can confirmed success be distinguished from button clicks,
   form starts, client validation, and server failures?

Classify findings:

- **Blocker:** prevents completion, sends data incorrectly, creates a false
  success, or makes a material claim unsafe.
- **High impact:** likely obscures the offer, weakens trust, or adds substantial
  friction.
- **Improvement:** helps comprehension or polish but does not block the path.

For every proposed change, state the observed evidence, conversion hypothesis,
expected visitor behavior, metric, and possible downside. Do not assign a
numerical conversion uplift without measured data.

## Experiment brief

Use this compact structure:

- Audience and traffic source
- Current observation and baseline
- Hypothesis
- Control and one meaningful variant
- Primary metric and guardrail metrics
- Event definitions and page/version identifier
- Minimum run condition or decision rule
- Result, uncertainty, and next decision

Avoid simultaneous experiments that affect the same funnel unless the analysis
can separate their effects. Keep a permanent control when traffic and tooling
allow it.

## Handoff evidence

Show before/after copy or layout only for the areas changed. Report tests at
mobile and desktop widths, accessibility and failure states, performance
observations, analytics events added, and what remains unmeasured. Distinguish
design judgment from measured conversion evidence.
