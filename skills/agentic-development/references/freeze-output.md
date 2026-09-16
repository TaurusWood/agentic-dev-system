# Freeze and Output Contract

## Freeze levels

### PRODUCT FREEZE
Approved user/player-visible behavior, scope, and product boundaries are read-only for downstream stages.

### DESIGN FREEZE
Approved Technical Design, module boundaries, public contracts, terminology, and task slicing are read-only for Test/Coding unless reopened.

### TEST FREEZE
Accepted test contract is read-only for Coding.

Freeze means downstream read-only by default, not immutable forever.

## Freeze Break Request

When a downstream stage finds a frozen artifact invalid, contradictory, stale, or unsafe to implement, stop the affected task and return:

```text
FREEZE_BREAK_REQUIRED
Artifact:
Frozen revision:
Observed conflict:
Why this stage cannot safely continue:
Proposed owning stage: Product / Design / Test
Proposed change:
User-visible behavior changed: YES / NO
Affected modules/tests:
```

The owning upstream stage reviews the issue, updates its artifact if approved, establishes a new freeze, then downstream work resumes.

Do not let Coding decide that a failing frozen test is wrong and edit it directly.

## Human Brief — default human output

Return only what is needed for human judgment:

- **Conclusion** — done/pass/fail/blocked/main decision.
- **Capability / boundary** — what was completed and what was not.
- **Impact / risk** — material consequences only.
- **Human decision required** — unresolved decisions only; otherwise `None`.
- **Next step** — next stage/action.

Avoid routine implementation detail when it does not affect a human decision.

## Human Discussion

Use when:

- user explicitly asks for deeper analysis;
- materially different options exist;
- product/UX/architecture/risk trade-offs require human judgment;
- Freeze Break approval is needed;
- evidence is insufficient for a safe single conclusion.

Discussion may be detailed, but separate decisions from background.

## Agent Handoff

When another stage/chat/agent must continue, prefer structured metadata:

```yaml
task_id: <id>
status: <status>
base_revision: <sha>
result_revision: <sha>
authoritative_inputs:
  product: <path/revision>
  design: <path/revision>
  tests: <path/revision>
freeze_revisions:
  product: <sha-or-null>
  design: <sha-or-null>
  test: <sha-or-null>
scope:
  allowed: []
  forbidden: []
validation:
  commands: []
  result: <PASS|FAIL|NOT_RUN>
blockers: []
next_stage: <stage>
```

Do not copy large upstream documents into the handoff. Point to repository paths/revisions.

## Output precedence

1. explicit user/task request;
2. current stage prompt;
3. project-local `AGENTS.md` refinement;
4. skill default.

Skill default:

- human-facing -> Human Brief;
- downstream continuation -> Agent Handoff;
- Human Discussion only when materially needed.

## Cognitive-load rule

When direction is already approved and ordinary software/UX conventions are sufficient, resolve routine details within the frozen contract and report them briefly. Escalate only details that materially change behavior, scope, risk, architecture, cost, or acceptance.
