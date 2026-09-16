# Agentic Development System

A contract-driven software-development protocol for human- and agent-operated workflows.

The project addresses a practical change in AI-assisted development: humans increasingly define intent, judge plans, and make material decisions while coding agents execute tests, implementation, and review. The main risk is therefore not only code quality; it is **semantic drift across requirements, design, tests, implementation, reviews, and chats**.

The current objective is deliberately small: make that workflow explicit, runnable, and testable on real projects before building orchestration infrastructure.

## Install

The runnable distribution is the `agentic-development` Skill under [`skills/agentic-development/`](skills/agentic-development/).

```bash
npx skills add https://github.com/TaurusWood/agentic-dev-system --skill agentic-development
```

A manual multi-chat workflow and a runtime with sub-agents use the same Skill contracts. Automation is optional.

## One normative runtime source

To prevent this repository from reproducing the same problem it is trying to solve, runtime protocol semantics have one normative location:

- [`skills/agentic-development/references/workflow.md`](skills/agentic-development/references/workflow.md)
- [`skills/agentic-development/references/stage-contracts.md`](skills/agentic-development/references/stage-contracts.md)
- [`skills/agentic-development/references/freeze-output.md`](skills/agentic-development/references/freeze-output.md)
- [`skills/agentic-development/references/prompt-composition.md`](skills/agentic-development/references/prompt-composition.md)

Root [`prompts/`](prompts/) files are **launch adapters**, not independent Role Contracts. `docs/` explains rationale and usage. If explanatory prose conflicts with runtime references, the runtime references win and the prose should be corrected.

Run:

```bash
node scripts/check-protocol-drift.mjs
```

to ensure prompt adapters do not grow a second copy of stage authority semantics.

This is intentionally lighter than a Prompt Compiler: **single normative source + thin adapters + a small drift check**.

## Canonical lifecycle

```text
Requirement / finding
        ↓
PRD / Product Discussion
        ↓ PRODUCT FREEZE
Technical Design + module slicing + initial Task Packets
        ↓ DESIGN FREEZE
Per-module Test
        ↓ TEST FREEZE
Coding
        ↓
Module CR
        ↓
Integration / top-level coding
        ↓
Final CR
        ↓
Focused human acceptance where needed
```

Tasks may enter later when upstream truth is already valid. Bug findings are first classified as Product, Design, Test, or implementation defects instead of automatically becoming Coding tasks.

## Repository truth

Chats are disposable execution environments. Prompts are execution interfaces. Durable truth belongs in versioned repository artifacts:

- code, configuration, schemas, runtime evidence;
- PRD / product contract;
- Technical Design and module task contracts;
- tests and test evidence;
- engineering standards;
- Task Packets;
- Git revisions / freeze points.

A fresh agent should be able to continue from repository truth plus compact execution metadata without needing the old chat transcript.

## PRD and Technical Design

PRD owns **WHAT**: user/player-visible behavior, flows, UX rules, acceptance, non-goals, and product boundaries.

Technical Design owns **HOW**: mapping the frozen product intent onto the actual codebase, module ownership, public contracts, state/data flow, dependencies, implementation constraints, and agent-sized task slicing.

Technical Design creates the initial Task Packet for each bounded task.

## Freeze semantics

The protocol defines PRODUCT FREEZE, DESIGN FREEZE, and TEST FREEZE.

A freeze is not a sentence saying “frozen”. It is established only after required review/approval when the artifact is present in a **committed Git revision** and its paths/revision are recorded for downstream execution.

Before writing, downstream stages verify consumed frozen paths against their recorded freeze revisions. An unexplained mismatch stops the task instead of letting the agent choose whichever version is convenient.

After TEST FREEZE, Coding cannot edit frozen tests merely to regain green status. If a frozen contract is wrong, return `FREEZE_BREAK_REQUIRED` to the owning stage.

For new behavior or bug regressions expected to be absent/broken at the declared baseline, TEST FREEZE normally records **baseline sensitivity evidence**: the relevant test failed at `baseline_revision` for the expected semantic reason. If it is already green, record why instead of manufacturing RED.

## Roles are authority boundaries

A stage Role Contract defines:

- Owns
- May change
- Must preserve
- Must not do
- Must stop when
- Done when

The purpose is not persona role-play. It is to prevent a downstream agent from acquiring authority simply because changing an upstream contract would make its local task easier.

## Task Packets

A Task Packet pins the bounded execution context:

- repository / branch / `base_revision`;
- product/design/test paths and revisions;
- dependencies;
- read/write/forbidden scope;
- validation;
- stop conditions;
- test baseline evidence when applicable.

Ownership is explicit: Technical Design creates the packet, Test owns the test-contract/evidence portion before TEST FREEZE, and the coordinator may update execution status without silently rewriting frozen contract fields.

See [`docs/task-packets/task-packet.md`](docs/task-packets/task-packet.md).

## Human and agent output

The protocol separates consumers:

- **Human Brief** — default: conclusion, boundary, material risk, required decision, next step.
- **Human Discussion** — only for genuine product/UX/architecture/risk trade-offs, Freeze Breaks, missing evidence, or explicit requests.
- **Agent Handoff** — structured revisions, authoritative inputs, scope, freeze integrity, validation, blockers, and next stage.

The objective is not minimum words. It is minimum human cognitive load consistent with correct judgment.

## Prompt composition

Prompt generation is currently a composition practice, not an automation subsystem:

```text
current intent
+ canonical stage contract
+ repository truth
+ Task Packet / freeze context
        ↓
execution prompt
```

Open-ended discussion remains appropriate while uncertainty is the work. Once intent is stable, repeated Test, Coding, CR, Integration, and Final CR work should use standardized launch prompts.

> Explore with Discussion; execute with standardized prompts.

## Engineering baseline

[`docs/standards/`](docs/standards/) contains language/framework-independent engineering invariants: ownership, module boundaries, dependency direction, justified abstraction, implementation quality, and explicit failure semantics. It does not prescribe one universal directory layout or replace project-local architecture.

## Current non-goals

The current version does not require a custom:

- DAG engine;
- CLI;
- queue or scheduler;
- worktree manager;
- agent RPC layer;
- persistent orchestration database;
- large Prompt Compiler;
- automatic dispatch system.

These mechanisms should be added or integrated only when real project evidence shows the protocol itself is stable and manual/runtime-native execution has become the bottleneck.

## Validation focus

The current version succeeds if real projects show that:

1. a fresh agent can route a task from Skill + repository truth;
2. stage authority prevents silent upstream rewriting;
3. freeze revisions are actually verifiable;
4. TEST FREEZE blocks both test weakening and non-discriminating test contracts;
5. Task Packets survive fresh-chat handoff without hidden context;
6. Human Brief reduces reading without hiding material decisions;
7. repeated CR/rework decreases;
8. the process remains light enough to use routinely.

The next useful work is therefore empirical validation on real repositories, not more orchestration infrastructure.
