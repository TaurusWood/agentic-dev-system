# Prompt Generation

## 1. Position

Prompts are execution interfaces, not sources of truth.

This project uses **Prompt Generation** to mean a repeatable composition practice, not necessarily software automation:

```text
current intent
+ selected stage template
+ repository truth
+ current task/freeze context
        ↓
execution-ready prompt
```

A human may perform this manually, an agent may compose it through [`../../prompts/prompt-generator.md`](../../prompts/prompt-generator.md), and tooling may automate parts of it later. The semantics are the same.

Do not restate the whole PRD or Technical Design inside every prompt. Duplication creates another truth surface that can drift.

## 2. Role Contract, not role-play

Each stage has a stable **Role Contract** whose purpose is to constrain authority, not simulate seniority or persona.

It defines:

- responsibility — what outcome this stage owns;
- authority — what it may decide/change;
- upstream constraints — what is read-only truth;
- forbidden actions;
- stop conditions;
- escalation path;
- completion evidence.

Avoid low-signal role-play such as “you are a world-class engineer with 20 years of experience.”

## 3. Two layers

### Stable stage template

Versioned under `prompts/` and refined through real use. It contains:

- Role Contract;
- required reading behavior;
- write/forbidden scope rules;
- validation expectations;
- stop/escalation behavior;
- output contract.

Examples: PRD, Technical Design, Test, Coding, Module Review, Integration, Final Review.

### Task-specific composition

Adds only what changes for the current project/task:

- repository / branch / baseline;
- task or module ID;
- user's current intent;
- authoritative artifact paths and freeze revisions;
- dependencies;
- allowed/forbidden scope;
- validation commands;
- known RED/GREEN state;
- requested output profile.

The result is a **task-specific Prompt**, not a new specification.

## 4. Discussion vs standardized execution

Not every stage should be forced into rigid prompt-shaped interaction.

Use natural-language **Discussion** when uncertainty is still being removed, especially for:

- PRD / product intent;
- UX / UE / player journeys;
- bug description, reproduction, and root-cause exploration;
- technical/architecture trade-offs;
- Freeze Break decisions.

Once the intended outcome is stable, convert recurring execution work into standardized prompts, especially:

- Test;
- Coding;
- Module CR;
- Integration;
- Final CR;
- another high-frequency action with stable responsibility.

Rule of thumb:

> **Explore with Discussion; execute with standardized prompts.**

The PRD and Technical Design stages may themselves use prompt templates, but the conversation inside them may remain exploratory until the artifact is ready to freeze.

## 5. Current operating mode

No prompt compiler is required.

A valid workflow today is:

1. discuss until the current intent is sufficiently stable;
2. select the relevant base template under `prompts/`;
3. combine it with current intent and project facts;
4. optionally use `prompts/prompt-generator.md` to compose the final prompt;
5. open a fresh chat/sub-agent with that prompt;
6. let the execution agent inspect repository truth directly;
7. return Human Brief + Agent Handoff as appropriate.

An agent that has just completed a stage may also propose the next-stage prompt when all required facts are already known. That is a convenience, not a transfer of authority.

## 6. Prompt Generator vs future automation

The current **Prompt Generator** is primarily a method/meta-prompt for producing task-specific prompts from stable templates and project context.

Future tooling may automate this composition, but automation is optional. The methodology should remain usable if the user simply copies the generated prompt into a new chat.

Any future implementation might consume:

```text
repository state
+ task packet
+ selected stage template
+ freeze revisions
+ requested role/output
        ↓
prompt composition
        ↓
execution prompt
```

The generated prompt remains ephemeral. Durable truth stays in the repository.

## 7. Input normalization / Transform

A separate Transform layer is **not part of the required workflow today**.

Good prompt composition already resolves much of the practical problem by forcing the current intent to be grounded against repository facts and explicit stage fields.

If real usage later shows recurring ambiguity from pronouns, omitted referents, relative instructions, or multiple external entry points, a pre-execution Transform/Normalize step may be explored.

If introduced, it must:

- run before the main execution context is assembled;
- normalize only what can be grounded in conversation/repository evidence;
- surface unresolved ambiguity rather than invent decisions;
- preserve explicit constraints and named entities;
- avoid injecting its reasoning trace into the execution agent;
- never become a second source of truth.

Treat Transform as a deferred option, not a baseline requirement.

## 8. Required execution-prompt fields

A high-quality execution prompt should make these unambiguous:

1. **Role Contract** — what this stage owns and may change.
2. **Goal** — one bounded outcome.
3. **Authority** — authoritative artifacts/revisions.
4. **Read set** — what must be inspected first.
5. **Write scope** — what may be modified.
6. **Forbidden scope** — especially frozen upstream artifacts.
7. **Dependencies** — prerequisites/blockers.
8. **Validation** — proof required before completion.
9. **Stop conditions** — when not to improvise.
10. **Escalation** — Freeze Break / dependency / ambiguity handling.
11. **Output profile** — Human Brief, Human Discussion, Agent Handoff, or a combination.
12. **Done contract** — evidence that closes the task.

## 9. Context minimization

Do not send every project document to every agent.

Provide the smallest routing context that tells the agent where authoritative facts live, then let it inspect those sources directly.

Good:

```text
Task: BUILD-04
Product: docs/releases/m1/prd.md @ abc123
Design: docs/releases/m1/technical-design.md#BUILD-04 @ def456
Tests: frozen @ ghi789
Write scope: scenes/map/**, scenes/ui/coordinators/**
Forbidden: docs/**, tests/**
Validation: ./scripts/run_tests.mjs build_planning
Output: human_brief + agent_handoff
```

Bad:

> Here is a long summary of what the previous agent thinks all those files mean...

## 10. Lightweight template learning

Stage templates are expected to improve through use.

Do not rewrite them after every task. When a real workflow failure is repeated or high-impact, use the lightweight learning loop in [`../workflow/learning-loop.md`](../workflow/learning-loop.md) to decide whether the base template should change.

Examples:

- agents repeatedly miss the same required input;
- coding agents overreach because authority is unclear;
- Test prompts overfit to implementation;
- humans consistently receive too much detail;
- handoffs lack information required by fresh agents.

The objective is a small set of increasingly reliable templates, not an ever-growing rulebook.

## 11. Prompt quality criterion

A high-quality prompt is not the longest prompt. A fresh agent should be able to answer without guessing:

- What am I trying to change?
- What am I not allowed to reinterpret?
- Where do authoritative facts live?
- What may I modify?
- How do I prove completion?
- When must I stop?
- Who consumes my output?
