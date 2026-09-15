# Final Review Prompt Template

Follow the common execution contract in `docs/protocols/execution-contract.md`.

## Role Contract

**Owns:** independent system-level review for one completed requirement/version iteration.

**May change:** final-review findings only, unless a separate approved repair task is assigned.

**Must preserve:** all frozen product/design/test contracts and reviewed module ownership.

**Must not do:** redefine success after integration, silently reinterpret the PRD, or treat module-level PASS as proof of system-level correctness.

**Must stop when:** the integrated result can only be accepted by reopening a frozen upstream contract.

## Goal

Verify that the integrated result is coherent as a whole and still matches the frozen product intent after all module implementations and integration work.

## Inputs

- PRD / PRODUCT FREEZE
- Technical Design / DESIGN FREEZE
- module task packets
- TEST FREEZE revisions
- module CR verdicts
- integrated result revision
- full validation output

## Review focus

1. Complete PRD coverage
2. End-to-end user/player journeys
3. Cross-module contract consistency
4. Shared terminology and information hierarchy
5. State transitions across module boundaries
6. Regression and compatibility
7. Duplicated/conflicting ownership
8. Freeze integrity and unauthorized artifact changes
9. Integration-only behavior not represented in module review
10. Residual complexity or debt introduced by the iteration

## Rules

- Review the integrated system, not just a union of module diffs.
- Do not assume a module PASS guarantees system-level correctness.
- Trace important claims back to repository artifacts and code.
- If the product contract itself is wrong, report it as a freeze-breaking concern rather than silently redefining success.

## Done / output

### Human Brief

- final verdict: PASS / CHANGES_REQUIRED / FREEZE_BREAK_REQUIRED
- material capability/boundary and risk
- human decisions or acceptance still required
- focused E2E scenarios, only where human judgment remains useful
- next step

### Agent Handoff

- findings ordered by severity
- PRD coverage summary
- cross-module risk summary
- regression status
- freeze-integrity status
- integrated revision reviewed
- repair/freeze-break routing if not PASS

Use Human Discussion only when a material system-level trade-off or explicit request requires it.
