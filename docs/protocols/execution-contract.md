# Execution Contract — Contributor Explanation

> **Normative runtime source:** `skills/agentic-development/references/`. This document explains the model for contributors; it must not become a second runtime contract.

## 1. Role Contract model

Every stage uses the canonical six-part authority model:

1. **Owns** — result this stage is responsible for.
2. **May change** — artifacts/code it may modify.
3. **Must preserve** — upstream truth that is read-only.
4. **Must not do** — prohibited reinterpretation or scope expansion.
5. **Must stop when** — conditions requiring escalation.
6. **Done when** — evidence required to close the stage.

Concrete stage semantics live only in [`../../skills/agentic-development/references/stage-contracts.md`](../../skills/agentic-development/references/stage-contracts.md).

## 2. Output profiles

Concrete output and freeze semantics live in [`../../skills/agentic-development/references/freeze-output.md`](../../skills/agentic-development/references/freeze-output.md).

The three consumer projections are:

- **Human Brief** — default status/decision surface;
- **Human Discussion** — only when material judgment or unresolved evidence requires it;
- **Agent Handoff** — structured execution metadata for the next stage/chat/agent.

One factual stage result may be projected for different consumers, but those projections must not become independent narratives.

## 3. Handoff principle

Handoffs point to repository truth rather than copying it. Relevant execution metadata includes:

- task ID / status;
- repository / branch / base and result revisions;
- authoritative Product/Design/Test paths and revisions;
- freeze revisions and freeze-integrity result;
- allowed/forbidden scope;
- validation;
- blockers;
- next stage.

## 4. Precedence

For runtime semantics:

1. canonical Skill reference contract;
2. explicit frozen project/task contract within the authority allowed by that stage;
3. project-local instructions that refine but do not silently contradict frozen semantics;
4. launch-prompt formatting/task-specific additions.

A copied prompt cannot override the canonical stage authority merely because it contains older text.

## 5. Cognitive-load rule

Human attention is reserved for decisions that materially change behavior, scope, risk, architecture, cost, acceptance, or a freeze. Routine implementation detail belongs in repository evidence and Agent Handoff, not in the default human summary.
