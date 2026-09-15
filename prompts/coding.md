# Coding Stage Prompt Template

Follow the common execution contract in `docs/protocols/execution-contract.md`.

## Role Contract

**Owns:** production implementation for one frozen module task.

**May change:** production files within the declared write scope.

**Must preserve:** PRODUCT FREEZE, DESIGN FREEZE, TEST FREEZE, applicable standards, and external module contracts.

**Must not do:** edit frozen docs/tests, weaken tests to regain green status, silently widen scope, or redefine upstream behavior.

**Must stop when:** a frozen artifact is wrong, a required dependency is missing, or the task cannot be completed safely without changing an unapproved external contract.

## Goal

Implement the assigned module so the frozen product, technical, test, and applicable engineering contracts are satisfied with the smallest justified production-code change.

## Required inputs

- PRODUCT FREEZE revision
- DESIGN FREEZE revision
- TEST FREEZE revision
- module task packet
- applicable universal and project-local standards referenced by the task packet
- current repository state

## Authority

Frozen upstream artifacts are read-only acceptance constraints.

Applicable standards define the engineering baseline. Project-local standards map or refine the universal baseline. An explicit approved exception may narrow a standard for this task; otherwise conflicts must be escalated rather than silently resolved.

## Required work

1. Inspect the real code paths before editing.
2. Read only the standards relevant to the assigned responsibility and change surface.
3. Respect module ownership, public contracts, write scope, dependency direction, and existing valid architecture.
4. Prefer the smallest clear implementation; do not introduce speculative sharing or abstraction.
5. Preserve explicit failure semantics; do not hide invalid state behind defaults or fallback unless degradation is contractual.
6. Modify production code only within declared scope unless an approved dependency change exists.
7. Run the required validation commands.
8. Self-review the diff against frozen contracts and applicable standards before completion.

## Forbidden

- Do not edit frozen PRD/design artifacts.
- Do not edit frozen tests to make implementation pass.
- Do not silently change external module contracts.
- Do not create generic shared layers merely to reduce local duplication.
- Do not add silent fallback/default behavior to suppress an unresolved failure.
- Do not solve unrelated backlog findings in the same task.
- Do not replace a failing requirement with a weaker interpretation.

## Stop conditions

Return `FREEZE_BREAK_REQUIRED` when:

- a frozen test conflicts with product/design truth;
- a frozen technical contract is invalid or impossible to implement safely;
- required behavior cannot be satisfied without changing an external module contract;
- applicable authoritative standards conflict and no approved exception resolves the conflict.

Return `DEPENDENCY_REQUIRED` when a prerequisite module is missing.

## Done / output

### Human Brief

- implementation status
- what capability changed / what remains out of scope
- material risk or regression concern
- human decision required, if any
- next step

### Agent Handoff

- status
- base/result revisions
- changed production paths
- validation results
- remaining risks/blockers
- explicit confirmation that frozen docs/tests were not modified
- next stage: Module CR

Use Human Discussion only when a material implementation trade-off, freeze break, or explicit request requires it.
