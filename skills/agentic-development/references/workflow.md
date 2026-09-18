# Workflow Routing

This file is the canonical runtime source for lifecycle, continuation, batching, and execution-context isolation semantics.

## Purpose

Route a development task to the smallest safe stage, preserve stage independence, and keep the method usable in both runtime-native delegated execution and manual multi-chat fallback.

## Canonical lifecycle

```text
Requirement / finding
    ↓
PRD / Product Discussion
    ↓ PRODUCT FREEZE
Technical Design + module slicing + initial Task Packets + dependency graph
    ↓ DESIGN FREEZE
Test preparation for one or more ready bounded tasks
    ↓ TEST FREEZE per task
Coding → fresh Module CR for ready tasks
    ↓ dependency unlock / next execution wave
Integration / top-level coding
    ↓
Final CR
    ↓
Focused human acceptance when needed
```

Not every task must start at PRD. Enter at the earliest stage that actually owns the unresolved truth.

## Entry A — feature / version iteration

Use PRD when user-visible behavior, gameplay, UX, information hierarchy, or scope is still being decided.

After PRODUCT FREEZE, move to Technical Design. Do not ask Coding to infer product behavior from prose fragments.

## Entry B — bug / E2E finding

First classify the defect:

1. **Implementation defect** — frozen product/design contract is correct, code violates it.
   - Establish adequate regression coverage.
   - Produce baseline sensitivity evidence for the regression test when applicable.
   - TEST FREEZE, then Coding -> Module CR.

2. **Product-contract defect or missing product rule** — repository product truth disagrees with intended behavior.
   - Return to Product/PRD.
   - Re-freeze affected downstream artifacts after approval.

3. **Technical-design defect** — product intent is correct, but module ownership/interface/state flow/task slicing is wrong.
   - Return to Technical Design.
   - Re-freeze affected design/tests before coding.

Do not call every observed bug a Coding task.

## Entry C — technical refactor

When user-visible behavior should remain unchanged:

- record the behavior/invariants that must remain stable;
- define the technical objective and module boundary;
- establish regression expectations;
- continue through Technical Design -> Test -> Coding -> CR.

The product artifact may be lightweight, but invariant preservation must be explicit.

## Bounded tasks, Test batching, and execution waves

Technical Design may split one iteration into bounded tasks and declares their dependencies. The Task Packet remains the unit of scope, evidence, freeze state, Coding, and review even when several tasks share one Test execution context.

A Test execution may batch multiple explicitly assigned tasks when all of the following hold:

- the same Test authority and compatible authoritative inputs apply;
- Product/Design freezes and each task's declared baseline remain valid;
- fixture/test write scopes do not create hidden cross-task coupling;
- one task's test design does not depend on another task's not-yet-established implementation behavior;
- per-task test paths, baseline sensitivity evidence, validation, and TEST FREEZE revisions remain distinguishable.

Do not batch merely to reduce chat count when it weakens those boundaries. Split the Test work when baseline assumptions, fixtures, module ownership, or dependency state differ materially.

After TEST FREEZE, execute Coding and Module CR per bounded task. Coding and independent CR are distinct authority contexts: when the runtime supports isolation, Module CR must start in a fresh reasoning context and reconstruct the task from repository truth, frozen revisions, Task Packet, and implementation diff. Do not resume the Coding agent's reasoning transcript as the reviewer.

### Context isolation vs workspace isolation

These are separate dimensions:

- **Context isolation** means a fresh model/session reasoning state without the prior agent's private transcript. Coding -> Module CR requires this when the runtime supports it.
- **Workspace isolation** means a separate worktree/filesystem view. It is optional and should be chosen from repository state, write overlap, and concurrency needs.

A fresh Coding or CR sub-agent may use the shared workspace when execution is serialized and doing so is necessary to see valid uncommitted repository state. Do not create a worktree if it would hide required uncommitted artifacts. Conversely, parallel writers with overlapping or unsafe shared state require serialization or appropriate workspace isolation.

## READY_SET and parallel execution

After relevant TEST FREEZEs are established, the coordinator computes a `READY_SET` before choosing Coding work.

A task is READY when:

- its required Product/Design/Test freezes are established and pass integrity checks;
- every declared dependency required before Coding is complete at the revision expected by the task;
- its execution baseline is committed and contains the frozen artifacts it must consume;
- no canonical stage stop condition currently blocks the task.

If `READY_SET` contains multiple tasks, safe parallel fan-out is the default when the runtime supports concurrent isolated sub-agents and worktrees.

Before parallel dispatch, classify conflicts using repository evidence and Task Packets. A pair/group must be serialized when any of these applies:

