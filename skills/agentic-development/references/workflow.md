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

After TEST FREEZE, execute Coding and Module CR per bounded task. Coding and independent CR are distinct authority contexts: when the runtime supports isolation, Module CR must start in a fresh execution context and reconstruct the task from repository truth, frozen revisions, Task Packet, and implementation diff. Do not resume the Coding agent's reasoning transcript as the reviewer.

Independent ready tasks may run in parallel when declared dependencies and write scopes permit it. Dependent tasks remain ordered. A typical execution wave is:

```text
compatible Test preparation
    ↓ per-task TEST FREEZE
ready Coding tasks (parallel where safe)
    ↓
fresh Module CR tasks
    ↓ PASS
unlock next dependency wave
```

This replaces a mechanical requirement for either "one chat per stage per slice" or "all tests -> all coding -> all review". Preserve authority and dependency correctness first; minimize execution overhead second.

## Continuation policy

When the current stage completes successfully and no canonical stop condition applies:

1. determine which task/stage is now eligible from Task Packets, dependency state, and revisions;
2. if the runtime provides isolated sub-agents/threads, delegate the next bounded work automatically;
3. continue through routine Test, Coding, Module CR, Integration, and Final CR transitions without waiting for the human merely to launch the next chat;
4. if several independent tasks are ready, parallelize only when dependency and write-scope safety is explicit.

Automatic continuation stops when:

- a material product/UX/architecture/risk decision requires human judgment;
- a `FREEZE_BREAK_REQUIRED` needs approval or upstream rework;
- an unresolved environment/dependency blocker prevents safe execution;
- a stage would need to exceed its authority;
- focused final human acceptance is required;
- the runtime cannot provide the required delegation/isolation capability.

A stage ending is not itself a human stop condition.

## Human vs runtime coordination

Delegated mode is preferred when the runtime supports isolated execution contexts:

- the parent/coordinator delegates bounded work using the same canonical stage contracts;
- each child reads repository truth directly and verifies declared base/freeze revisions before writing;
- the parent tracks readiness/status/revisions and does not replace repository truth with a prose retelling;
- review independence is achieved through a fresh review context, not by asking the human to manually create a new chat.

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
