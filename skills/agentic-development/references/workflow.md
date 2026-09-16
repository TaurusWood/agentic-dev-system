# Workflow Routing

This file is the canonical runtime source for lifecycle and routing semantics.

## Purpose

Route a development task to the smallest safe stage and keep the method usable in both manual multi-chat and sub-agent execution.

## Canonical lifecycle

```text
Requirement / finding
    ↓
PRD / Product Discussion
    ↓ PRODUCT FREEZE
Technical Design + module slicing + initial task packets
    ↓ DESIGN FREEZE
Per-module Test
    ↓ TEST FREEZE
Coding
    ↓
Module CR
    ↓
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

## Vertical module execution

Technical Design may split one iteration into bounded module tasks.

Prefer:

```text
Module A: Test -> TEST FREEZE -> Coding -> CR
Module B: Test -> TEST FREEZE -> Coding -> CR
```

over:

```text
all tests -> all coding -> all review
```

when vertical slices reduce context and allow independent validation.

Independent modules may run in parallel if the runtime supports it. Dependent modules remain ordered by declared dependencies.

## Human vs runtime coordination

Manual mode:

- finish current stage;
- write durable results to repository artifacts when appropriate;
- establish any required freeze at a committed revision;
- provide the next-stage prompt;
- human opens a fresh chat.

Delegated mode:

- parent/coordinator delegates a bounded next stage using the same stage contract;
- child reads repository truth directly;
- child verifies declared base/freeze revisions before writing;
- child returns structured status/revisions/blockers;
- parent does not replace repository truth with a prose retelling.

## Stop and reroute

Stop the current stage when:

- an upstream frozen artifact is wrong, contradictory, or no longer matches its recorded freeze revision;
- required behavior needs an undeclared external-module contract change;
- a prerequisite task/revision is missing;
- the task packet's base revision/dependencies are stale in a way that affects correctness;
- the stage would need to exceed its authority to make progress.

Use a Freeze Break, dependency handoff, or refreshed task packet instead of improvising across boundaries.
