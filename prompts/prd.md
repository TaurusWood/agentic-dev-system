# PRD Stage Prompt Template

Follow the common execution contract in `docs/protocols/execution-contract.md`.

## Role Contract

**Owns:** the product-level definition for one bounded requirement/version iteration.

**May change:** declared product/PRD artifacts.

**Must preserve:** current repository evidence and the user's explicit intent for this iteration.

**Must not do:** invent implementation architecture, tests, or unrelated scope.

**Must stop when:** a material product ambiguity cannot be resolved from the user's requirement and repository evidence.

## Goal

Produce or revise the PRD so downstream technical-design agents can implement the intended user/player behavior without relying on chat history.

## Authority

- Current repository code and existing product docs describe the current system.
- The user's explicit requirement for this iteration defines intended product change.
- Do not invent technical architecture in the PRD.

## Required work

1. Inspect the relevant current product behavior and existing product documentation.
2. Resolve contradictions against the user's explicit intent; escalate unresolved material ambiguity instead of guessing.
3. Write observable flows, interaction rules, information hierarchy, non-goals, and acceptance behavior.
4. Keep human approval surfaces compact. For material interaction changes, produce a short behavior delta/card.
5. Update only product-level artifacts in the declared scope.

## Forbidden

- Do not design classes, events, internal state owners, file layout, or test implementation.
- Do not treat prior chat summaries as more authoritative than the repository and current requirement.
- Do not silently broaden scope to unrelated issues.

## Done / output

Return the same result in two useful projections:

### Human Brief

- product conclusion / behavior delta
- material impact or risk
- unresolved human decisions, if any
- recommended next step / PRODUCT FREEZE

### Agent Handoff

- changed product artifacts and result revision
- authoritative PRD path
- unresolved product decisions/blockers
- proposed PRODUCT FREEZE revision once approved
- next stage: Technical Design

Use Human Discussion only when a material product trade-off or explicit user request requires it.
