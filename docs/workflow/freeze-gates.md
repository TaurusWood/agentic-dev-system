# Freeze Gates

## 1. Why freezes exist

A downstream agent must not be allowed to make upstream requirements easier merely to make its own stage pass.

Without explicit freeze semantics, a coding loop can converge to green tests while drifting away from product intent.

## 2. Freeze levels

### PRODUCT FREEZE
The PRD / approved observable behavior is frozen for downstream design work.

### DESIGN FREEZE
Technical Design, module boundaries, public contracts, and task slicing are frozen for test and coding work.

### TEST FREEZE
The accepted test contract for a module is frozen for implementation.

Freeze means read-only by default, not “physically impossible to change forever.”

## 3. Freeze Break Request

If a downstream agent finds that a frozen artifact is invalid, contradictory, or impossible to implement correctly, it must stop the affected task and produce a short structured request.

Required fields:

```text
Artifact:
Frozen revision:
Observed conflict:
Why downstream implementation cannot safely continue:
Proposed change:
User-visible behavior changed: YES / NO
Affected tests/modules:
```

A freeze break must be reviewed at the stage that owns the artifact.

Examples:

- Wrong product behavior → reopen PRD/Product review.
- Invalid module contract → reopen Technical Design.
- Broken fixture or incorrect assertion → reopen Test stage.

After approval:

1. modify the owning artifact;
2. re-run its review;
3. create a new freeze revision;
4. regenerate/update downstream task packets;
5. resume implementation.

## 4. Implementation rule

After TEST FREEZE, an implementation agent may not silently modify:

- PRD
- frozen Technical Design/task contract
- frozen tests

A future executable harness should enforce this mechanically through Git diff/write-scope checks rather than relying only on prompt instructions.

Conceptual check:

```text
git diff <product-freeze-sha> -- <product artifacts>
git diff <design-freeze-sha>  -- <design artifacts>
git diff <test-freeze-sha>    -- <test paths>
```

Unexpected changes fail the gate.

## 5. What does not require a product freeze break

Not every test edit changes product truth.

Examples that may remain inside the Test stage before TEST FREEZE:

- deterministic fixture correction
- test-data ordering correction
- eliminating a flaky wait
- correcting an invalid path used by the test

The distinction is authority and timing:

- before TEST FREEZE, test maintainers can correct tests within frozen upstream contracts;
- after TEST FREEZE, coding agents cannot make that decision themselves.

## 6. Human gate design

Human approval should be proportional to the semantic risk.

For user-visible behavior, show a compact observable delta:

```text
Before:
Build → click A → station focus → “plan from here” → click B

After:
Build → click A → A becomes origin → click B

User-visible behavior changed: YES
```

Do not require the human to approve implementation details that can be derived mechanically from already approved behavior.