- `DEPENDENCY` — a task depends on another task in the candidate group;
- `WRITE_SCOPE_OVERLAP` — declared write scopes overlap in a way that could produce competing edits;
- `SHARED_UNCOMMITTED_STATE` — a task requires uncommitted state that a new worktree would not contain;
- `GLOBAL_RESOURCE_CONFLICT` — tasks may concurrently rewrite shared lockfiles, schemas, generated artifacts, global config, migrations, or another singleton resource;
- `INSUFFICIENT_ISOLATION` — the runtime cannot provide the reasoning/filesystem isolation required for safe concurrent writes.

Do not serialize otherwise-independent tasks merely because serial execution is simpler.

### Parallel Coding / CR wave

For each safe parallel task:

1. create/reuse a dedicated worktree/branch from a committed baseline that contains its required frozen artifacts;
2. spawn an isolated Coding context for that bounded task;
3. require Coding to commit/identify its result revision inside that task branch/worktree;
4. start Module CR in a fresh reasoning context against that task's repository evidence and result revision;
5. allow independent CRs to run concurrently;
6. if CR returns `CHANGES_REQUIRED`, keep correction/re-review bounded to that task branch until reviewed;
7. expose only reviewed result revisions to Integration.

Conceptually:

```text
compatible Test preparation
        ↓ per-task TEST FREEZE
     compute READY_SET
        ↓
 conflict / dependency classification
        ↓
 ┌────────────┬────────────┬────────────┐
 WT-A         WT-B         WT-C
 Coding A     Coding B     Coding C
    ↓            ↓            ↓
 fresh CR-A   fresh CR-B   fresh CR-C
 └────────────┴────────────┴────────────┘
        ↓ reviewed revisions
      Integration
        ↓
 recompute READY_SET / unlock next wave
```

The coordinator should maximize **safe useful concurrency**, not agent count. Respect runtime/resource limits; do not hard-code a universal worker count in the protocol.

This replaces a mechanical requirement for either "one chat per stage per slice", fully serial bounded tasks, or "all tests -> all coding -> all review". Preserve authority, dependency correctness, and mergeability first; minimize wall-clock time second.

## Continuation policy

When the current stage completes successfully:

1. record/consume the stage result and Agent Handoff as coordinator state;
2. recompute the `READY_SET` from Task Packets, dependency/review state, freezes, and revisions;
3. classify READY tasks for parallel safety using the canonical conflict reasons above;
4. if multiple safe tasks and runtime-native worktree/concurrent delegation are available, fan them out in parallel by default;
5. otherwise serialize only the tasks whose conflict/dependency state requires it;
6. continue through routine Test, Coding, Module CR, Integration, and Final CR transitions without returning control to the human merely to launch the next stage.

In ORCHESTRATED mode, **stage completion is an internal transition, not a user-facing stop**. Agent Handoff is an internal delegation payload unless execution is returning to the human.

The orchestrator returns control to the human only with one of these stop reasons:

- `COMPLETED` — the requested iteration/workflow is complete and no further stage is required;
- `HUMAN_DECISION_REQUIRED` — a material product/UX/architecture/risk choice needs human judgment;
- `FREEZE_BREAK_REQUIRED` — a frozen contract must be reopened or approved upstream;
- `BLOCKED` — an environment, dependency, permission, or evidence blocker prevents safe progress;
- `DELEGATION_UNAVAILABLE` — the runtime cannot provide the isolation/delegation required for safe automatic continuation;
- `FINAL_ACCEPTANCE_REQUIRED` — focused human acceptance is the next required gate.

Do not invent routine additional stop reasons. Map stage-specific stop conditions onto the closest reason above and include the precise blocker/decision in the handoff.

A stage or child agent finishing successfully is never itself a stop reason.

## Human vs runtime coordination

Delegated mode is preferred when the runtime supports isolated execution contexts:

- the parent/coordinator delegates bounded work using the same canonical stage contracts;
- each child reads repository truth directly and verifies declared base/freeze revisions before writing;
- the parent tracks readiness/status/revisions and does not replace repository truth with a prose retelling;
- review independence is achieved through a fresh reasoning context, not by asking the human to manually create a new chat;
- intermediate Agent Handoffs are consumed internally; do not emit a Human Brief unless one of the canonical orchestrator stop reasons returns control to the human.

Manual mode remains a compatibility fallback:

- finish the current stage;
- write durable results to repository artifacts when appropriate;
- establish any required freeze at a committed revision;
- provide the canonical Agent Handoff and a ready-to-paste next-stage prompt;
- the human opens a fresh chat/execution context.

Both modes use the same authority and freeze semantics.

## Stop and reroute

Stop the current stage when:

- an upstream frozen artifact is wrong, contradictory, or no longer matches its recorded freeze revision;
- required behavior needs an undeclared external-module contract change;
- a prerequisite task/revision is missing;
- the task packet's base revision/dependencies are stale in a way that affects correctness;
- the stage would need to exceed its authority to make progress.

Use a Freeze Break, dependency handoff, or refreshed task packet instead of improvising across boundaries.
