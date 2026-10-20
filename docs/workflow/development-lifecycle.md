# Development Lifecycle — Explanation

> **Normative routing:** [`../../skills/agentic-development/references/workflow.md`](../../skills/agentic-development/references/workflow.md). This document explains why the lifecycle exists; it does not own runtime semantics.

## 1. Goal

Turn a requirement or finding into an integrated, reviewed change while minimizing semantic drift and preventing downstream stages from silently rewriting upstream intent.

## 2. Lifecycle

```text
Requirement / finding
    ↓
PRD / Product Discussion
    ↓ PRODUCT FREEZE
Technical Design + module slicing + initial Task Packets
    ↓ DESIGN FREEZE
Risk-based test mode per task
    ├ lightweight → existing checks / focused acceptance
    ├ inline → scoped tests during Coding
    └ independent → Test preparation / TEST FREEZE
READY_SET → parallel Coding/worktrees → fresh Module CR per task
    ↓ Integration / dependency unlock / next execution wave
Integration / top-level coding
    ↓
Final CR
    ↓
Focused human acceptance when needed
```

Not every task starts at PRD. Enter at the earliest stage that owns the unresolved truth.

## 3. PRD

PRD records observable user/player behavior, flows, interaction rules, acceptance behavior, non-goals, and product boundaries. It avoids implementation architecture.

PRODUCT FREEZE requires the required product approval plus a committed revision.

## 4. Technical Design

Technical Design maps frozen product intent onto the actual repository: module ownership, public contracts, invariants, state/data flow, dependencies, compatibility needs, and bounded task slices.

It creates the initial Task Packet for each slice, including repository identity, `base_revision`, scope, dependencies, `test_mode`, validation/acceptance, and stop conditions.

DESIGN FREEZE requires design review plus a committed revision.

## 5. Risk-based verification

Routine, directly observable UI and simple CRUD work normally uses `lightweight` verification: existing checks and a focused manual acceptance path, without generating new tests solely for process compliance. `inline` lets Coding add targeted non-frozen regression tests where useful. Complex business rules, calculations, algorithms, consequential state transitions, and high-risk data/permissions work use `independent` Test preparation with per-task TEST FREEZE.

Only independent tasks enter the Test stage. Compatible tasks may share a Test context without cross-task semantic coupling. For a new behavior or regression expected to fail at baseline, the test should fail at `baseline_revision` for the expected semantic reason; an already-green baseline needs justification. Independent review and a committed revision establish TEST FREEZE.

Every mode still runs relevant existing deterministic checks. Test PASS, including sensitivity evidence, does not prove the complete business journey.

## 6. Coding and parallel waves

Before writing, Coding verifies Product/Design freeze integrity and TEST FREEZE only when applicable, plus the declared baseline/dependencies. In inline mode it may write non-frozen tests within authorized scope.

The coordinator computes the current `READY_SET`. Independent READY tasks should fan out to separate runtime-native worktrees and isolated Coding contexts when safe. Tasks remain serialized when they have dependency edges, competing write scopes, required shared uncommitted state, global-resource conflicts, insufficient isolation, or resource/runtime limits.

A failing frozen test is not authority to edit the test. If the contract is wrong, Coding stops and requests a freeze break.

## 7. Module CR

Module CR independently checks contract conformance, freeze integrity, test sensitivity/integrity, scope, ownership, correctness, failure semantics, architecture, regression risk, and unjustified complexity. In a runtime with isolated agents, CR starts from a fresh review context and repository evidence rather than continuing the Coding agent's reasoning transcript.

A review finding must identify evidence and reachable impact; style preference alone is not a blocker.

## 8. Integration and Final CR

Integration assembles reviewed modules without taking ownership of module behavior. Real cross-module contract conflicts are escalated rather than normalized through hidden adapters.

Final CR verifies the integrated user journey, PRD coverage, cross-module contracts, regression, ownership, and freeze integrity. Module PASS is evidence, not proof of whole-system correctness.

## 9. Human/agent split

For a runnable user-facing module whose actual behavior still needs human judgment, return focused acceptance instructions before starting the next dependent module/page unless the user has approved uninterrupted progression. Do not force an acceptance stop for trivial edits with sufficient checks.

Technical continuity is preserved through versioned repository artifacts and structured Agent Handoff rather than long chat summaries. When runtime-native delegation exists, routine stage completion is an internal transition and should trigger the next eligible stage automatically without a Human Brief. Human-facing output occurs when the workflow completes or returns control for a material decision, Freeze Break, blocker/delegation failure, or focused final acceptance.
