# Agentic Development System

A contract-driven software-development protocol for human- and agent-operated workflows.

The project addresses a practical change in AI-assisted development: humans increasingly define intent, judge plans, and make material decisions while coding agents execute tests, implementation, and review. The main risk is therefore not only code quality; it is **semantic drift across requirements, design, tests, implementation, reviews, and chats**.

The current objective is deliberately small: make that workflow explicit, runnable, and testable on real projects before building orchestration infrastructure.

## Install

The runnable distribution is the `agentic-development` Skill under [`skills/agentic-development/`](skills/agentic-development/).

```bash
npx skills add https://github.com/TaurusWood/agentic-dev-system --skill agentic-development
```

A manual multi-chat workflow and a runtime with sub-agents use the same Skill contracts. Manual execution remains supported, but when isolated runtime-native delegation is available the default is automatic continuation across routine stages rather than asking the human to open each next chat.

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
Test preparation for one or more ready bounded tasks
        ↓ TEST FREEZE per task
READY_SET → parallel Coding/worktrees → fresh CR per task
        ↓ Integration / dependency unlock / next wave
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

- **Human Brief** — emitted when control returns to the human, with a canonical stop reason plus conclusion, boundary, material risk, required decision, and next step.
- **Human Discussion** — only for genuine product/UX/architecture/risk trade-offs, Freeze Breaks, missing evidence, or explicit requests.
- **Agent Handoff** — structured revisions, authoritative inputs, scope, freeze integrity, validation, blockers, and next stage. In orchestrated mode it is normally consumed internally by the coordinator.

Routine successful stage completion does not produce a Human Brief in orchestrated mode. The objective is not minimum words; it is minimum human interruption consistent with correct judgment.

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

## Runtime-native orchestration

Stage boundaries are authority boundaries, not mandatory user-managed chat boundaries.

When the runtime provides isolated sub-agents/threads, a coordinator should keep moving through routine Test, Coding, Review, Integration, and Final Review work without asking the human to launch each stage. Compatible Test tasks may be prepared in one Test context, while each task still owns its own Task Packet fields, evidence, and TEST FREEZE. Coding and Module CR must use separate reasoning contexts so review does not inherit the implementation agent's reasoning transcript.

For Coding, the coordinator computes a `READY_SET`. If two or more READY tasks are independent and runtime-native worktrees are available, parallel worktree fan-out is the default. Tasks are serialized only for dependency, overlapping write scope, required shared uncommitted state, shared global-resource conflict, insufficient isolation, or runtime/resource limits.

Reasoning/context isolation and filesystem/worktree isolation remain independent. A fresh sub-agent may safely use the shared workspace when work is serialized and required state is uncommitted; worktrees provide filesystem isolation for safe concurrent writers.

The coordinator returns control only for `COMPLETED`, `HUMAN_DECISION_REQUIRED`, `FREEZE_BREAK_REQUIRED`, `BLOCKED`, `DELEGATION_UNAVAILABLE`, or `FINAL_ACCEPTANCE_REQUIRED`. If the runtime cannot delegate safely, the protocol falls back to a structured handoff and ready-to-paste next-stage prompt.

## Current non-goals

The current version does not require building a custom:

- DAG engine;
- CLI;
- queue or scheduler;
- worktree manager;
- agent RPC layer;
- persistent orchestration database;
- large Prompt Compiler;
- automatic dispatch system.

Use runtime-native orchestration capabilities when they already exist. Add custom infrastructure only when real project evidence shows native/manual execution is the bottleneck.

## Validation focus

The current version succeeds if real projects show that:

1. a fresh agent can route a task from Skill + repository truth;
2. stage authority prevents silent upstream rewriting;
3. freeze revisions are actually verifiable;
4. TEST FREEZE blocks both test weakening and non-discriminating test contracts;
5. Task Packets survive fresh execution-context handoff without hidden context;
6. Human Brief reduces reading without hiding material decisions;
7. runtime-native continuation removes routine human orchestration without weakening stage isolation;
8. independent READY tasks actually execute concurrently when safe instead of being unnecessarily serialized;
9. parallel worktree results integrate without hidden semantic conflict or excessive merge/rework cost;
10. repeated CR/rework decreases;
11. the process remains light enough to use routinely.

The next useful work is therefore empirical validation on real repositories, not more orchestration infrastructure.
