# Failure Semantics

## 1. Purpose

A system should distinguish different kinds of failure instead of collapsing them into silent defaults, generic exceptions, or success-shaped results.

The exact mechanism may be exceptions, result types, error values, status objects, assertions, signals, HTTP responses, process exits, or framework-specific primitives. This document defines the semantics, not the syntax.

## 2. Failure categories

### Expected domain rejection

The input or requested action is valid to ask for, but the current domain state does not permit it.

Examples:

- insufficient balance;
- invalid transition from the current workflow state;
- requested operation is unavailable under the current permissions or business rules.

Represent this as an explicit, inspectable rejection that the caller can handle. Do not disguise it as an internal program error.

### Invalid caller input or contract violation

A caller violates an API or module precondition that should have been satisfied before the call.

Reject it at the responsible boundary with enough information to identify the violated contract. Do not silently coerce the value unless coercion is itself part of the public contract.

### Broken internal invariant

The program reaches a state that the design says should be impossible.

During development and testing, surface this aggressively through assertion, invariant checking, structured violation reporting, or equivalent mechanisms. Avoid defaulting to plausible-looking data that allows corrupted execution to continue.

Production handling may add containment or recovery when required for availability, but containment must not redefine the invalid state as valid.

### Dependency or infrastructure failure

An external system, file, network call, database, process, device, or service cannot satisfy the requested operation.

Preserve enough cause and context for retry, escalation, user feedback, or diagnosis. Do not translate every dependency failure into an empty result when empty is also a valid business value.

### Incomplete required configuration or data

Required configuration, schema, model input, or initialization data is missing or inconsistent.

Fail at the earliest boundary that can identify the missing requirement. Do not invent a business value, formula, identifier, permission, or fallback merely to continue execution.

## 3. Fallback rules

A fallback is justified only when degraded behavior is an explicit part of the product or technical contract.

A valid fallback should define:

- which failure it handles;
- what degraded behavior is acceptable;
- what information may be lost;
- whether the degradation is visible to callers/users;
- how the system returns to normal behavior;
- how the fallback is tested.

Do not add fallback solely to make tests pass, suppress an invariant violation, or avoid resolving an unclear requirement.

## 4. Default values

Defaults are part of a contract, not a general error-handling strategy.

Use a default when absence has a defined meaning. Do not use a default when absence indicates corrupted state, missing required input, failed loading, or an unresolved product decision.

A default that converts an error into apparently valid state is especially dangerous because it produces false-green behavior.

## 5. Error ownership

Handle a failure at the lowest layer that has enough responsibility to make the correct decision.

Lower layers should preserve facts and cause; higher layers may translate those facts into domain or user-facing behavior.

Avoid both extremes:

- swallowing errors at a low-level helper that cannot decide the correct recovery;
- leaking raw infrastructure details through every layer to the user-facing boundary.

## 6. Observability

Failures that matter operationally should leave evidence appropriate to their severity and environment: structured errors, logs, metrics, traces, violations, test output, or other project-approved signals.

Do not log the same failure redundantly at every layer. The owning boundary should decide where contextual information is added and where the event is emitted.

## 7. Testing failures

Tests should cover failure semantics that affect correctness, not only success paths.

At minimum, verify the important distinctions introduced or changed by the task:

- allowed vs rejected domain action;
- missing required input vs valid empty value;
- expected rejection vs internal invariant failure;
- dependency failure vs valid empty response;
- fallback activation and recovery when fallback is contractual.

Do not weaken failure assertions to match an implementation that silently degrades unless the upstream contract is explicitly changed.