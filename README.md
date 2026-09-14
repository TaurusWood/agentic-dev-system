# Agentic Development System

A contract-driven, multi-agent software development workflow.

This repository defines a development system for agentic software engineering. It treats the repository—not chat history—as the durable source of truth, and uses phase-specific prompts, frozen artifacts, task packets, and independent review to coordinate multiple coding agents safely.

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
- **Execution Plane** — test agents, coding agents, module reviewers, integration agents, final reviewers.

See [`docs/architecture/system-model.md`](docs/architecture/system-model.md).

## Development lifecycle

The v0.1 lifecycle is:

1. Produce and approve a **PRD** for the current requirement/version.
2. Produce a **Technical Design** that maps the PRD onto the actual codebase, defines terminology and module boundaries, and slices work into agent-sized tasks.
3. Generate **tests per module task** from the frozen PRD + Technical Design, then freeze the test contract.
4. Execute **vertical module loops**: Test → Coding → Module CR.
5. Integrate completed modules through a top-level coding/integration agent.
6. Run a **Final CR** against the complete PRD, technical design, tests, and integrated code.

See [`docs/workflow/development-lifecycle.md`](docs/workflow/development-lifecycle.md).

## Key constraints

- Chat history is not a source of truth.
- Prompts are not a source of truth.
- Prompts should reference current repository artifacts rather than duplicate them.
- A frozen upstream artifact is read-only to downstream agents.
- If a downstream agent believes a frozen artifact is wrong, it must stop and raise a **Freeze Break Request** instead of silently editing it.
- Agents should receive the smallest sufficient task context and write scope.
- Sub-agents do not negotiate product truth with each other; they read versioned artifacts and report structured status to the orchestrator.

## Repository layout

```text
docs/
  architecture/       System model and boundaries
  workflow/           Lifecycle and freeze/gate rules
  prompts/            Prompt-generation model
  task-packets/       Structured handoff contract
  roadmap.md          Planned evolution

templates/
  prd.md
  technical-design.md
  task-packet.yaml

prompts/
  test.md
  coding.md
  review.md
```

## Status

**v0.1 baseline** — methodology and execution contracts are initialized. The next step is to validate the workflow on a real project, then evolve prompt generation and freeze enforcement from conventions into executable tooling.
