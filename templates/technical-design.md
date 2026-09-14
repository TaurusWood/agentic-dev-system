# Technical Design Template

## 1. Inputs

- PRD path / revision:
- Current code baseline:
- Relevant standards:

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

## 5. Data / state / control flow

Describe the implementation-relevant flow without restating the PRD.

## 6. Module task slicing

Each task should be independently understandable, testable, and reviewable.

### TASK-ID — Title

- Goal:
- Product behavior covered:
- Owning module:
- Dependencies:
- Public interfaces / invariants:
- Allowed implementation scope:
- Out of scope:
- Expected test scope:
- Integration points:
- Completion evidence:

## 7. Task DAG

```text
TASK-A
  ↓
TASK-B ──→ TASK-D
  ↓
TASK-C
```

## 8. Risks and compatibility

Only implementation-relevant risks.

## 9. Design Freeze

- Product freeze consumed:
- Design freeze revision:
- Review status:
- Notes:
