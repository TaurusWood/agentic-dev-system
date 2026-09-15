# Usage Guide (English)

> Agentic Development System is currently a **software-development protocol that can be executed either manually across multiple chats or by runtimes with sub-agents**. It is a methodology first; no CLI, scheduler, or multi-agent platform is required to use it.

Chinese version: [`usage.zh-CN.md`](usage.zh-CN.md)

## 1. Where to use it

The workflow is suitable for:

- new features or version iterations;
- UI / UX / interaction changes;
- bug fixes and manual E2E findings;
- refactors and technical debt;
- non-trivial changes that benefit from multiple staged agents/chats.

Not every small change needs the full lifecycle. Smaller tasks may use a lighter path, but once Test / Coding / CR are separated, their Role, Freeze, and output contracts should still be respected.

## 2. Core rules

1. **Code and versioned repository documents are authoritative.** Chat history is not.
2. **PRD defines WHAT; Technical Design defines HOW.**
3. **Frozen upstream artifacts are read-only downstream.** If they are wrong, raise a Freeze Break Request.
4. **After TEST FREEZE, Coding must not weaken tests simply to regain green status.**
5. **Execute vertically by technical slice.** Prefer `Test → Coding → CR` per module over writing all tests first and all code later.
6. **Human review is reserved for judgment.** Human Brief is the default; Human Discussion is used only when a real trade-off exists.
7. **Prompts are execution interfaces, not truth.** They reference repository truth rather than restating another copy of it.

## 3. Two execution modes

### 3.1 Manual multi-chat

This is the lowest-dependency mode and the recommended baseline while validating the methodology.

```text
PRD / Product Discussion Chat
        ↓
Technical Design Chat
        ↓
Module A: Test Chat → Coding Chat → CR Chat
Module B: Test Chat → Coding Chat → CR Chat
        ↓
Integration / Top-level Coding Chat
        ↓
Final CR Chat
```

Each new chat is started with the relevant stage prompt and reads repository facts directly.

### 3.2 Sub-agent / multi-thread execution

If Codex, Grok, Antigravity, or another runtime supports sub-agents, a coordinator may dispatch the same tasks automatically.

**Automation is only an execution form.** It must not alter the semantics of PRD, Technical Design, Freeze, Role Contract, tests, or handoffs.

## 4. Multiple entry paths

Development does not always begin with a full greenfield requirement.

### Entry A: feature / version iteration

```text
Natural-language discussion
→ PRD
→ PRODUCT FREEZE
→ Technical Design + Module Slicing
→ DESIGN FREEZE
→ Per-module Test → TEST FREEZE → Coding → CR
→ Integration
→ Final CR
→ focused human acceptance
```

### Entry B: bug fix / manual E2E finding

First determine whether the issue is only an implementation defect or whether it reveals a bad upstream contract.

- **Implementation clearly violates a frozen contract**: go directly to module Test/Coding/CR.
- **Existing PRD/GDD conflicts with intended behavior**: repair product truth first, then re-freeze.
- **Module boundary or technical design is wrong**: return to Technical Design.

Do not assume that something called a “bug” is necessarily a code-only change.

### Entry C: technical refactor

If user-visible behavior is unchanged, the PRD can be lightweight, but explicitly freeze:

- the behavior that must remain unchanged;
- the technical objective;
- module boundaries;
- regression expectations.

Then continue with Technical Design → Test → Coding → CR.

## 5. Where natural-language Discussion is appropriate

Use open-ended natural-language discussion where uncertainty is genuinely high:

- product requirements / PRD;
- UX / UI / player journey;
- bug description, reproduction, and root-cause exploration;
- technical solution and architecture trade-offs;
- Freeze Break decisions.

The goal of Discussion is to **remove uncertainty and write the result back into repository artifacts**.

Once the goal is stable, recurring execution steps should move to standardized prompts:

- Test;
- Coding;
- Module CR;
- Integration;
- Final CR;
- any other repeated stage with stable responsibility.

Rule of thumb:

> **Explore with Discussion; execute with standardized prompts.**

## 6. Prompt Generator: how it works today

The **Prompt Generator is not an automation tool**.

It is a prompt-composition process:

```text
your current intent
+ the relevant stage template
+ current project truth (docs / code / branch / freezes)
        ↓
a high-quality task-specific execution prompt
```

Use [`../../prompts/prompt-generator.md`](../../prompts/prompt-generator.md) to start a chat that composes the next execution prompt.

### Example input

```text
Project: TaurusWood/pocket-railway
Branch: fix/m1-interaction-audit
Stage: Test
Module: BUILD-01
Product truth: docs/.../prd.md @ <PRODUCT_FREEZE>
Technical truth: docs/.../technical-design.md#BUILD-01 @ <DESIGN_FREEZE>
Intent: create the test contract for Build mode: click city A → click city B → route comparison
```

The Prompt Generator should return a prompt that can be pasted directly into a fresh Test Chat.

### Next-step prompt

When an agent completes a stage and the next stage is already well-defined, its response may include:

- Human Brief;
- Agent Handoff;
- an **optional suggested next-stage prompt**.

That next prompt is still only an execution interface. Repository artifacts remain authoritative.

## 7. Minimum stage-prompt structure

An execution prompt should make these unambiguous:

