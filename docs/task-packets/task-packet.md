# Task Packet Contract

## 1. Purpose

A Task Packet is the structured handoff between the Control Plane and an execution agent.

It should be small enough to inspect, stable enough to version, and explicit enough that a new chat can start without relying on prior conversation history.

## 2. Minimum schema

```yaml
task: BUILD-04
title: Direct city-to-city build planning
phase: implementation
status: test-frozen

product_contract:
  path: docs/releases/m1/prd.md
  revision: abc123

technical_contract:
  path: docs/releases/m1/technical-design.md
  section: BUILD-04
  revision: def456

test_contract:
  revision: ghi789
  paths:
    - tests/smoke/build_planning_smoke.gd

depends_on:
  - BUILD-02

write_scope:
  - scenes/map/**
  - scenes/ui/coordinators/**

forbidden_scope:
  - docs/**
  - tests/**

validation:
  - ./scripts/run_tests.mjs build_planning

stop_conditions:
  - frozen test contradicts product contract
  - external module contract must change
  - required dependency is not complete

handoff:
  on_success: module-review
  on_freeze_break: owning-stage
```

## 3. Design rules

### Reference, do not duplicate
The packet points to authoritative artifacts and revisions. It should not paste entire PRDs or designs.

### Declare permissions
Write scope is part of task correctness, not a convenience hint.

### Declare frozen revisions
A task without known upstream revisions is vulnerable to moving-target drift.

### Declare dependencies
The agent should know whether another module must be complete before it can safely proceed.

### Declare validation
“Looks correct” is not a done condition.

### Declare stop conditions
A task packet must tell the agent when independent reasoning is no longer authorized.

## 4. Execution result

Agents should return a compact structured result that the orchestrator can consume:

```yaml
status: DONE # DONE | BLOCKED | FAILED | FREEZE_BREAK_REQUIRED | DEPENDENCY_REQUIRED
task: BUILD-04
base_revision: ...
result_revision: ...
changed_paths:
  - ...
validation:
  - command: ...
    result: PASS
notes:
  - ...
```

For `FREEZE_BREAK_REQUIRED`, include the Freeze Break Request defined in the workflow.

## 5. Future automation

The task packet is intended to become machine-readable input to:

- prompt generation
- worktree/branch creation
- write-scope enforcement
- dependency scheduling
- validation execution
- freeze-diff checks
- review dispatch

v0.1 defines the contract; it does not yet require a specific implementation language or orchestrator.
