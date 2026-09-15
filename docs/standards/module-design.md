# Module Design

## 1. Purpose

This document defines cross-language rules for deciding where code belongs, what a module owns, when code should become shared, and how modules may depend on one another.

It intentionally does not prescribe names such as `features/`, `core/`, `services/`, `components/`, `domain/`, or `utils/`. Concrete directory mappings belong to the project.

## 2. A module is an ownership boundary

A useful module should have a responsibility that can be stated without listing its files.

For an affected module, technical design should be able to identify:

- **responsibility** — what outcome or capability it owns;
- **owned state/data** — what truth it is authoritative for;
- **public contract** — how other modules interact with it;
- **dependencies** — what capabilities it relies on;
- **forbidden responsibilities** — what must remain elsewhere.

If these cannot be stated clearly, adding more directories or abstraction rarely fixes the underlying boundary problem.

## 3. Default to locality

New implementation should remain as close as practical to the responsibility that owns it.

Do not promote code to a global/shared location solely because:

- two files look similar;
- two callers use the same technical type;
- a name sounds generic;
- future reuse is imaginable;
- a framework convention provides a shared directory.

Locality reduces accidental coupling and makes ownership visible.

## 4. Promote only stable shared responsibility

Promote code into a shared module when there is real evidence that multiple consumers depend on the same stable responsibility, rule, model, or capability.

Before promotion, answer:

1. What shared responsibility exists?
2. Who owns the shared contract?
3. Which parts are actually common semantics rather than similar implementation?
4. Which consumer-specific behavior should remain local?
5. Can the shared module remain independent of consumer-private code?

If those answers are unstable, keep the implementation local until the boundary becomes clearer.

## 5. Share semantics, not coincidence

Extract shared code when consumers must remain behaviorally consistent because they implement the same rule or capability.

Do not extract merely to remove textual duplication when the consumers have different reasons to change.

A small amount of deliberate duplication is preferable to a shared abstraction that creates false coupling.

## 6. Dependency direction

Dependencies should point toward the module that owns the capability being consumed.

General rules:

- consumer-private code may depend on shared/foundational code;
- shared/foundational code must not depend on a consumer's private implementation;
- presentation may depend on domain/application outputs, but domain rules should not depend on presentation details;
- infrastructure adapters may implement a contract owned by a higher-level boundary, but the contract should not be defined by incidental infrastructure details;
- modules should not reach through another module's public boundary to manipulate its private state.

When a dependency must point both directions, explicitly model the coordination contract rather than allowing accidental import cycles or hidden callbacks.

## 7. State and data ownership

Every meaningful mutable state should have one authoritative owner for a given scope and lifecycle.

Other layers may hold:

- derived projections;
- transport representations;
- local UI/input state;
- caches with explicit invalidation rules;
- immutable snapshots.

They should not maintain an independently writable mirror that must stay synchronized with the owner unless the synchronization protocol itself is a designed responsibility.

When the same concept appears in multiple representations, document where conversion occurs and which representation is authoritative.

## 8. Public contracts

A module's public surface should expose the minimum stable contract required by its consumers.

Avoid:

- exporting private data structures merely because they already exist;
- public helpers that let consumers bypass invariants;
- wide mutable objects whose fields are owned by different modules;
- generic catch-all context objects with unclear ownership;
- barrel/public entry points that make dependency direction difficult to trace when traceability matters.

Public contracts should make invalid use difficult and reviewable.

## 9. Side effects and orchestration

Side effects should have an explicit owner and entry point.

Keep pure calculation separate from orchestration when doing so clarifies testing, ownership, or reuse. Do not create a pure/helper layer mechanically when the split adds indirection without a real benefit.

Cross-module workflows need an explicit coordinator or application boundary when no individual domain module should own the whole sequence. The coordinator should orchestrate existing contracts rather than absorb each module's internal rules.

## 10. Placement decision

Before creating or moving a file, answer in order:

1. Which responsibility owns this behavior or data?
2. Is it private to one module or workflow?
3. Is there already an authoritative module for that responsibility?
4. Is the proposed shared behavior semantically shared by multiple consumers today?
5. Would promotion preserve one-way dependency direction?
6. Does the new abstraction remove a real responsibility boundary, or only move code?

If ownership is still unclear, stop and resolve the boundary in technical design rather than creating a generic shared bucket.

## 11. Refactoring rule

Do not perform structural refactoring merely to make the repository resemble this document.

These rules describe the target quality of changed or newly designed boundaries. Existing code should be migrated only when the current task requires it or when a separate refactor has explicit scope, acceptance criteria, and verification.