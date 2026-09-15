# Execution Contract

## 1. Purpose

This document defines the minimum execution contract shared by all stages. It keeps role boundaries and output semantics stable whether work is run manually in separate chats or through sub-agent orchestration.

## 2. Role Contract

Every stage prompt must define a Role Contract with six parts:

1. **Owns** — the result this stage is responsible for.
2. **May change** — artifacts or code this stage is allowed to modify.
3. **Must preserve** — upstream truth that is read-only.
4. **Must not do** — prohibited reinterpretation, scope expansion, or implementation shortcuts.
5. **Must stop when** — conditions that require escalation rather than guessing.
6. **Done when** — evidence required to close the stage.

Roles are authority boundaries, not personas. Descriptions such as “senior”, “expert”, or “world-class” are optional and should not substitute for explicit authority and stop conditions.

## 3. Output profiles

The development system defines three output profiles.

### Human Brief — default

Use for routine stage completion, status, and approval surfaces.

Required content:

- **Conclusion** — pass/fail/done/blocked or the main decision.
- **Capability / boundary** — what was actually completed and what was not.
- **Impact / risk** — only material consequences.
- **Human decision required** — list only unresolved decisions; otherwise say none.
- **Next step** — the next stage/action.

Avoid implementation detail unless it changes a human decision.

### Human Discussion

Use only when:

- the user explicitly asks for deeper reasoning;
- multiple materially different choices exist;
- a product/architecture/risk trade-off requires human judgment;
- a Freeze Break needs approval;
- the current evidence is insufficient for a safe single recommendation.

Discussion mode may include alternatives, evidence, trade-offs, and a recommendation. It should still separate required decisions from background detail.

### Agent Handoff

Use when another agent/chat/stage must continue the work.

Prefer structured fields over prose. At minimum include:

```yaml
task_id: BUILD-04
status: TEST_FROZEN
base_revision: abc123
result_revision: def456

authoritative_inputs:
  prd: docs/releases/m1/prd.md
  design: docs/releases/m1/technical-design.md
  tests: tests/build/**

freeze_revisions:
  product: ...
  design: ...
  test: ...

scope:
  allowed: []
  forbidden: []

validation:
  commands: []
  result: PASS

blockers: []
next_stage: implementation
```

Do not duplicate large upstream documents into the handoff. Point to paths/revisions instead.

## 4. Canonical result and projections

When practical, one stage should first form a single factual result, then project it for different consumers:

```text
stage result
   ├─ Human Brief
   ├─ Human Discussion (only when needed)
   └─ Agent Handoff
```

Do not independently invent three different narratives. All projections must describe the same underlying state.

## 5. Who selects the output profile

Precedence:

1. explicit user/task request;
2. stage/task prompt;
3. project-local `AGENTS.md` refinement;
4. this system default.

System default:

- human-facing communication: **Human Brief**;
- downstream-machine communication: **Agent Handoff**;
- **Human Discussion** only when triggered by a material decision or explicit request.

`agentic-dev-system` defines the common protocol. A project-local `AGENTS.md` may refine formatting or add project-specific fields, but should not silently invert the meaning of these profiles.

## 6. Cognitive-load rule

Human attention is a scarce resource.

When the direction is already approved and routine software/UX conventions are sufficient, agents should resolve ordinary details within frozen contracts and report them briefly. Escalate only details that materially change behavior, scope, risk, architecture, cost, or acceptance.

The goal is not shorter output at all costs. The goal is to expose the smallest amount of information needed for correct human judgment while preserving a precise handoff for downstream agents.
