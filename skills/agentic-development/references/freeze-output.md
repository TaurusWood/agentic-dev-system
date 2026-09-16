# Freeze and Output Contract

This file is the canonical runtime source for freeze establishment, freeze integrity, freeze breaks, and output profiles.

## Freeze levels

### PRODUCT FREEZE
Approved user/player-visible behavior, scope, and product boundaries are read-only for downstream stages.

### DESIGN FREEZE
Approved Technical Design, module boundaries, public contracts, terminology, and task slicing are read-only for Test/Coding unless reopened.

### TEST FREEZE
Accepted test contract is read-only for Coding.

Freeze means downstream read-only by default, not immutable forever.

## Establishing a freeze

A freeze is established only when all of the following are true:

1. the owning stage's required review/approval is complete;
2. the frozen artifact is present in a committed Git revision;
3. the frozen paths and revision are recorded in the task packet or Agent Handoff;
4. any stage-specific evidence required for the freeze is recorded.

A phrase such as `ready to freeze`, `proposed freeze`, or an uncommitted working-tree state is not an established freeze.

For TEST FREEZE on a new behavior or bug regression, stage-specific evidence normally includes baseline sensitivity:

```yaml
test_evidence:
  baseline_revision: <sha>
  baseline_result: RED # RED | GREEN | NOT_APPLICABLE
  expected_failure:
    - <semantic reason the old/broken baseline fails>
  justification_if_green: <required when baseline_result is GREEN>
```

The objective is not ceremonial RED. It is evidence that the test contract can distinguish the target behavior from the declared baseline when such a distinction should exist.

## Downstream freeze-integrity preflight

Before a downstream stage writes, it must verify every consumed freeze against the current repository state.

Conceptually:

```text
git diff <product-freeze-sha> -- <product paths>
git diff <design-freeze-sha>  -- <design paths>
git diff <test-freeze-sha>    -- <test paths>
```

Expected result for frozen paths is no unauthorized semantic change. Also verify that declared task dependencies and `base_revision` still identify the intended execution baseline.

If the preflight finds a legitimate newer re-freeze, refresh the task packet/handoff before work. If it finds an unauthorized or unexplained change, stop; do not silently choose the current file or the old revision.

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

The owning upstream stage reviews the issue, updates its artifact if approved, establishes a new freeze, updates affected task packets, then downstream work resumes.

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
repository: <owner/name>
branch: <branch>
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
freeze_integrity:
  result: <PASS|FAIL|NOT_RUN>
  checked_at_revision: <sha-or-null>
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
2. canonical stage/freeze contract;
3. project-local `AGENTS.md` refinement that does not contradict the canonical contract;
4. launch-prompt formatting preferences;
5. skill default.

Skill default:

- human-facing -> Human Brief;
- downstream continuation -> Agent Handoff;
- Human Discussion only when materially needed.

## Cognitive-load rule

When direction is already approved and ordinary software/UX conventions are sufficient, resolve routine details within the frozen contract and report them briefly. Escalate only details that materially change behavior, scope, risk, architecture, cost, or acceptance.
