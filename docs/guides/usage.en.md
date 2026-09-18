# Usage Guide (English)

> Agentic Development System is a software-development protocol executable either manually across chats or by runtimes with sub-agents. The current focus is protocol validation, not scheduler/platform construction.

Chinese version: [`usage.zh-CN.md`](usage.zh-CN.md)

## 1. One runtime protocol

Runtime semantics are defined only by:

- `skills/agentic-development/references/workflow.md`
- `skills/agentic-development/references/stage-contracts.md`
- `skills/agentic-development/references/freeze-output.md`
- `skills/agentic-development/references/prompt-composition.md`

`prompts/*` are launch adapters and no longer duplicate Role Contracts. `docs/*` explains rationale and usage. If explanatory prose conflicts with the Skill references, the Skill references win and the prose should be corrected.

## 2. Install and invoke

```bash
npx skills add https://github.com/TaurusWood/agentic-dev-system --skill agentic-development
```

Whether a human opens a fresh chat or a runtime delegates to a sub-agent, the execution unit should use `agentic-development` and read the target repository directly. When isolated sub-agents are available, prefer coordinator-driven automatic continuation; manual chat creation is the fallback.

## 3. Lifecycle

```text
Requirement / finding
→ PRD / Product Discussion
→ PRODUCT FREEZE
→ Technical Design + Task Packet
→ DESIGN FREEZE
→ Test preparation for one or more ready tasks
→ TEST FREEZE per task
→ Coding → fresh Module CR in dependency waves
→ Integration
→ Final CR
→ Focused Human Acceptance
```

A task may enter later. Enter at the earliest stage that still owns unresolved truth.

## 4. Freeze is a versioned fact

A freeze requires:

1. the owning stage's required review/approval;
2. the artifact to exist in a committed Git revision;
3. paths + freeze revision recorded in Task Packet/Handoff;
4. stage-specific evidence recorded.

`ready to freeze`, `proposed freeze`, and an uncommitted working tree are not established freezes.

Before writing, downstream stages verify frozen paths against recorded revisions. An unexplained mismatch stops execution rather than allowing the agent to choose the convenient version.

## 5. TEST FREEZE also needs discrimination

For new behavior or a bug regression expected to be absent/broken at `baseline_revision`, the relevant test should be run at that baseline and fail for the expected semantic reason before TEST FREEZE.

If baseline is already GREEN, record a valid justification instead of manufacturing RED.

This addresses the second false-green mode: a test contract that was weak from the start.

## 6. Task Packet ownership

Technical Design creates the initial Task Packet with repository/branch/`base_revision`, Product/Design revisions, scope, dependencies, validation, and stop conditions.

Test owns only the packet's `test_contract` and test-evidence fields before TEST FREEZE. A coordinator may update execution metadata such as phase/status/result revision, but it does not silently rewrite frozen contract fields.

## 7. Runtime-native orchestration and manual fallback

If the runtime provides isolated sub-agents/threads, use one coordinator to continue automatically across routine stages. Compatible Test tasks may be batched in one Test context while preserving separate Task Packets, evidence, and TEST FREEZE revisions. Coding and Module CR use separate execution contexts; do not resume or reuse the Coding transcript as the independent review context.

Independent ready tasks may run in parallel. Dependent tasks remain ordered by the dependency graph.

When delegation is unavailable, use the same protocol manually:

```text
Product Chat
→ Design Chat
→ Test Chat / compatible Test batch
→ Coding Chat
→ fresh Module CR Chat
→ ...
→ Integration Chat
→ Final CR Chat
```

Every execution context reconstructs state from repository truth + Task Packet rather than a long previous-chat summary.

## 8. Prompt composition

Prompt Generator remains a composition practice:

```text
current intent
+ canonical stage contract
+ repository truth
+ Task Packet / Freeze Context
→ execution prompt
```

Root prompt files add launch shape only; they do not own Role or Freeze semantics.

> Explore with Discussion; execute with standardized prompts.

## 9. Outputs

Human Brief is the default: conclusion, capability/boundary, material risk, required human decision, next step.

Human Discussion is reserved for material product/UX/architecture trade-offs, Freeze Breaks, insufficient evidence, or explicit requests.

Agent Handoff carries execution metadata such as revisions, authority, scope, freeze integrity, validation, blockers, and next stage. Durable project truth remains in the repository.

## 10. Current non-goals

Do not pre-build a DAG engine, scheduler, queue, worktree manager, Agent RPC layer, state database, or large Prompt Compiler merely because future automation may use one.

First validate the protocol on real projects: fresh-context continuity, authority boundaries, freeze integrity, test discrimination, native delegation/continuation, Human Brief cognitive load, and repeated-review/rework reduction.
