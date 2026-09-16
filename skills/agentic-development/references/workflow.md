# Workflow Routing

## Purpose

Route a development task to the smallest safe stage and keep the method usable in both manual multi-chat and sub-agent execution.

## Canonical lifecycle

```text
Requirement / finding
    ↓
PRD / Product Discussion
    ↓ PRODUCT FREEZE
Technical Design + module slicing
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
   - Ensure adequate regression test coverage.
   - Freeze/correct Test as needed.
   - Coding -> Module CR.

2. **Product-contract defect or missing product rule** — repository product truth disagrees with intended behavior.
   - Return to Product/PRD.
   - Re-freeze downstream artifacts after approval.

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
Module A: Test -> Coding -> CR
Module B: Test -> Coding -> CR
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
- provide the next-stage prompt;
- human opens a fresh chat.

Delegated mode:

- parent/coordinator delegates a bounded next stage using the same stage contract;
- child reads repository truth directly;
- child returns structured status/revisions/blockers;
- parent does not replace repository truth with a prose retelling.

## Stop and reroute

Stop the current stage when:

- an upstream frozen artifact is wrong or contradictory;
- required behavior needs an undeclared external-module contract change;
- a prerequisite task/revision is missing;
- the stage would need to exceed its authority to make progress.

Use a Freeze Break or dependency handoff instead of improvising across boundaries.
