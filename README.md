# Agentic Development System

A contract-driven, multi-agent software development workflow.

This repository defines a development system for agentic software engineering. It treats the repository—not chat history—as the durable source of truth, and uses phase-specific prompts, frozen artifacts, task packets, engineering standards, and independent review to coordinate multiple coding agents safely.

## Core idea

```text
Repository truth
    ↓
PRD
    ↓
Technical Design + Module Task Slicing
    ↓
Test Contract / Test Freeze
    ↓
Module: Test → Coding → CR
    ↓
Integration
    ↓
Final CR
```

Chats and agents are temporary execution environments. Durable decisions must be written back to versioned repository artifacts.

## System model

The system is split into three planes:

- **Truth Plane** — code, PRD, technical design, tests, standards, task contracts, Git revisions.
- **Control Plane** — task graph, freeze gates, task packets, prompt generation, permissions, orchestration.
- **Execution Plane** — product/design agents, test agents, coding agents, module reviewers, integration agents, final reviewers.

See [`docs/architecture/system-model.md`](docs/architecture/system-model.md).

## Engineering standards

The repository now includes a language- and framework-independent engineering baseline under [`docs/standards/`](docs/standards/README.md).

These standards define cross-project invariants such as:

- explicit ownership and one authoritative implementation per rule;
- responsibility-driven module boundaries and dependency direction;
- locality before premature sharing;
- justified abstraction rather than speculative layering;
- semantic implementation quality and explicit units/representations;
- failure semantics that do not hide invalid state behind defaults or fallback.

They do **not** prescribe a universal directory structure or replace project-local architecture and framework rules. Projects map the baseline onto their own technology and business context.

## Development lifecycle

The v0.1 lifecycle is:

1. Produce and approve a **PRD** for the current requirement/version.
2. Produce a **Technical Design** that maps the PRD onto the actual codebase, defines terminology and module boundaries, applies relevant engineering/project standards, and slices work into agent-sized tasks.
3. Generate **tests per module task** from the frozen PRD + Technical Design, then freeze the test contract.
4. Execute **vertical module loops**: Test → Coding → Module CR.
5. Integrate completed modules through a top-level coding/integration agent.
6. Run a **Final CR** against the complete PRD, technical design, applicable standards, tests, and integrated code.
7. Perform focused human E2E/acceptance where product judgment is required.

See [`docs/workflow/development-lifecycle.md`](docs/workflow/development-lifecycle.md).

## Key constraints

- Chat history is not a source of truth.
- Prompts are not a source of truth.
- Prompts should reference current repository artifacts rather than duplicate them.
- A frozen upstream artifact is read-only to downstream agents.
- If a downstream agent believes a frozen artifact is wrong, it must stop and raise a **Freeze Break Request** instead of silently editing it.
- Agents should receive the smallest sufficient task context and write scope.
- Sub-agents do not negotiate product truth with each other; they read versioned artifacts and report structured status to the orchestrator.
- Scope discovered during one module should not be silently absorbed into that module unless it blocks correctness.
- Project-specific standards refine the universal engineering baseline; conflicts with frozen or authoritative artifacts must be surfaced rather than silently resolved.

## Repository layout

```text
docs/
  architecture/       System model and boundaries
  workflow/           Lifecycle and freeze/gate rules
  standards/          Language-independent engineering baseline
  prompts/            Prompt-generation model
  task-packets/       Structured handoff contract
  decisions/          Architectural decisions and rationale
  roadmap.md          Planned evolution

templates/
  prd.md
  technical-design.md
  task-packet.yaml

prompts/
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

- [`docs/architecture/system-model.md`](docs/architecture/system-model.md) — what is truth, control, and execution.
- [`docs/standards/README.md`](docs/standards/README.md) — engineering baseline and how project-specific rules map onto it.
- [`docs/standards/module-design.md`](docs/standards/module-design.md) — ownership, placement, sharing, and dependency rules.
- [`docs/workflow/development-lifecycle.md`](docs/workflow/development-lifecycle.md) — end-to-end development flow.
- [`docs/workflow/freeze-gates.md`](docs/workflow/freeze-gates.md) — what freezes mean and how to break them safely.
- [`docs/task-packets/task-packet.md`](docs/task-packets/task-packet.md) — structured agent handoff contract.
- [`docs/prompts/prompt-generation.md`](docs/prompts/prompt-generation.md) — how phase-specific prompts should be generated.
- [`docs/decisions/0001-repository-truth-and-compiled-execution.md`](docs/decisions/0001-repository-truth-and-compiled-execution.md) — why the project is structured this way.

## Status

**v0.1 baseline** — methodology, engineering standards, templates, role prompts, freeze semantics, and task-packet contracts are initialized.

The next step is not to build a large orchestration platform. It is to validate the workflow and engineering baseline on real projects, collect failure evidence, and then automate only the controls that prove useful: prompt compilation, write-scope enforcement, freeze-diff checks, task scheduling, and review dispatch.
