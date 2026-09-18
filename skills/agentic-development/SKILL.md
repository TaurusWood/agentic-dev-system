---
name: agentic-development
description: Use for non-trivial software development work that benefits from staged product/design/test/coding/review flow, including feature work, UI/UX changes, bug fixes, refactors, E2E findings, freeze handling, runtime-native delegation, and manual fallback handoff.
license: MIT
compatibility: Requires access to the target project repository. Runtime-native isolated delegation is preferred when available; manual multi-chat execution is the supported fallback.
metadata:
  version: "0.2.1"
  source: "TaurusWood/agentic-dev-system"
---

# Agentic Development

Use this skill as a lightweight controller for the development method defined by `agentic-dev-system`.

The skill controls **workflow semantics**: stage selection, authority boundaries, freezes, output contracts, and handoffs. It does not assume the runtime can create chats, spawn agents, manage worktrees, or persist orchestration state.

## Canonical runtime protocol

The normative runtime semantics are defined only in these references:

- `references/workflow.md` — routing and lifecycle;
- `references/stage-contracts.md` — stage authority and done/stop contracts;
- `references/freeze-output.md` — freeze establishment, integrity preflight, freeze breaks, and output profiles;
- `references/prompt-composition.md` — execution-prompt composition.

Do not invent a second Role Contract or freeze protocol from a copied prompt or explanatory document. If another artifact conflicts with these references, stop and surface the conflict instead of choosing whichever version is easier.

## Core rule

Repository code and versioned project documents are authoritative. Chat history and generated prompts are execution context, not durable truth.

## Start every task this way

1. Inspect the target repository before proposing changes.
2. Read project-local `AGENTS.md` / equivalent instructions when present.
3. Locate only the product docs, technical docs, tests, task packet, and code relevant to the task.
4. Classify the task entry path and current stage using `references/workflow.md`.
5. Load `references/stage-contracts.md` for the selected stage.
6. If any upstream freeze is consumed, load `references/freeze-output.md` and perform its freeze-integrity preflight before writing.
7. Determine execution mode before starting stage work:
   - **ORCHESTRATED** when the runtime can create the required isolated execution contexts and the user has not requested manual control;
   - **MANUAL** otherwise.
8. Execute the stage within its authority boundary.
9. In ORCHESTRATED mode, treat successful stage completion as an internal state transition: produce/consume the Agent Handoff internally and immediately continue to the next eligible stage. Do not return control to the human merely because a stage or child agent finished.
10. Return a Human Brief only when `references/workflow.md` says the orchestrator must return control to the human. In MANUAL mode, also provide the Agent Handoff and ready-to-use next-stage prompt when continuation is required.

Do not require a project profile file. Infer the project map from existing repository instructions and structure unless the project explicitly provides one.

## Route the task

Read `references/workflow.md` when deciding where a task enters or what stage comes next.

Typical routing:

- New/changed user-visible behavior with unresolved intent -> PRD / Product Discussion.
- UX/UE or gameplay behavior still being explored -> PRD / Product Discussion.
- Frozen product intent that needs implementation planning -> Technical Design.
- Frozen design that needs acceptance coverage -> Test.
- Frozen tests/design ready for implementation -> Coding.
- Completed module implementation -> Module CR.
- Several reviewed modules need assembly -> Integration / top-level coding.
- Integrated iteration needs system-level verification -> Final CR.
- Bug/E2E finding -> first determine whether it is an implementation defect, product-contract defect, or design-contract defect; route to the owning stage instead of assuming Coding.

If the user explicitly requests a stage, honor it unless a missing prerequisite makes safe execution impossible.

## Stage authority

Read `references/stage-contracts.md` before executing or generating a prompt for a specific stage.

Roles are authority boundaries, not personas. Do not replace explicit ownership, forbidden actions, stop conditions, and done criteria with generic role-play such as “senior engineer”.

## Freeze and output rules

Read `references/freeze-output.md` whenever a freeze exists, a downstream contradiction is found, or a stage result must be handed to a human/agent.

Critical rules:

- a freeze is established only at a committed revision after the owning stage's required review/approval;
- downstream stages verify frozen paths before editing;
- after TEST FREEZE, Coding must not edit frozen tests merely to regain green status;
- a new/bug-regression test contract normally needs baseline sensitivity evidence before TEST FREEZE.

Raise `FREEZE_BREAK_REQUIRED` to the owning stage when a frozen contract is invalid instead of repairing it downstream.

Human Brief is the default projection **when control returns to the human**. It is not a mandatory per-stage output in ORCHESTRATED mode. Use Human Discussion only for material decisions, real trade-offs, Freeze Break approval, or when explicitly requested.

## Prompt generation

Read `references/prompt-composition.md` when the user asks for a task/stage prompt or when the next stage cannot be delegated automatically.

Prompt generation is a composition practice, not a separate truth source:

`current intent + stage contract + repository truth + task/freeze context -> execution prompt`

Explore uncertain product/UX/bug/architecture questions with natural-language discussion. Once intent is stable, prefer standardized prompts for repetitive Test, Coding, CR, Integration, and Final CR work.

## Delegation and continuation

Stage boundaries are authority boundaries, not mandatory user-managed chat boundaries.

When the runtime supports isolated sub-agents/threads, default to runtime-native delegation for routine downstream stages unless the user explicitly requests manual control:

- the coordinator continues across successful routine stage transitions without waiting for the human to open a new chat;
- each child reads repository truth directly and verifies declared base/freeze revisions before writing;
- compatible Test tasks may be batched in one Test execution context when `references/workflow.md` batching conditions hold; each task still keeps independent Task Packet fields, evidence, and TEST FREEZE;
- Coding and Module CR must use separate isolated **reasoning contexts**; do not resume or reuse the Coding agent's reasoning transcript as independent review;
- reasoning/context isolation and filesystem/worktree isolation are separate concerns; a fresh sub-agent may use a shared workspace when serialized access is safe, while worktrees are used only when repository state and concurrency make them appropriate;
- independent ready tasks may run in parallel only when declared dependencies and write scopes permit it;
- dependent tasks remain ordered by the dependency graph.

Stop automatic continuation only for the canonical orchestrator stop reasons defined in `references/workflow.md`. Successful stage completion is never one of those reasons.

If the runtime cannot delegate safely, do not pretend it can. Finish the current stage and provide the canonical Agent Handoff plus a ready-to-paste next-stage prompt.

Do not build or assume a custom DAG engine, scheduler, worktree manager, or agent RPC layer merely to satisfy this preference. Runtime-native delegation is the preferred execution mechanism; manual multi-chat remains the compatibility fallback.

## Scope discipline

- Keep module work vertical and bounded.
- Do not absorb unrelated findings unless they block correctness.
- Record non-blocking findings for backlog/handoff.
- Do not let Test redesign Product, Coding redesign Tests, or CR silently rewrite upstream contracts.
- Prefer first-hand repository evidence over retelling another agent's prose summary.

## Learning rule

Do not modify this methodology during active project work just because one task was awkward. Record reusable failure patterns. Promote a change to the base skill only when it is recurring or high-impact and the new rule is simpler than the failure it prevents.
