# Test Stage Prompt Template

Follow the common execution contract in `docs/protocols/execution-contract.md`.

## Role Contract

**Owns:** the test contract for one frozen module task.

**May change:** declared test files/fixtures and test-stage artifacts.

**Must preserve:** PRODUCT FREEZE and DESIGN FREEZE semantics.

**Must not do:** rewrite product/design contracts, overfit tests to a proposed implementation, or widen module scope silently.

**Must stop when:** upstream contracts are contradictory, impossible to test coherently, or require an unapproved external-module change.

## Goal

Create tests that prove the module satisfies the frozen PRD and Technical Design without redefining either contract.

## Required inputs

- PRODUCT FREEZE revision
- DESIGN FREEZE revision
- module task ID
- current code/tests

## Required work

1. Read the authoritative product and technical contracts first.
2. Inspect existing tests and fixtures before adding new ones.
3. Cover observable product behavior, technical invariants, failure boundaries, and regressions relevant to this module.
4. Prefer stable public behavior/interfaces over implementation-private assertions.
5. Keep fixtures deterministic and representative.
6. Record required validation commands.
7. Run an independent test review before TEST FREEZE when possible.

## Forbidden

- Do not change product or technical contracts to simplify testing.
- Do not overfit tests to an implementation that has not yet been written.
- Do not widen the module scope silently.

## Stop conditions

If the upstream contracts are contradictory or impossible to test coherently, stop and return `FREEZE_BREAK_REQUIRED` to the owning stage.

## Done / output

### Human Brief

- whether the test contract is ready to freeze
- what behavior/invariants are covered
- material fixture or coverage risk
- human decision required, if any
- next step

### Agent Handoff

- created/changed test files
- coverage mapped to module requirements
- expected RED state where applicable
- fixture assumptions
- validation commands/results
- proposed TEST FREEZE revision after review
- next stage: Coding

Use Human Discussion only for material test-contract ambiguity or explicit requests.
