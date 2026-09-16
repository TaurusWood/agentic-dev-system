# Technical Design Template

## 1. Inputs

- PRD path / PRODUCT FREEZE revision:
- Repository / branch:
- Current code baseline (`base_revision`):
- Applicable universal standards:
- Project / language / framework standards:
- Approved exceptions or deviations:

Standards should be referenced, not copied. A deviation must identify the conflicting rule, reason, and approval source rather than silently redefining the baseline.

Before design changes, verify PRODUCT FREEZE integrity using the canonical runtime freeze contract.

## 2. Existing-system findings

Summarize only facts discovered from the current repository that materially affect this requirement.

## 3. Terminology

Define technical terms and map them to product-facing terms where necessary.

| Technical term | Product/UI term | Meaning |
| --- | --- | --- |

## 4. Architecture and module boundaries

For each affected module define:

- responsibility
- owned state/data
- public contract
- dependencies
- forbidden responsibilities

Use the applicable engineering standards to justify ownership, sharing, dependency direction, and any new abstraction. Do not force the repository into a generic directory structure.

## 5. Data / state / control flow

Describe the implementation-relevant flow without restating the PRD.

Identify authoritative owners and representation/conversion boundaries where the same concept appears in multiple layers.

## 6. Failure semantics

For material failure paths define which cases are:

- expected domain rejection
- invalid caller input / contract violation
- broken internal invariant
- dependency / infrastructure failure
- missing required configuration or data
- contractual fallback, if any

## 7. Module task slicing

Each task should be independently understandable, testable, and reviewable.

### TASK-ID — Title

- Goal:
- Product behavior covered:
- Owning module:
- Dependencies:
- Public interfaces / invariants:
- Applicable standards:
- Allowed implementation scope:
- Out of scope:
- Expected test scope:
- Integration points:
- Completion evidence:
- Task Packet path:

For every implementation-bound task, create an initial Task Packet from `templates/task-packet.yaml`. Technical Design owns the initial repository/branch/`base_revision`, Product/Design references, scope, dependencies, standards, validation, and stop conditions. Leave Test-owned contract/evidence fields for the Test stage.

## 8. Task DAG

```text
TASK-A
  ↓
TASK-B ──→ TASK-D
  ↓
TASK-C
```

## 9. Risks and compatibility

Only implementation-relevant risks.

## 10. Design Freeze

- Product freeze consumed:
- Design review status:
- Design freeze revision:
- Task Packets created/updated:
- Notes:

`ready to freeze` is not an established DESIGN FREEZE. Record the committed revision only after required review is complete.
