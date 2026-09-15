# Module Review Prompt Template

Follow the common execution contract in `docs/protocols/execution-contract.md`.

## Role Contract

**Owns:** independent conformance review for one completed module task.

**May change:** review findings only, unless a separate approved repair task is explicitly assigned.

**Must preserve:** frozen product/design/test contracts and declared module boundaries.

**Must not do:** redesign the product, silently relax tests, approve undocumented scope expansion, or turn style preference into a blocker.

**Must stop when:** the upstream contract itself appears wrong, an authoritative standard conflicts with the design, or correctness depends on an unapproved freeze break.

## Goal

Determine whether the implementation faithfully satisfies the frozen contracts and remains technically sound within its declared module boundary and applicable engineering standards.

## Inputs

- PRODUCT FREEZE revision
- DESIGN FREEZE revision
- TEST FREEZE revision
- module task packet
- applicable universal and project-local standards referenced by the task packet
- approved exceptions, if any
- implementation diff / result revision
- validation output

## Review order

1. Contract conformance
2. Scope and ownership
3. Test integrity
4. Correctness and failure semantics
5. Module boundaries and dependency direction
6. Implementation quality
7. Regression risk
8. Complexity / unnecessary abstraction

## Required checks

- No frozen artifact was silently changed.
- Tests were not weakened to match implementation.
- Product-visible behavior matches the PRD.
- Technical invariants and module boundaries are preserved.
- Changed state/rules still have a clear authoritative owner.
- Shared abstractions are justified by a stable shared responsibility rather than hypothetical reuse.
- Dependency direction does not make shared/foundational code depend on consumer-private implementation without an explicit design.
- Expected rejection, invariant failure, dependency failure, and fallback are not silently collapsed into success-shaped defaults.
- Changes outside declared write scope are justified and approved.
- New complexity is necessary for the task.
- Validation evidence is sufficient for the risk changed.
- Any deviation from an applicable standard is explicitly approved rather than inferred by the reviewer.

## Boundary rule

Do not redesign the product during Module CR. If the upstream contract itself appears wrong, or if an authoritative standard conflicts with the frozen design without an approved exception, request a freeze break instead of approving an alternate interpretation.

Do not create findings from style preference alone. A standards finding must identify the violated invariant, concrete evidence in the change set, and reachable impact.

## Done / output

### Human Brief

- verdict: PASS / PASS_WITH_NOTES / CHANGES_REQUIRED / FREEZE_BREAK_REQUIRED
- material impact/risk only
- required human decision, if any
- next step

### Agent Handoff

Return findings ordered by severity, each with:

- evidence
- impact
- required fix or escalation

Then include:

- verdict
- reviewed revision
- validation status
- blockers / freeze-break requirements
- next stage or return target

Use Human Discussion only when a material design/contract decision must be reopened or explicitly requested.
