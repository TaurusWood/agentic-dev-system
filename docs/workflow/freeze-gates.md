# Freeze Gates — Explanation

> **Normative freeze semantics:** [`../../skills/agentic-development/references/freeze-output.md`](../../skills/agentic-development/references/freeze-output.md). This document explains the intent for contributors.

## 1. Why freezes exist

A downstream agent must not be able to make an upstream requirement easier merely to make its own stage pass. Without a freeze boundary, code and tests can converge to green while drifting away from product intent.

## 2. Freeze levels

- **PRODUCT FREEZE** — approved observable behavior, scope, and product boundaries.
- **DESIGN FREEZE** — approved Technical Design, module boundaries, public contracts, terminology, and task slicing.
- **TEST FREEZE** — accepted test contract for a bounded task.

Freeze means downstream read-only by default, not immutable forever.

## 3. A freeze is a versioned fact

A freeze is established only after:

1. required owning-stage review/approval;
2. the artifact exists in a committed Git revision;
3. frozen paths + revision are recorded in the Task Packet/Handoff;
4. stage-specific evidence is present.

`ready to freeze`, `proposed freeze`, or an uncommitted working tree is not an established freeze.

## 4. TEST FREEZE sensitivity evidence

For a new behavior or bug regression expected to be absent/broken at the declared baseline, TEST FREEZE normally records:

```yaml
test_evidence:
  baseline_revision: abc123
  baseline_result: RED
  expected_failure:
    - target behavior is absent at baseline
```

If the relevant test is already green, record a justification rather than forcing an artificial failure. The purpose is to show that the test contract is discriminating where it should be.

## 5. Downstream preflight

Before writing, downstream stages verify consumed frozen paths against their freeze revisions, conceptually:

```text
git diff <product-freeze-sha> -- <product paths>
git diff <design-freeze-sha>  -- <design paths>
git diff <test-freeze-sha>    -- <test paths>
```

They also verify the Task Packet's `base_revision` and dependencies still identify the intended execution baseline.

A legitimate newer re-freeze requires a refreshed packet/handoff. An unexplained mismatch stops execution.

## 6. Freeze Break

If a downstream stage discovers a frozen artifact is wrong, contradictory, stale, or unsafe, it returns the canonical `FREEZE_BREAK_REQUIRED` structure to the owning Product/Design/Test stage.

After approval, the owner updates the artifact, repeats required review, establishes a new committed freeze, updates affected packets, and downstream execution resumes.

## 7. Future enforcement

A future harness may enforce these checks mechanically through write-scope and Git-diff gates. The current protocol does not wait for that infrastructure: the same preflight is already required in manual multi-chat execution.
