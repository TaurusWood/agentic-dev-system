# Stage Contracts

Use these as authority boundaries for execution or prompt generation.

## PRD / Product Discussion

**Owns**
- user/player-visible behavior
- product goal and scope
- core flow / gameplay / interaction
- information hierarchy
- acceptance behavior
- non-goals and product boundaries

**May change**
- product-level documents within the assigned scope

**Must preserve**
- current repository evidence unless the requirement explicitly changes it

**Must not do**
- invent classes, internal events, file layouts, test implementation, or coding details
- silently expand the requirement

**Must stop when**
- a material product choice needs human judgment and evidence is insufficient

**Done when**
- intended observable behavior is explicit enough for Technical Design
- unresolved decisions are surfaced
- a compact human approval surface is available

## Technical Design

**Owns**
- mapping frozen product intent onto the actual codebase
- technical terminology and module ownership
- public contracts and invariants
- state/data flow and integration boundaries
- agent-sized task slicing and dependencies

**May change**
- technical-design artifacts in scope

**Must preserve**
- PRODUCT FREEZE semantics

**Must not do**
- redefine user-visible behavior
- write production implementation unless explicitly requested as a prototype
- create tests as a substitute for design

**Must stop when**
- product intent is contradictory or a cross-module change would alter product scope

**Done when**
- module/task boundaries, dependencies, scope, contracts, and validation expectations are explicit

## Test

**Owns**
- proving frozen product and technical contracts for one bounded task
- deterministic fixtures and regression coverage

**May change**
- tests/fixtures inside assigned Test scope before TEST FREEZE

**Must preserve**
- PRODUCT FREEZE
- DESIGN FREEZE

**Must not do**
- redefine product behavior to make testing easier
- overfit assertions to an implementation that does not yet exist
- silently widen module scope

**Must stop when**
- upstream contracts conflict or cannot be tested coherently

**Done when**
- behavior/invariants/failure boundaries are covered
- expected RED/GREEN semantics are known
- validation commands are explicit
- TEST FREEZE can be established after required review

## Coding

**Owns**
- the smallest justified production-code change that satisfies frozen product/design/test contracts

**May change**
- production files inside declared write scope

**Must preserve**
- frozen product/design artifacts
- frozen tests
- valid module ownership and external contracts

**Must not do**
- edit frozen tests to regain green status
- silently change external module contracts
- solve unrelated backlog items
- add speculative abstraction or fallback that weakens failure semantics

**Must stop when**
- frozen Test or Design is invalid
- safe implementation requires an undeclared external contract change
- a prerequisite dependency is missing

**Done when**
- required validation passes or a precise blocker is returned
- diff is self-reviewed against contracts
- frozen artifacts remain unchanged

## Module CR

**Owns**
- independent conformance review of one completed module task

**May change**
- normally nothing; review first unless explicitly asked to fix after findings

**Must preserve**
- upstream frozen semantics

**Must not do**
- redesign Product or Technical Design during review
- create style-only findings without a violated invariant and impact

**Must stop when**
- the upstream contract itself is wrong; request a Freeze Break instead

**Done when**
- findings are evidence-based and ordered by severity
- verdict is explicit: PASS / PASS_WITH_NOTES / CHANGES_REQUIRED / FREEZE_BREAK_REQUIRED

## Integration / Top-level Coding

**Owns**
- assembly of reviewed module work
- cross-module mechanical integration
- integration validation and regression

**May change**
- integration/shared code explicitly assigned to this stage

**Must preserve**
- reviewed module contracts and frozen upstream semantics

**Must not do**
- rewrite module behavior simply to make pieces fit
- absorb unfinished module implementation without explicit reassignment

**Must stop when**
- integration reveals a real cross-module contract conflict

**Done when**
- reviewed modules are integrated in dependency order
- full required regression passes or blockers are explicit

## Final CR

**Owns**
- system-level verification of the integrated requirement/version

**May change**
- normally nothing; report findings

**Must preserve**
- all frozen semantics while assessing the integrated result

**Must not do**
- assume module PASS implies end-to-end correctness
- silently redefine success

**Must stop when**
- product/design truth itself needs reopening

**Done when**
- PRD coverage, end-to-end journeys, cross-module contracts, regression, freeze integrity, and residual risks are reviewed
- final verdict and focused human acceptance scenarios are explicit
