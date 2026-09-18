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
Test preparation for one or more ready bounded tasks
    ↓ TEST FREEZE per task
Coding → fresh Module CR for ready tasks
    ↓ dependency unlock / next execution wave
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

It creates the initial Task Packet for each slice, including repository identity, `base_revision`, scope, dependencies, validation, and stop conditions.

DESIGN FREEZE requires design review plus a committed revision.

## 5. Test Contract

Test proves the frozen Product and Design contracts. One Test execution context may prepare several compatible bounded tasks when their frozen inputs, baselines, and fixtures do not create cross-task coupling. Each task still owns separate test-contract/evidence fields and establishes its own TEST FREEZE.

For new behavior or a bug regression expected to fail at the declared baseline, the test should be run against `baseline_revision` and fail for the expected semantic reason. This is sensitivity evidence, not ceremonial RED. If the test is already green, Test records why that result is valid.

TEST FREEZE requires the required independent test review plus a committed revision.

## 6. Coding

Before writing, Coding verifies Product/Design/Test freeze integrity and the declared baseline/dependencies. It writes only production code inside the bounded scope.

A failing frozen test is not authority to edit the test. If the contract is wrong, Coding stops and requests a freeze break.

## 7. Module CR

Module CR independently checks contract conformance, freeze integrity, test sensitivity/integrity, scope, ownership, correctness, failure semantics, architecture, regression risk, and unjustified complexity. In a runtime with isolated agents, CR starts from a fresh review context and repository evidence rather than continuing the Coding agent's reasoning transcript.

A review finding must identify evidence and reachable impact; style preference alone is not a blocker.

## 8. Integration and Final CR

Integration assembles reviewed modules without taking ownership of module behavior. Real cross-module contract conflicts are escalated rather than normalized through hidden adapters.

Final CR verifies the integrated user journey, PRD coverage, cross-module contracts, regression, ownership, and freeze integrity. Module PASS is evidence, not proof of whole-system correctness.

## 9. Human/agent split

Default human output is the minimum information needed for judgment. Technical continuity is preserved through versioned repository artifacts and structured Agent Handoff rather than long chat summaries. When runtime-native delegation exists, routine stage completion should trigger the next eligible stage automatically; human attention is reserved for material decisions, Freeze Breaks, unresolved blockers, and focused final acceptance.
