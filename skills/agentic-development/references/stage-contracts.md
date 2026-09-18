# Stage Contracts

This file is the canonical runtime source for stage authority. Use these contracts for execution and prompt generation. Other prompts/documents may reference these rules but must not redefine them.

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
- after required approval, PRODUCT FREEZE can be established at a committed revision

## Technical Design

**Owns**
- mapping frozen product intent onto the actual codebase
- technical terminology and module ownership
- public contracts and invariants
- state/data flow and integration boundaries
- agent-sized task slicing and dependencies
- creation of the initial task packet for each bounded module task

**May change**
- technical-design artifacts and initial task packets in scope

**Must preserve**
- PRODUCT FREEZE semantics and integrity

**Must not do**
- redefine user-visible behavior
- write production implementation unless explicitly requested as a prototype
- create tests as a substitute for design

**Must stop when**
- product intent is contradictory or a cross-module change would alter product scope
- PRODUCT FREEZE integrity preflight fails

**Done when**
- module/task boundaries, dependencies, scope, contracts, and validation expectations are explicit
- each implementation-bound task has an initial packet with repository identity, `base_revision`, product/design inputs, scope, dependencies, validation, and stop conditions
- after required review, DESIGN FREEZE can be established at a committed revision

## Test

**Owns**
- proving frozen product and technical contracts for one or more explicitly assigned bounded tasks
- deterministic fixtures and regression coverage without cross-task semantic coupling
- the `test_contract` and test-evidence fields of each assigned task packet until that task's TEST FREEZE

**May change**
- tests/fixtures inside assigned Test scope before TEST FREEZE
- task-packet test-contract/evidence fields for the assigned task

**Must preserve**
- PRODUCT FREEZE
- DESIGN FREEZE
- task goal, module scope, and dependencies defined by Technical Design

**Must not do**
- redefine product behavior to make testing easier
- overfit assertions to an implementation that does not yet exist
- silently widen module scope

**Must stop when**
- upstream contracts conflict or cannot be tested coherently
- PRODUCT/DESIGN freeze integrity preflight fails
- meaningful test coverage requires an undeclared external-module contract change

**Done when**
- behavior/invariants/failure boundaries are covered
- validation commands are explicit
- for a new behavior or bug regression that is expected to be absent/broken at the declared baseline, the relevant test is run against `baseline_revision` and fails for the expected semantic reason
- if the relevant test is already green at baseline, the Test result explicitly records why that is valid and what evidence still makes the contract discriminating
- for every assigned task, task-packet test paths, evidence, and proposed test revision are updated
- required independent test review is complete for every assigned task
- each task's TEST FREEZE can be established at a committed revision

## Coding

**Owns**
- the smallest justified production-code change that satisfies frozen product/design/test contracts

**May change**
- production files inside declared write scope

**Must preserve**
- frozen product/design artifacts
- frozen tests
- valid module ownership and external contracts
- task-packet scope/dependencies

**Must not do**
- edit frozen tests to regain green status
- silently change external module contracts
- solve unrelated backlog items
- add speculative abstraction or fallback that weakens failure semantics

**Must stop when**
- any required freeze-integrity preflight fails
- frozen Test or Design is invalid
- safe implementation requires an undeclared external contract change
- a prerequisite dependency is missing or the declared base revision is materially stale

**Done when**
- freeze-integrity preflight passed before edits
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
- treat the Coding agent's private reasoning/transcript as authoritative review evidence
- create style-only findings without a violated invariant and impact

**Must stop when**
- the upstream contract itself is wrong; request a Freeze Break instead
- freeze-integrity evidence is missing or contradicts the reviewed revision

**Done when**
- the review is independent of the Coding execution context when runtime isolation is available
- frozen artifacts and declared scope are independently checked against revisions/diff
- test sensitivity evidence is reviewed where applicable
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
- required module revision/review evidence is missing

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
