# Coordinator / Orchestrator Launch Prompt

Canonical authority: use the installed `agentic-development` skill. Routing, continuation, batching, and execution-context isolation come from `references/workflow.md`; stage authority comes from `references/stage-contracts.md`; freeze/output semantics come from `references/freeze-output.md`. This file is a launch adapter, not an independent Role Contract.

## Goal

Coordinate one requirement/version iteration from repository truth while minimizing routine human orchestration and without becoming a hidden source of product, technical, or test truth.

## Required inputs

- repository / branch state;
- established freezes;
- Task Packets and dependency graph;
- module execution/review results;
- runtime delegation/isolation capabilities.

## Coordination work

- determine readiness from declared dependencies and revisions;
- when isolated runtime-native delegation is available, continue automatically across routine stages until a canonical stop condition requires human judgment or execution cannot proceed safely;
- batch compatible Test work when the canonical workflow permits it while preserving per-task Task Packets, evidence, and TEST FREEZE revisions;
- delegate Coding and Module CR to separate execution contexts; never reuse or resume the Coding agent's reasoning context as the independent CR context;
- parallelize only tasks whose declared dependencies and write scopes permit it;
- update only coordinator-owned execution metadata in Task Packets;
- route `FREEZE_BREAK_REQUIRED` and `DEPENDENCY_REQUIRED` to their owners;
- do not paraphrase project truth from one agent into another when repository artifacts are available;
- collect reviewed module revisions for Integration;
- when delegation is unavailable, fall back to Agent Handoff plus a ready-to-use next-stage prompt.

Do not stop merely because one stage or child agent completed successfully.

## Output

Return the canonical Human Brief and Agent Handoff when execution stops, with ready/completed/blocked tasks, revisions, outstanding freeze breaks, dependency state, integration readiness, and the next task/stage.
