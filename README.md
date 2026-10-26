# Agentic Development System

A lightweight, contract-driven workflow for building and maintaining software with coding agents. It helps keep **product intent, architecture, tests, implementation, and review** aligned across long-running or multi-agent work.

Use the `agentic-development` Skill in an existing repository. No custom orchestrator, task server, or special project structure is required.

## Quick start

Install the Skill once for Codex (global installation is recommended when working across repositories):

```bash
npx skills add https://github.com/TaurusWood/agentic-dev-system --skill agentic-development --global --agent codex --yes
npx skills update agentic-development --global
```

Install with additional `--agent` selectors for other supported coding agents. Avoid keeping an outdated project-local copy alongside a global copy with the same name.

In your coding agent, describe the task normally, or start with an **optional intent prefix**:

```text
feat: Add bulk enable/disable for merchant rules.
fix: A merchant rule overwrites manually confirmed transactions.
refactor: Separate rule eligibility from history impact planning without changing behavior.
```

You can also explicitly say: `Use the agentic-development skill to handle this task.` Without a prefix, the Skill infers the intent. It validates the request against repository evidence; `fix` does not force a coding-only solution when the defect is actually in Product or Technical Design.

## What it does

| Capability | When it helps | Result |
| --- | --- | --- |
| **Task-aware routing** (`feat`, `fix`, `refactor`) | New functionality, regressions, behavior-preserving cleanup | Enters the earliest stage that owns the unresolved decision |
| **Contracts and task slices** | Multi-module changes or work spanning multiple sessions | Explicit ownership, boundaries, dependencies, and scoped Task Packets |
| **Risk-based verification** | Routine UI changes through complex financial/permission logic | `lightweight`, `inline`, or `independent` testing instead of test-first ceremony for every task |
| **Independent review and architecture guards** | Especially bug fixes and incremental edits to existing logic | Fresh Module CR checks correctness **and** new coupling/ownership drift against the baseline |
| **Freeze and handoff discipline** | Decisions or tests must survive agent/context switches | Committed Product/Design freezes, optional Test freeze, revision-pinned handoffs |
| **Delegated execution** | Several independent slices can proceed safely | Uses runtime-native isolated agents/worktrees when available; otherwise supplies manual handoffs |

## Guide: choose an entry point

### 1. Feature or change request — `feat:`

```text
feat: In the expense-review UI, allow confirming all selected records in one operation.
Preserve the existing ledger rules and show a single success/failure result.
Use agentic-development and inspect the current contracts first.
```

If behavior is unresolved, start at Product/PRD. If behavior is already frozen, proceed to the needed Technical Design, Test, or Coding stage. Technical Design names the owning modules and creates bounded tasks; it does not redesign unrelated modules.

### 2. Bug or failed E2E — `fix:`

```text
fix: Saving a merchant classification rule sometimes changes a manually confirmed target person.
Reproduce the failure with synthetic data, find the root cause and owning module,
then make the smallest correct fix and review the architecture delta.
```

Establish **observed vs expected** behavior, identify root cause and impacted boundaries, and route accordingly:

- **Implementation defect:** focused fix → risk-matched regression checks → fresh Module CR.
- **Missing/wrong product rule:** return to Product and update the applicable freeze.
- **Incorrect module design/contract:** return to Technical Design before editing the architecture.

Do not repair a symptom by adding another special case in the wrong module. A simple local fix does **not** require a full redesign.

### 3. Structure-only work — `refactor:`

```text
refactor: Split rule eligibility checks from impact-plan construction.
Do not change user-visible results, persistence semantics, or existing public contracts.
Verify preservation with relevant regression evidence.
```

State the structural objective, affected boundary, and invariants that must remain unchanged. Review the delta for changed dependencies or side effects. Do not refactor unrelated legacy code for stylistic consistency.

### 4. Continue a frozen Slice

```text
Use agentic-development to continue TASK-04 in this repository.
Read its Task Packet and recorded freeze revisions, verify the current baseline,
then proceed to the next allowed stage.
```

The repository—not the previous chat—is the source of truth. The Skill checks recorded revisions, dependencies, allowed paths, and applicable test mode before resuming.

## Admin UX companion

[`admin-ux-design`](skills/admin-ux-design/SKILL.md) is an optional, independently installable Skill for admin systems, internal tools, and operational consoles. It provides eight practical principles, six interaction patterns, and a lightweight prototype/interaction-contract handoff. It is stack-independent and does not introduce a CRUD framework, an audit phase, or a new freeze.

```bash
npx skills add https://github.com/TaurusWood/agentic-dev-system --skill admin-ux-design --global --agent codex --yes
```

Use it to improve a known admin task, try an isolated prototype, and record the approved interaction decisions. Formal implementation consumes those decisions plus Technical Design; disposable prototype code and mock data are not production authority. It can also help apply an already approved design without redesigning it.

Start with the [Chinese usage guide](docs/guides/admin-ux-design.zh-CN.md). Package validation and behavioral evaluation limits are documented there. `agentic-development` continues to own workflow semantics; the companion is not required for non-admin work.

## How execution works

```text
Task intent (optional feat/fix/refactor)
  → inspect repository + route to owning stage
  → Product / Technical Design only when needed
  → select test mode by risk
  → bounded Coding → independent Module CR
  → Integration / Final CR where applicable
  → focused human acceptance when automated evidence is insufficient
```

**For changes to existing code:** assess root cause, owning responsibility, and cross-module impact *before* editing. Afterwards, Module CR compares the implementation against its baseline for **new or aggravated architectural coupling**. Existing unrelated technical debt is not an automatic blocker. Final CR checks cumulative drift when several slices repeatedly change the same core boundary.

Testing is proportional: routine UI/CRUD work can use existing checks and focused acceptance; complex business rules, calculations, consequential state transitions, or risky data operations may warrant independently prepared tests and a Test freeze. Passing tests alone never establish full business correctness.

When the runtime supports safe isolated delegation, routine stage transitions and independent slices can proceed automatically. Otherwise, the Skill provides an Agent Handoff and a ready-to-use next prompt. Human review is reserved for material decisions, contract changes, blockers, and appropriate acceptance points.

## Reference

- [Skill entry](skills/agentic-development/SKILL.md) — how to start or continue.
- [Workflow routing](skills/agentic-development/references/workflow.md) — task intent, stage selection, change-impact checks, test routing, and continuation.
- [Stage contracts](skills/agentic-development/references/stage-contracts.md) — what each stage may change, preserve, and verify.
- [Task Packet template](templates/task-packet.yaml) — scoped execution context.
- [Engineering standards](docs/standards/README.md) — ownership, module boundaries, failure behavior, and code quality.
- [Web Chat Discussion Layer](docs/web-chat/discussion-protocol.md) — optional separate discussion protocol (`@discussion :init`, `:judge`, `:new-chat`, `:local`); not a substitute for the coding workflow.

For contributors: canonical runtime semantics live under [`skills/agentic-development/references/`](skills/agentic-development/references/). Root `prompts/` are thin launch adapters; `docs/` explains usage, not independent stage authority. After protocol edits, run:

```bash
node scripts/check-protocol-drift.mjs
```

The goal is **less rework and fewer missed architectural regressions**, not more process for small changes.
