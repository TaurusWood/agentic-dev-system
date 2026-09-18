# Prompt Composition

This file is the canonical runtime source for composing execution prompts.

## Purpose

Generate a high-quality stage prompt from current intent and repository truth without creating a parallel source of truth.

Prompt generation is a composition practice. It may be done manually or by an agent.

## Inputs

Use only the minimum necessary inputs:

- current user intent / task goal;
- target stage;
- repository identity, branch/worktree, and declared `base_revision` when relevant;
- project-local instructions (`AGENTS.md` or equivalent);
- authoritative product/design/test artifacts and freeze revisions relevant to the stage;
- current code/tests needed to locate the task;
- task packet, declared scope, dependencies, validation commands, and test evidence when known.

Do not paste the whole project history into the prompt.

## Composition structure

A good execution prompt should make these fields explicit:

```text
ROLE / STAGE
GOAL
REPOSITORY / BASE REVISION
AUTHORITATIVE INPUTS
REQUIRED READING
WRITE SCOPE
FORBIDDEN SCOPE
DEPENDENCIES
FREEZE PREFLIGHT
VALIDATION
STOP CONDITIONS
OUTPUT PROFILE
DONE CONTRACT
```

## Role

Use the matching canonical contract from `stage-contracts.md`.

Do not copy and independently rewrite that Role Contract inside a launch prompt. A prompt may highlight task-specific consequences of the canonical contract, but authority semantics remain owned by `stage-contracts.md`.

## Repository truth

Point the agent to repository paths/revisions and require first-hand inspection.

Prefer:

```text
Repository: owner/name
Branch/worktree: <branch>
Base revision: <sha>
Product: docs/.../prd.md @ <sha>
Design: docs/.../technical-design.md#TASK-X @ <sha>
Tests: tests/... @ <sha>
```

Avoid large prose summaries that duplicate those artifacts.

## Freeze preflight

When a stage consumes one or more freezes, the execution prompt must require the preflight defined in `freeze-output.md` before any writes. Do not treat freeze revision fields as descriptive metadata only.

## Standard prompt skeleton

```text
Use the `agentic-development` skill to execute the <STAGE> stage for <TASK_ID> in <REPOSITORY>.

Goal:
<bounded outcome>

Repository / baseline:
- branch/worktree: <...>
- base_revision: <...>

Authority:
- use the canonical stage contract from the installed skill
- <authoritative paths/revisions>
- project-local instructions are authoritative only within their scope and may not silently override frozen semantics

Read first:
- <minimal read set>

Write scope:
- <allowed paths/artifacts>

Forbidden scope:
- <out-of-scope paths>

Dependencies:
- <required prior tasks/revisions>

Before writing:
- verify consumed freeze revisions/paths and the declared execution baseline

Required work:
- <task-specific actions not already defined by the canonical stage contract>

Validation:
- <commands/checks>

Stop instead of guessing when:
- a canonical stage stop condition is met
- a frozen upstream artifact must change
- scope must cross an undeclared module boundary
- the task packet/base revision is stale in a correctness-relevant way

Output:
- Human Brief
- Agent Handoff when another stage must continue

Done when:
- canonical stage done conditions plus <task-specific evidence>
```

## Discussion vs standardized prompt

Use natural-language Discussion when uncertainty is the work itself:

- PRD/product intent;
- UE/UX/player journey;
- bug reproduction and root-cause classification;
- architecture/technical trade-offs;
- Freeze Break decisions.

Once intent and stage are stable, use standardized prompts for repeated execution work such as Test, Coding, CR, Integration, and Final CR.

Rule of thumb:

> Explore with Discussion; execute with standardized prompts.

## Delegated continuation

When the runtime can create the isolated execution context required by `workflow.md`, a standardized execution prompt is primarily a delegation payload, not a mandatory human handoff. The coordinator should launch the next eligible bounded stage automatically unless a canonical stop condition requires human judgment.

Prompt composition does not decide whether tasks may be batched, parallelized, or reviewed in the same context; those execution semantics come from `workflow.md`.

## Next-stage prompt fallback

If the runtime cannot safely delegate the next stage, the current stage may output a ready-to-paste next-stage prompt after its Human Brief and Agent Handoff.

Generate it from the **new repository state**, latest task packet, and latest established freezes. Do not blindly reuse a prompt drafted before the current stage completed. Do not stop merely to surface a prompt when runtime-native delegation can continue safely.

## Ambiguity

Do not silently invent product decisions while composing a prompt.

If an ambiguity is material and cannot be resolved from repository truth/current intent:

- surface it in Human Discussion if human judgment is needed; or
- encode it as a stop condition for the execution agent.

Do not add a separate Transform step by default. Prompt composition itself should remove ordinary ambiguity when it can be grounded safely.
