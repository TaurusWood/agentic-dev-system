# Engineering Principles

## 1. Evidence before design

Inspect the current system before deciding how to change it.

Distinguish:

- **current-state truth** — what the code, configuration, data, tests, and runtime actually do;
- **target-state truth** — what the approved product and technical contracts require.

Do not infer architecture from file names, tests from intent, or requirements from legacy implementation when direct evidence is available.

When evidence conflicts, report the conflict instead of silently selecting the most convenient source.

## 2. Smallest justified change

Prefer the smallest implementation that completely satisfies the current confirmed contract.

This means:

- do not redesign unrelated code while solving a local problem;
- do not add extension points for unconfirmed future requirements;
- do not introduce a new layer when an existing responsibility boundary already fits;
- do not replace a clear local solution with a generic mechanism unless the generic mechanism has a real owner and real reuse.

Small does not mean incomplete. Correctness, explicit contracts, data integrity, and required compatibility take precedence over minimizing line count.

## 3. Explicit ownership

Important facts, state, rules, and side effects should have an identifiable owner.

An owner is the module or boundary responsible for deciding or maintaining a piece of truth. Consumers may project, format, cache, or react to that truth only within an explicit contract.

Avoid systems where two layers both believe they are authoritative for the same state or business rule.

## 4. One authoritative implementation per rule

A business or domain rule should not be independently re-derived in multiple layers when those derivations must remain equivalent.

Prefer one authoritative implementation with explicit projections or adapters at boundaries.

Duplication of syntax is less dangerous than duplication of semantics. Two similar-looking pieces of code do not require abstraction if they represent different responsibilities. Two different-looking implementations may require consolidation if they claim to implement the same authoritative rule.

## 5. Responsibility before reuse

Organize code around responsibility and ownership before optimizing for reuse.

Code should remain local while its responsibility is local. Promote it to a shared module only when a stable shared responsibility exists.

Do not use a shared directory, manager, service, helper, or utility layer as a holding area for code whose owner is unclear.

## 6. Dependencies should follow responsibility

A module may depend on a lower-level or shared capability that has a stable contract. A shared or foundational module should not depend back on a consumer's private implementation.

Circular or bidirectional dependencies are a signal that ownership or boundaries are unclear unless the architecture explicitly models such a relationship.

Prefer dependency direction that can be explained in terms of responsibility, not merely import convenience.

## 7. Separate decision from presentation

Business/domain decisions should live in the layer that owns the underlying rule. Presentation layers, transport adapters, serializers, and formatters should not silently become alternate business engines.

They may transform representation, but should not independently decide authoritative domain outcomes unless that responsibility is explicitly assigned to them.

## 8. Make invalid states visible

Do not hide violated invariants, missing required inputs, invalid configuration, or failed dependencies behind silent defaults merely to keep execution moving.

Expected user or domain rejection is different from programmer error or corrupted state. Model the difference explicitly. See [Failure Semantics](failure-semantics.md).

## 9. Prefer readable control flow

Code should make ownership, state transitions, failure paths, and important side effects easy to locate.

Prefer direct, named steps over dense expressions or indirection that reduces local readability without creating a real boundary.

A future maintainer or reviewing agent should be able to answer:

- what responsibility this code owns;
- what inputs it trusts;
- what state it changes;
- what may fail;
- what it returns or emits;
- how the behavior is verified.

## 10. Scope is part of correctness

A technically correct change can still be wrong if it alters unrelated behavior, contracts, data, or ownership.

Keep modifications within the declared task and module scope. If the correct fix requires a broader contract change, surface that need rather than silently absorbing it.

## 11. Verification must match risk

Implementation is not complete until the relevant behavior has evidence.

Use the smallest validation set that can detect the meaningful failure modes of the change. Expand validation when the change crosses modules, external contracts, persistent data, concurrency, security, or deployment boundaries.

Passing lint, type checks, or unit tests is evidence about specific properties, not proof that the full product behavior is correct.