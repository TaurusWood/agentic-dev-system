# Prompt Composition

## Purpose

Generate a high-quality stage prompt from current intent and repository truth without creating a parallel source of truth.

Prompt generation is a composition practice. It may be done manually or by an agent.

## Inputs

Use only the minimum necessary inputs:

- current user intent / task goal;
- target stage;
- target repository and branch/worktree when relevant;
- project-local instructions (`AGENTS.md` or equivalent);
- authoritative product/design/test artifacts and freeze revisions relevant to the stage;
- current code/tests needed to locate the task;
- declared scope, dependencies, and validation commands when known.

Do not paste the whole project history into the prompt.

## Composition structure

A good execution prompt should make these fields explicit:

```text
ROLE / STAGE
GOAL
AUTHORITATIVE INPUTS
REQUIRED READING
WRITE SCOPE
FORBIDDEN SCOPE
DEPENDENCIES
VALIDATION
STOP CONDITIONS
OUTPUT PROFILE
DONE CONTRACT
```

## Role

Use the matching contract from `stage-contracts.md`.

Do not use generic persona padding. Authority matters more than seniority language.

## Repository truth

Point the agent to repository paths/revisions and require first-hand inspection.

Prefer:

```text
Product: docs/.../prd.md @ <sha>
Design: docs/.../technical-design.md#TASK-X @ <sha>
Tests: tests/... @ <sha>
```

Avoid large prose summaries that duplicate those artifacts.

## Standard prompt skeleton

```text
You are executing the <STAGE> stage for <TASK_ID> in <REPOSITORY>.

Goal:
<bounded outcome>

Authority:
- <authoritative paths/revisions>
- Project-local instructions are authoritative within their scope.

Read first:
- <minimal read set>

Write scope:
- <allowed paths/artifacts>

Forbidden:
- <frozen or out-of-scope artifacts>

Dependencies:
- <required prior tasks/revisions>

Required work:
- <stage-specific actions derived from the stage contract>

Validation:
- <commands/checks>

Stop instead of guessing when:
- <stage stop conditions>
- a frozen upstream artifact must change
- scope must cross an undeclared module boundary

Output:
- Human Brief
- Agent Handoff when another stage must continue

Done when:
- <evidence required by stage contract>
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

## Next-stage prompt

If the runtime cannot delegate the next stage, the current stage may output a ready-to-paste next-stage prompt after its Human Brief and Agent Handoff.

Generate it from the **new repository state** and latest freezes. Do not blindly reuse a prompt drafted before the current stage completed.

## Ambiguity

Do not silently invent product decisions while composing a prompt.

If an ambiguity is material and cannot be resolved from repository truth/current intent:

- surface it in Human Discussion if human judgment is needed; or
- encode it as a stop condition for the execution agent.

Do not add a separate Transform step by default. Prompt composition itself should remove ordinary ambiguity when it can be grounded safely.