- Role / what this stage owns;
- Goal / the one bounded outcome;
- Authority / authoritative docs and code;
- Read set / what must be inspected first;
- Write scope / what may be changed;
- Forbidden scope / what may not be changed;
- Dependencies / prerequisites;
- Validation / proof of completion;
- Stop conditions / when to stop rather than guess;
- Output / what to return to humans and downstream agents.

Do not substitute large background prose for these fields.

## 8. Freeze usage

### PRODUCT FREEZE

Confirms user-observable behavior, non-goals, and product boundaries.

### DESIGN FREEZE

Confirms technical modules, public contracts, terminology, dependencies, and task slicing.

### TEST FREEZE

Confirms that tests correctly represent product and technical contracts.

### Freeze Break Request

If a downstream stage finds a frozen artifact wrong, it must not silently edit it. Return:

```text
FREEZE_BREAK_REQUIRED
Frozen artifact: ...
Observed conflict: ...
Why current stage cannot proceed safely: ...
Suggested owning stage: Product / Design / Test
Impact if changed: ...
```

Resume only after the owning stage reviews the change and establishes a new freeze.

## 9. Output contract

See [`../protocols/execution-contract.md`](../protocols/execution-contract.md).

### Human Brief (default)

The shortest useful output for a human:

- conclusion;
- capability / boundary;
- impact / risk;
- decisions required;
- next step.

If no human decision is needed, avoid dumping routine technical detail.

### Human Discussion

Expand only when:

- materially different options exist;
- product / UX / architecture needs human judgment;
- a Freeze Break is required;
- the user explicitly asks for deeper analysis.

### Agent Handoff

Structured downstream information:

- task ID / status;
- authoritative paths + revisions;
- scope;
- validation;
- blockers;
- next stage.

Do not replace repository truth with a long summary of the previous chat.

## 10. Lightweight learning loop

The methodology should improve from real projects, but it should not auto-modify itself during active work.

When meaningful rework or drift occurs, ask:

1. Is this project-specific, or a reusable workflow problem?
2. Which layer failed: requirement, Technical Design, Test, Coding, CR, Handoff, or Human Output?
3. What constraint was missing, or what existing rule created unnecessary burden?
4. Would a template change prevent the same class of failure without making the system heavier?

Only recurring or high-impact findings should be promoted into the base templates.

See [`../workflow/learning-loop.md`](../workflow/learning-loop.md).

## 11. Example: continuing the seven pocket-railway E2E issues

The issues have already been discovered and roughly classified. Do not jump directly into Coding, and do not give all seven issues to one implementation agent.

### Step 1: create the remediation PRD

Open a Product / PRD Discussion Chat with:

- the seven findings;
- current root-cause analysis;
- current GDD and actual code;
- the execution rule: fix vertically by slice and prevent scope expansion.

The output should be one lightweight iteration PRD, for example:

```text
M1 Interaction E2E Remediation

Goal:
Restore consistency between Build/Operate interaction, player intuition, and approved product direction.

Known slices:
- BUILD-01 city-to-city construction planning entry
- OPS-01 Build → service-line editing handoff
- RAIL-01 rail upgrade selection semantics
- ROUTE-01 candidate route naming
- ROUTE-02 candidate/final-confirmation information architecture
- COPY-01 player-facing railway terminology

Execution rule:
Close one slice at a time. Newly discovered issues go to backlog unless they block correctness.
```

Each slice only needs a short Behavior Card for human approval.

### Step 2: PRODUCT FREEZE

Human review should focus on:

- what the player clicks;
- what the system shows;
- what happens next;
- what must not happen;
- what existing behavior must remain intact.

The human should not need to review StateOwner, EventBus, or test implementation details.

### Step 3: Technical Design

Open a fresh Technical Design Chat that reads the PRODUCT FREEZE and real code.

It should:

- validate the six technical slices;
- identify owner/public contract for each slice;
- declare cross-module dependencies;
- produce independently executable technical tasks;
- avoid reopening product behavior.

Then establish DESIGN FREEZE.

### Step 4: execute only the first slice

Recommended first slice: **BUILD-01 — direct city A → city B planning in Build mode**, because it is foundational to the main construction path.

```text
BUILD-01 Test Chat
→ Test CR / TEST FREEZE
→ BUILD-01 Coding Chat
→ BUILD-01 Module CR
→ manual E2E click-through
→ CLOSE BUILD-01
```

Only then move to the next slice.

### Step 5: Integration / Final CR after all slices

Finally validate:

- full player journeys;
- terminology;
- cross-slice state transitions;
- regression;
- whether one fix broke another slice.

## 12. Minimal daily checklist

Before starting an important task:

```text
1. Identify the entry: feature / bug / refactor.
2. Use Discussion to remove uncertainty and write decisions back to the repository.
3. Freeze the current upstream truth.
4. Combine the relevant base template with current intent and project facts to generate the task prompt.
5. Start a fresh chat/sub-agent for one stage or module only.
6. Read Human Brief by default; open Discussion only when judgment is required.
7. Let downstream agents continue from repository truth + Agent Handoff, not long chat summaries.
8. Update base templates only when real workflow failures justify it.
```

If these eight steps work reliably, the methodology is already useful. No multi-agent platform is required first.
