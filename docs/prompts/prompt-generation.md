# Prompt Generation

## 1. Position

Prompts are execution interfaces, not sources of truth.

A stage prompt should be composed from the current repository state, the active task/module, the stage Role Contract, and any frozen revisions that matter to that stage.

Do not restate the whole PRD or Technical Design inside every prompt. Duplication creates a second truth surface that can drift.

## 2. Role Contract, not role-play

Each stage should have a stable **Role Contract**. Its purpose is to constrain authority, not to simulate seniority or persona.

A Role Contract defines:

- responsibility — what outcome this stage owns;
- authority — what this stage may decide or change;
- upstream constraints — what must be treated as read-only truth;
- forbidden actions — what this stage must not do;
- stop conditions — when it must stop instead of guessing;
- escalation path — Freeze Break / dependency / ambiguity handling;
- completion evidence — what proves the stage is done.

Avoid low-signal role-play such as “you are a world-class engineer with 20 years of experience.”

## 3. Two-layer prompt model

### Stable stage template

Defines cross-project execution rules:

- Role Contract
- required reading order
- write permissions
- forbidden actions
- validation expectations
- stop/escalation behavior
- output contract

Examples: PRD, Technical Design, Test, Coding, Module Review, Integration, Final Review.

### Dynamic task payload

Provides concrete context for one execution:

- repository / branch
- task or module ID
- active stage
- authoritative artifact paths and revisions
- dependencies
- allowed write scope
- forbidden scope
- required validation commands
- known RED/GREEN state
- requested output projection

A human can assemble this payload manually. Future tooling may generate it automatically.

## 4. Current operating mode

The current methodology does **not** require a prompt compiler.

A valid workflow today is:

1. open the relevant stage template;
2. supply repository/task-specific values;
3. start a new chat or sub-agent;
4. let the agent inspect authoritative repository artifacts directly;
5. return the result using the execution/output contract.

This manual path is the baseline against which future automation should be judged.

## 5. Optional future prompt compilation

If repeated real-project use proves useful, tooling may later compose prompts from:

```text
repository state
+ task packet
+ stage Role Contract
+ active freeze revisions
      ↓
prompt generation
      ↓
execution prompt
```

The generated prompt remains ephemeral. The durable inputs are the repository artifacts, task metadata, and versioned stage templates.

## 6. Input normalization / Transform

Natural-language requests often contain pronouns, omitted referents, relative phrases, and assumed context. A future optional **Transform / Normalize** step may convert this into a clearer task representation before the execution agent starts.

It is intentionally **not part of the required baseline today**.

If introduced later, it must obey these rules:

- run before the main execution context is assembled;
- resolve only what can be grounded in current conversation/repository evidence;
- surface unresolved ambiguity instead of inventing product decisions;
- preserve explicit constraints and named entities;
- avoid sending the transformer's internal reasoning into the execution context;
- prefer passing only the normalized result plus necessary original evidence;
- never become a new source of truth independent of approved repository artifacts.

The purpose is to improve intent fidelity, not to add another reasoning layer to every task.

## 7. Required execution-prompt fields

Every stage prompt should make these questions unambiguous:

1. **Role Contract** — what this stage owns and may change.
2. **Goal** — the bounded outcome for this run.
3. **Authority** — which artifacts are authoritative.
4. **Read set** — what must be inspected before action.
5. **Write scope** — what may be modified.
6. **Forbidden scope** — especially frozen upstream artifacts.
7. **Dependencies** — prerequisites or known blockers.
8. **Validation** — checks required before completion.
9. **Stop conditions** — when the agent must not improvise.
10. **Escalation** — Freeze Break / dependency / ambiguity protocol.
11. **Output profile** — Human Brief, Human Discussion, Agent Handoff, or the required combination.
12. **Done contract** — evidence that closes the task.

## 8. Context minimization

Do not send every project document to every agent.

Provide the smallest sufficient routing context and direct the agent to inspect first-hand repository sources.

Good handoff:

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

Bad handoff:

> Here is a long summary of what the previous agent thinks all those files mean...

## 9. Prompt quality criterion

A high-quality prompt is not the longest prompt. It should make these questions clear without requiring the agent to guess:

- What am I trying to change?
- What am I not allowed to reinterpret?
- Where do I get authoritative facts?
- What files may I touch?
- How do I prove completion?
- When must I stop instead of guessing?
- Who is consuming my output?
