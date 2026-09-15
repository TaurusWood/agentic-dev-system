# Lightweight Learning Loop

## Goal

Improve the methodology from real development evidence without turning the system into an automatically self-modifying framework.

## Trigger

Do not run a formal retrospective after every trivial task. Record a learning candidate when one of these happens:

- repeated rework;
- requirement or contract drift;
- a Freeze Break caused by a reusable workflow weakness;
- a stage prompt consistently produces overreach or missing context;
- human output creates unnecessary cognitive load;
- an Agent Handoff is insufficient for a fresh agent to continue;
- the same ambiguity appears across more than one project/task;
- a single failure has high enough impact to justify a protocol change.

## Four questions

For each candidate, answer:

1. **Local or reusable?** Is this specific to one project, or a general workflow problem?
2. **Where did it fail?** Requirement / PRD / Technical Design / Test / Coding / CR / Handoff / Human Output / Freeze.
3. **What was missing or excessive?** A missing authority rule, bad scope, weak prompt field, excessive ceremony, unclear output, etc.
4. **What is the smallest reusable correction?** Prefer changing one template or protocol rule rather than adding a new subsystem.

## Promotion rule

Promote a lesson into the base methodology only when:

- it repeats; or
- it is high-impact; and
- the correction is broadly reusable; and
- the correction does not add more complexity than the problem justifies.

Otherwise keep it project-local.

## When to update templates

Template changes happen **between** active execution loops, not opportunistically inside a downstream stage to make the current task easier.

Typical targets:

- a stage prompt under `prompts/`;
- `docs/protocols/execution-contract.md`;
- `docs/workflow/freeze-gates.md`;
- `docs/task-packets/task-packet.md`;
- engineering standards where the lesson is truly language/framework independent.

## Output

A learning note can be as small as:

```text
Observed failure:
Coding changed a frozen test after an implementation failure.

Layer:
Coding / Test Freeze.

Root cause:
The prompt said tests were frozen but did not define the stop/escalation behavior strongly enough.

Reusable correction:
Add explicit FREEZE_BREAK_REQUIRED behavior and test-path write prohibition to Coding Role Contract.

Evidence:
<task / commit / project>
```

The objective is not to collect process paperwork. It is to make future inputs clearer and reduce the cost per correct change.
