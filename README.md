# Agentic Development System

A contract-driven software-development protocol for human- and agent-operated workflows.

This repository defines a methodology for agentic software engineering. It treats repository artifacts—not chat history—as durable truth, and uses stage-specific prompts, role contracts, frozen artifacts, task packets, engineering standards, and independent review to reduce requirement drift.

The current objective is deliberately small: **make the workflow explicit, runnable, and testable on real projects before building orchestration infrastructure.** A human may manually open separate chats, or an agent runtime may delegate to sub-agents; both should follow the same repository contracts.

## Usage guides

- [使用手册（中文）](docs/guides/usage.zh-CN.md)
- [Usage Guide (English)](docs/guides/usage.en.md)

If you want to apply the method to a real project, start with the usage guide rather than reading every protocol document first.

## Core lifecycle

```text
Requirement input
    ↓
PRD
    ↓  PRODUCT FREEZE
Technical Design + Module Task Slicing
    ↓  DESIGN FREEZE
Per-module Test Contract
    ↓  TEST FREEZE
Module: Test → Coding → CR
    ↓
Integration / top-level coding
    ↓
Final CR
    ↓
Focused human acceptance where required
```

Chats and agents are disposable execution environments. Durable decisions belong in versioned repository artifacts.

## What is authoritative

- **Current-state truth** — production code, configuration, schemas, tests, runtime evidence.
- **Target-state truth** — approved PRD, Technical Design, module contracts, frozen tests.
- **Prompts** — execution interfaces that tell an agent how to consume those truths; prompts are not a parallel source of truth.
- **Chat history** — useful working context, but not an authoritative requirement unless written back to the repository.

## Execution model

The same protocol can run in two modes:

### Manual orchestration

A human opens the PRD, design, test, coding, review, integration, and final-review chats as needed and starts each stage with the corresponding prompt.

### Agent orchestration

A capable runtime may use sub-agents/threads to execute the same stages and module slices. Automation is optional; it must not change the contracts.

The number of chats is therefore an implementation detail. The durable design is the artifact flow, role boundary, freeze boundary, and handoff contract.

## Prompt generation

Prompt Generation is currently a **composition practice**, not an automation requirement.

```text
current intent
+ stage base template
+ project repository truth
+ task / freeze context
        ↓
high-quality execution prompt
```

Use [`prompts/prompt-generator.md`](prompts/prompt-generator.md) as a meta-prompt when you want an agent to compose the next task prompt.

Open-ended natural language remains appropriate for uncertain work such as PRD, UX/UE, bug understanding, and architecture discussion. Once the target is stable, repeated execution work should increasingly use standardized prompts for Test, Coding, CR, Integration, Final CR, and other stable high-frequency stages.

Rule of thumb:

> **Explore with Discussion; execute with standardized prompts.**

## Role and output contracts

Each stage has a **Role Contract**: responsibility, authority, forbidden actions, stop conditions, and completion evidence. Roles are not expertise role-play; they exist to constrain what an agent may decide or change.

Execution output has three supported projections:

- **Human Brief** — default concise result: conclusion, capability/boundary, impact/risk, decisions required, next step.
- **Human Discussion** — expanded reasoning only when trade-offs or human judgment are materially required, or when explicitly requested.
- **Agent Handoff** — structured task status, authoritative artifacts/revisions, scope, validation, blockers, and next stage.

The protocol is defined in [`docs/protocols/execution-contract.md`](docs/protocols/execution-contract.md). Project-local `AGENTS.md` may refine it, while task prompts select the output needed for the current run.

## Engineering standards

The repository includes a language- and framework-independent engineering baseline under [`docs/standards/`](docs/standards/README.md).

These standards define cross-project invariants such as:

- explicit ownership and one authoritative implementation per rule;
- responsibility-driven module boundaries and dependency direction;
- locality before premature sharing;
- justified abstraction rather than speculative layering;
- semantic implementation quality and explicit units/representations;
- failure semantics that do not hide invalid state behind defaults or fallback.

They do **not** prescribe a universal directory structure or replace project-local architecture and framework rules.

## Key constraints

- Repository artifacts and code are the durable source of truth.
- Prompts reference truth; they do not duplicate or replace it.
- A frozen upstream artifact is read-only to downstream stages.
- A downstream agent that finds a frozen artifact wrong must raise a **Freeze Break Request** instead of silently editing it.
- Coding agents do not weaken frozen tests to regain green status.
- Agents receive the smallest sufficient context and write scope.
- Module work stays vertical and bounded; unrelated findings go to backlog unless they block correctness.
- Sub-agents do not negotiate project truth through free-form summaries; they read repository artifacts directly and return structured status.
- Human attention is reserved for product intent, material trade-offs, freeze breaks, and final acceptance—not routine technical detail.

## Lightweight learning loop

The base prompts and protocols are expected to improve from real projects.

Do not add rules after every one-off failure. Promote a lesson only when it repeats or has high impact, is reusable, and the correction is smaller than the problem it prevents.

See [`docs/workflow/learning-loop.md`](docs/workflow/learning-loop.md).

## Repository layout

```text
docs/
  guides/             Bilingual usage guides
  architecture/       System model and boundaries
  workflow/           Lifecycle, freeze, and learning-loop rules
  standards/          Language-independent engineering baseline
  protocols/          Role/output execution contracts
  prompts/            Prompt-generation model
  task-packets/       Structured handoff contract
  decisions/          Architectural decisions and rationale
  roadmap.md          Validation focus and long-term direction

templates/
  prd.md
  technical-design.md
  task-packet.yaml

prompts/
  prompt-generator.md
  prd.md
  technical-design.md
  test.md
  coding.md
  review.md
  orchestrator.md
  integration.md
  final-review.md
```

## Start here

1. [`docs/guides/usage.zh-CN.md`](docs/guides/usage.zh-CN.md) / [`docs/guides/usage.en.md`](docs/guides/usage.en.md) — practical usage.
2. [`docs/workflow/development-lifecycle.md`](docs/workflow/development-lifecycle.md) — current end-to-end workflow.
3. [`docs/protocols/execution-contract.md`](docs/protocols/execution-contract.md) — stage roles and human/agent output contract.
4. [`docs/workflow/freeze-gates.md`](docs/workflow/freeze-gates.md) — freeze semantics and safe freeze breaks.
5. [`docs/prompts/prompt-generation.md`](docs/prompts/prompt-generation.md) — how task prompts are composed.
6. [`docs/workflow/learning-loop.md`](docs/workflow/learning-loop.md) — how the methodology learns without becoming heavy.
7. [`docs/task-packets/task-packet.md`](docs/task-packets/task-packet.md) — structured task handoff.
8. [`docs/architecture/system-model.md`](docs/architecture/system-model.md) — truth, control, and execution boundaries.
9. [`docs/standards/README.md`](docs/standards/README.md) — engineering baseline.

## Current focus and long-term direction

The project is currently in **methodology validation**, not platform construction.

The immediate next step is to run this protocol on real development work, observe where agents still drift or humans still receive too much information, and refine the documents/prompts from evidence.

A **multi-agent development system remains a long-term target**. If the method proves stable, this protocol can later act as the contract layer for richer orchestration—implemented here or integrated with systems such as GitHub Spec Kit or future coding-agent runtimes.

Deferred implementation mechanisms such as a DAG engine, CLI, queue, scheduler, automatic worktrees, agent RPC, persistent orchestration state, and automatic dispatch are intentionally not current requirements. See [`docs/roadmap.md`](docs/roadmap.md).
