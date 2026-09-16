# Task Packet Contract

> Runtime authority for stage/freeze semantics lives in `skills/agentic-development/references/`. This document defines the repository task-packet data contract and ownership model.

## 1. Purpose

A Task Packet is the structured handoff between coordination and an execution agent.

It should be small enough to inspect, stable enough to version, and explicit enough that a fresh chat can start without relying on prior conversation history.

## 2. Minimum schema

Use [`../../templates/task-packet.yaml`](../../templates/task-packet.yaml) as the concrete template. Minimum information includes:

```yaml
task: BUILD-04
title: Direct city-to-city build planning
phase: implementation
status: test-frozen

repository:
  full_name: TaurusWood/pocket-railway
  branch: fix/m1-build
base_revision: abc123

product_contract:
  path: docs/releases/m1/prd.md
  revision: def456

technical_contract:
  path: docs/releases/m1/technical-design.md
  section: BUILD-04
  revision: ghi789

test_contract:
  revision: jkl012
  paths:
    - tests/smoke/build_planning_smoke.gd
  evidence:
    baseline_revision: abc123
    baseline_result: RED
    expected_failure:
      - direct city-to-city planning is not implemented at baseline
    justification_if_green: ""

write_scope:
  - scenes/map/**
forbidden_scope:
  - docs/**
  - tests/**

validation:
  - ./scripts/run_tests.mjs build_planning
```

## 3. Ownership

Task Packet fields are not all owned by the coordinator.

- **Technical Design** creates the initial packet and owns task goal, repository/base revision, technical scope, dependencies, applicable standards, validation expectations, and stop conditions until DESIGN FREEZE.
- **Test** owns `test_contract` paths/revision/evidence until TEST FREEZE.
- **Coordinator** may update execution metadata such as phase, status, completed/result revisions, and routing. It must not silently rewrite frozen Product/Design/Test contract fields.
- **Coding / Review / Integration** consume the packet. If a contract field is stale or wrong, they escalate to its owning stage.

This prevents the Task Packet itself from becoming an unowned second specification.

## 4. Design rules

### Reference, do not duplicate
The packet points to authoritative artifacts and revisions. It should not paste entire PRDs, designs, or standards.

### Pin the execution baseline
`repository`, `branch`, and `base_revision` identify the state against which the bounded task was prepared. A fresh agent must not assume that arbitrary current HEAD is equivalent.

A later HEAD is acceptable only when the declared dependencies/frozen paths remain valid. If baseline drift materially affects correctness, refresh the packet rather than guessing.

### Declare applicable standards
Identify the smallest relevant set of universal and project-local standards needed for the task. Do not require every execution agent to read every standard.

### Declare exceptions explicitly
If frozen Technical Design intentionally deviates from an applicable standard, reference the approved exception. Task packets do not create exceptions by themselves.

### Declare permissions
Write scope is part of task correctness, not a convenience hint.

### Declare frozen revisions
A task without known upstream revisions is vulnerable to moving-target drift.

### Declare test sensitivity evidence
For new behavior or bug regression expected to fail at baseline, TEST FREEZE should record that the relevant test failed at `baseline_revision` for the expected semantic reason. If it was already green, record a justification instead of manufacturing RED.

### Declare dependencies and validation
“Looks correct” is not a done condition. Dependencies and validation commands must be explicit.

### Declare stop conditions
The packet must tell the agent when independent reasoning is no longer authorized.

## 5. Execution result

Agents should return a compact structured result:

```yaml
status: DONE # DONE | BLOCKED | FAILED | FREEZE_BREAK_REQUIRED | DEPENDENCY_REQUIRED
task: BUILD-04
base_revision: ...
result_revision: ...
changed_paths:
  - ...
freeze_integrity:
  result: PASS
  checked_at_revision: ...
validation:
  - command: ...
    result: PASS
notes:
  - ...
```

For `FREEZE_BREAK_REQUIRED`, use the canonical Freeze Break Request in the installed skill.

## 6. Future automation

The task packet may later become machine-readable input to prompt generation, worktree provisioning, write-scope enforcement, scheduling, validation, and freeze-diff checks. v0.1 does not require any of those mechanisms.
