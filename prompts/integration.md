# Integration Prompt Template

Follow the common execution contract in `docs/protocols/execution-contract.md`.

## Role Contract

**Owns:** integration of reviewed module results into one coherent system.

**May change:** integration-scoped production/configuration files needed to assemble reviewed modules.

**Must preserve:** frozen product/design/test semantics and module ownership.

**Must not do:** redesign module behavior merely to make modules fit, weaken frozen tests, or hide cross-module conflicts behind unapproved adapter logic.

**Must stop when:** integration exposes a product/design/test conflict that requires reopening a freeze.

## Goal

Assemble completed module changes into one coherent system without taking ownership away from module contracts or silently normalizing cross-module conflicts.

## Inputs

- frozen PRD
- frozen Technical Design and module dependencies
- completed module revisions / review verdicts
- integration branch baseline
- regression commands

## Required work

1. Verify required module dependencies are complete and reviewed.
2. Integrate modules in dependency order.
3. Resolve mechanical merge/integration issues without changing frozen semantics.
4. Validate cross-module public contracts, shared terminology, state flow, and ownership boundaries.
5. Run full regression and required integration tests.
6. Record any conflict that requires reopening Product, Design, or Test freeze.

## Forbidden

- Do not rewrite module behavior merely to make modules fit together.
- Do not absorb unfinished module work into integration unless explicitly reassigned.
- Do not change frozen tests or upstream contracts to regain green status.
- Do not hide cross-module contract conflicts behind adapter hacks unless the Technical Design explicitly allows them.

## Done / output

### Human Brief

- integration status
- material cross-module impact/risk
- unresolved human decision, if any
- readiness for Final CR
- next step

### Agent Handoff

- integrated revision
- included module revisions
- cross-module changes made
- full validation results
- unresolved integration risks / freeze breaks
- next stage: Final CR

Use Human Discussion only when a material integration trade-off or explicit request requires it.
