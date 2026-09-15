# Development Lifecycle

## 1. Goal

Turn a product requirement into an integrated, reviewed change while minimizing requirement drift, keeping module work bounded, and preventing downstream stages from silently rewriting upstream intent.

The workflow must be runnable both manually and through sub-agent orchestration.

## 2. Canonical lifecycle

```text
Requirement input
    ↓
PRD
    ↓  PRODUCT FREEZE
Technical Design + Module Task Slicing
    ↓  DESIGN FREEZE
Per-module Test Contract
    ↓  TEST FREEZE
Vertical module execution
    Test → Coding → Module CR
    ↓
Integration / top-level coding
    ↓
Final CR
    ↓
Focused human E2E / acceptance where required
```

Each stage is started by a stage-specific prompt with a bounded Role Contract. The prompt tells the agent how to consume repository truth; it does not replace that truth.

## 3. Stage 1 — PRD

The PRD is the product-level artifact for one requirement or version iteration.

It defines:

- problem and goal
- user/player-facing behavior
- core workflow or gameplay
- interaction model
- information hierarchy
- acceptance behavior
- non-goals
- product boundaries

It should not prescribe implementation classes, internal events, state-owner names, or file paths.

For high-risk interaction changes, the human approval surface should be a compact behavior card rather than a long prose document.

Example:

```text
Slice: BUILD-04
Entry: Build workspace
Action: click city A
Result: A becomes planning origin; valid targets are highlighted
Continue: click valid city B → route comparison
Forbidden: no extra “plan from here” CTA
Must preserve: station-management access
```

The detailed PRD may be agent-generated, but a human should be able to approve the essential observable behavior without reading the implementation model.

## 4. Stage 2 — Technical Design

The Technical Design maps the frozen PRD onto the real codebase.

It must inspect current code and define:

- module boundaries and ownership
- technical terminology
- public contracts and invariants
- state / data flow
- integration points
- compatibility constraints
- migration or refactoring needs
- dependency relationships
- agent-sized module slices
- per-slice scope and out-of-scope boundaries

A module slice should be independently understandable, independently testable, and independently reviewable.

If a module task discovers that it must change an external module contract, it should stop and escalate rather than silently widening scope.

## 5. Stage 3 — Test Contract

A test agent consumes the frozen PRD and Technical Design plus current code/tests.

Its purpose is to answer:

> How can we prove this module satisfies the approved product and technical contracts?

The test agent may create or modify tests only within its assigned test stage and scope.

Before TEST FREEZE, an independent test review should check:

- product behavior is represented correctly
- technical invariants are represented correctly
- tests are not overfitted to a proposed implementation
- tests do not silently redefine the product
- fixtures are valid and deterministic

After TEST FREEZE, downstream coding agents treat these tests as read-only.

## 6. Stage 4 — Vertical Module Execution

Technical Design determines module/task groups. Each group can execute as an isolated chain:

```text
Module A: Test → Coding → CR
Module B: Test → Coding → CR
Module C: Test → Coding → CR
```

A human may run those chats manually. A capable agent runtime may dispatch them as sub-agents. The contracts are identical in either mode.

Independent groups may execute in parallel. Dependent groups execute in dependency order; no DAG engine is required to express or enforce this manually.

The coding agent reads:

- frozen PRD
- frozen Technical Design / module task
- frozen tests
- current repository state

It writes production code only within declared scope.

If a frozen test appears wrong, it raises a Freeze Break Request; it does not edit the test to regain green status.

## 7. Stage 5 — Module CR

Module CR is an independent implementation-conformance review.

It checks:

- implementation matches frozen contracts
- no test cheating or test weakening occurred
- architecture and module boundaries are respected
- scope did not leak
- regressions are covered
- complexity is justified

A module CR may report a product/design concern, but it must not redesign upstream requirements by itself.

## 8. Stage 6 — Integration / top-level coding

A top-level coding/integration agent owns cross-module assembly, shared infrastructure, merge sequencing, and regression resolution.

It should avoid re-implementing module logic already owned by completed slices.

Its work is governed by the same freeze rules: cross-module inconsistencies are escalated, not silently normalized.

## 9. Stage 7 — Final CR

Final CR is system-level, not a repetition of module CR.

It checks:

- complete PRD coverage
- cross-module contract consistency
- end-to-end user journeys
- shared terminology
- state transitions across modules
- duplication or conflicting ownership
- full regression status
- whether any frozen artifact was modified without an approved freeze break

## 10. Human/agent output rule

Each stage produces two logically distinct result surfaces when useful:

- a **Human Brief** for decision/status consumption;
- an **Agent Handoff** for the next execution stage.

A **Human Discussion** is generated only when a material trade-off, unresolved ambiguity, freeze break, or explicit request requires deeper reasoning.

The detailed technical handoff should not be forced into the human-facing summary. See [`../protocols/execution-contract.md`](../protocols/execution-contract.md).

## 11. Scope discipline

Do not batch unrelated findings merely because they are discovered together.

When a new issue is found during a module task:

- fix it only if it blocks correctness of the current task;
- otherwise record it in backlog;
- do not expand the active slice silently.

This is especially important for agentic workflows: large issue batches increase total context and make human review less effective.
