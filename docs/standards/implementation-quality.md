# Implementation Quality

## 1. Purpose

This document defines implementation-quality rules that can be applied across programming languages without prescribing syntax or framework conventions.

Project-local standards remain authoritative for concrete naming, formatting, typing, linting, API, persistence, UI, and framework behavior.

## 2. Semantic naming

Names should communicate the domain or technical meaning needed at their scope.

Prefer names that reveal responsibility, state, lifecycle, or unit when those distinctions matter. Avoid generic names such as `data`, `info`, `value`, `result`, `context`, `item`, `manager`, or `service` when the name hides an important domain distinction.

Short local names are acceptable when meaning is obvious from a very small scope. Public contracts, persisted fields, cross-module messages, and long-lived state require stronger semantic precision.

Use one vocabulary for one concept within an authoritative boundary. Synonyms that imply different meanings should not drift into the same domain model without an explicit distinction.

## 3. Units and representation

When a value has a unit, scale, timezone, coordinate system, currency, precision, or lifecycle that can be confused, make that representation explicit in the type, name, contract, or boundary conversion.

Do not rely on distant call-site knowledge to determine whether a value is seconds vs milliseconds, local time vs UTC, bytes vs characters, gross vs net, or normalized vs raw.

Convert representation at explicit boundaries rather than scattering conversions across consumers.

## 4. Types and contracts

Use the strongest practical contract supported by the language and project without adding disproportionate complexity.

Public and cross-module boundaries deserve stricter contracts than short-lived local implementation details.

Do not use weak typing, unstructured maps, unchecked casts, reflection, or dynamic escape hatches to bypass an unresolved model problem merely because the language allows them.

When a flexible representation is intentionally temporary, define required fields/invariants and a migration or ownership boundary instead of treating flexibility as absence of contract.

## 5. Functions and control flow

A function should perform a coherent unit of responsibility.

Split code when doing so creates a meaningful name, test seam, ownership boundary, or reusable rule. Do not split a simple operation into layers of one-line wrappers solely to satisfy an arbitrary size target.

Prefer:

- explicit inputs and outputs;
- limited hidden mutation;
- visible failure paths;
- early rejection when it clarifies invalid input;
- named domain steps for non-obvious calculations;
- control flow that can be traced without jumping through unnecessary indirection.

Avoid clever compression that saves lines while obscuring behavior.

## 6. Abstraction

An abstraction is justified when it owns one of the following:

- a stable shared rule;
- a stable shared contract;
- a repeated responsibility with one reason to change;
- isolation from an external dependency;
- a boundary that materially improves testability, replaceability, or ownership.

An abstraction is not justified merely because:

- a pattern appears twice;
- a possible future consumer may exist;
- a design pattern is available;
- a new manager/service/helper name can be invented;
- it makes a diagram look more layered.

Prefer deletion and directness over speculative generality.

## 7. Comments and documentation

Comments should explain information the code cannot express clearly by itself, such as:

- business rationale;
- compatibility constraints;
- non-obvious invariants;
- units or conversion reasons;
- intentionally surprising behavior;
- temporary compromises and their removal condition.

Do not use comments to restate obvious control flow or to compensate for avoidable naming and ownership problems.

Durable architectural decisions belong in versioned design/standards artifacts, not only in code comments.

## 8. Temporary behavior

Temporary compatibility logic, fallback, migration paths, and phase-specific approximations must be explicit.

They should have:

- a reason;
- an owner;
- a bounded scope;
- a condition under which they can be removed or reconsidered.

Do not let temporary behavior silently become a second permanent contract.

## 9. Change hygiene

Keep the diff focused on the requested behavior and required supporting changes.

Do not mix unrelated renaming, formatting, directory movement, cleanup, or dependency upgrades into a functional change unless they are necessary for correctness or explicitly included in scope.

Preserve existing valid conventions unless the task intentionally changes them.

## 10. Review questions

For changed code, reviewers should be able to answer:

- Is the responsibility clear from the names and structure?
- Is there one authoritative implementation for each changed rule?
- Are units and representations unambiguous where confusion would matter?
- Is new abstraction justified by an actual responsibility or contract?
- Are side effects and failures visible?
- Is temporary behavior explicit?
- Is there a smaller implementation with equal correctness and clarity?
- Did the change remain within scope?