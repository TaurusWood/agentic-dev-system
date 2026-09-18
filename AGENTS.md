# AGENTS.md

This repository defines the Agentic Development System itself. Treat repository artifacts as authoritative; do not treat prior chat history as an implicit requirement.

## Protocol authority

The runtime protocol has one normative source:

- `skills/agentic-development/references/workflow.md`
- `skills/agentic-development/references/stage-contracts.md`
- `skills/agentic-development/references/freeze-output.md`
- `skills/agentic-development/references/prompt-composition.md`

These files define workflow routing, stage authority, freeze/output semantics, and prompt composition. Root `prompts/` files are launch adapters and must not restate independent Role Contracts or freeze semantics. `docs/` may explain rationale and usage, but if explanatory prose conflicts with the runtime references, the runtime references win and the documentation must be corrected.

Run `node scripts/check-protocol-drift.mjs` after changing prompts or protocol structure.

## Working rules

1. Read the relevant repository documents before proposing changes.
2. Preserve the distinction between product requirements, Technical Design, tests, and implementation.
3. Do not silently rewrite an upstream frozen artifact to make downstream work easier.
4. If a frozen artifact appears incorrect or contradictory, stop that stage and raise a Freeze Break Request.
5. Keep changes scoped. New ideas discovered during one task go to backlog unless they block correctness.
6. Prefer explicit contracts, invariants, write scopes, validation commands, and stop conditions over broad prose instructions.
7. Prompts are execution interfaces, not sources of truth. They should reference repository artifacts and Git revisions.
8. Treat stage roles as authority boundaries, not role-play personas. Follow the canonical runtime references above.
9. Default human-facing output to Human Brief. Use Human Discussion only for material decisions or explicit requests. Use structured Agent Handoff for downstream execution.
10. Distinguish runtime-native delegation from custom orchestration infrastructure. Real-project evidence may justify preferring native sub-agents without implying a requirement to build a scheduler, DAG engine, or agent platform.
11. Do not create a second normative copy of workflow, stage, freeze, or prompt-composition semantics in `docs/` or `prompts/`.

## Current maturity

The repository is a methodology and contract baseline under active validation.

The workflow must remain usable through manual multi-chat execution. When a runtime already provides isolated sub-agents/threads, prefer native delegation and automatic continuation across routine stage boundaries; manual chat creation is the compatibility fallback, not the preferred execution model.

Do not assume or require a custom DAG engine, CLI, queue, scheduler, automatic worktree manager, agent RPC layer, state database, prompt compiler, or hard enforcement unless the repository actually implements it. Runtime-native delegation is an execution capability, not permission to invent missing infrastructure.
