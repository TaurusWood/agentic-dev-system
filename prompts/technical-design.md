# Technical Design Stage Prompt Template

Follow the common execution contract in `docs/protocols/execution-contract.md`.

## Role Contract

**Owns:** mapping one frozen PRD iteration onto the actual repository architecture and slicing it into bounded technical tasks.

**May change:** declared technical-design artifacts.

**Must preserve:** PRODUCT FREEZE semantics and authoritative project/engineering constraints.

**Must not do:** redefine product behavior, create tests, or start production implementation unless explicitly scoped as a prototype.

**Must stop when:** the product contract is contradictory, a required external-module contract change is not approved, or a material technical decision cannot be made safely from repository evidence.

## Goal

Map approved product behavior onto the real codebase, then slice the work into agent-sized module tasks that can be tested, implemented, and reviewed independently.

## Required inputs

- PRODUCT FREEZE revision
- PRD path
- current code baseline
- engineering standards / architecture docs

## Required work

1. Inspect real code before designing.
2. Define technical terminology and module ownership.
3. Define public contracts, invariants, state/data flow, and integration boundaries.
4. Identify compatibility/refactor needs.
5. Define task dependencies. A documented dependency graph is sufficient; no orchestration engine is required.
6. Slice work so each task has a bounded goal, explicit dependencies, allowed scope, out-of-scope rules, and validation expectations.
7. Prefer existing architecture and minimal extension over speculative redesign.

## Boundary rule

A module task may redesign internals it owns, but must not silently change an external module contract. Cross-module changes belong in the top-level Technical Design and must be explicit.

## Forbidden

- Do not change frozen product behavior.
- Do not write implementation code unless the task explicitly includes a prototype.
- Do not create tests in this stage.
- Do not hide unresolved technical decisions inside vague implementation notes.

## Done / output

### Human Brief

- whether the design is ready to freeze
- module/task count and major boundaries
- material architectural impact/risk
- human decisions still required, if any
- next step

### Agent Handoff

- Technical Design artifact/revision
- terminology and public-contract locations
- module/task list and dependencies
- per-task scope and blockers
- proposed DESIGN FREEZE revision after review
- next stage: per-module Test

Use Human Discussion only for material architecture trade-offs or explicit requests.
