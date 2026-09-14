# Prompt Generation

## 1. Position

Prompts are execution interfaces, not sources of truth.

A prompt should be generated from the current repository state, the task packet, the active development stage, and stable role rules.

Do not manually restate the whole PRD or Technical Design inside every prompt. Duplication creates a second truth surface that can drift.

## 2. Two-layer prompt model

### Stable role template
Defines behavior that should remain consistent across projects:

- role
- authority
- required reading order
- write permissions
- forbidden actions
- validation expectations
- stop conditions
- escalation protocol
- completion report format

Examples: Test Agent, Coding Agent, Module Reviewer, Integration Agent, Final Reviewer.

### Dynamic task payload
Generated for one concrete task:

- repository and branch
- task ID
- current phase
- authoritative artifact paths and revisions
- module dependencies
- allowed write scope
- forbidden scope
- required validation commands
- known RED/GREEN state
- expected output

## 3. Prompt compiler concept

Future tooling should support a flow like:

```text
repository state
+ task packet
+ phase
+ role template
      ↓
prompt compiler
      ↓
execution prompt
```

Potential interface:

```text
generate-prompt BUILD-04 --phase test
generate-prompt BUILD-04 --phase implementation
generate-prompt BUILD-04 --phase review
```

The generated prompt is an execution artifact. The durable inputs are the versioned templates, task metadata, and repository artifacts.

## 4. Required prompt sections

Every execution prompt should contain, explicitly or by generated reference:

1. **Role** — what this agent is responsible for.
2. **Goal** — the single bounded outcome for this run.
3. **Authority** — which artifacts are authoritative.
4. **Read set** — files/revisions that must be inspected before action.
5. **Write scope** — files/directories the agent may modify.
6. **Forbidden scope** — especially frozen upstream artifacts.
7. **Dependencies** — prerequisite tasks/revisions.
8. **Validation** — commands/checks required before completion.
9. **Stop conditions** — when the agent must not improvise.
10. **Escalation** — Freeze Break / dependency / ambiguity report format.
11. **Done contract** — what evidence must be returned.

## 5. Context minimization

Do not send every project document to every agent.

The prompt generator should provide the smallest sufficient context and direct the agent to inspect first-hand repository sources when needed.

Good handoff:

```text
Task: BUILD-04
Product: docs/releases/m1/prd.md @ abc123
Design: docs/releases/m1/technical-design.md#BUILD-04 @ def456
Tests: frozen @ ghi789
Write scope: scenes/map/**, scenes/ui/coordinators/**
Forbidden: docs/**, tests/**
Validation: ./scripts/run_tests.mjs build_planning
```

Bad handoff:

> Here is a long summary of what the previous agent thinks all those files mean...

## 6. Prompt quality criterion

A high-quality prompt is not the longest prompt. It should make these questions unambiguous:

- What am I trying to change?
- What am I not allowed to reinterpret?
- Where do I get authoritative facts?
- What files may I touch?
- How do I prove completion?
- When must I stop instead of guessing?
