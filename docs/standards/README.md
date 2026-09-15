# Engineering Standards

## 1. Purpose

This directory defines the language- and framework-independent engineering baseline for the Agentic Development System.

The goal is not to prescribe one universal directory tree, naming convention, framework pattern, or architecture. The goal is to capture engineering invariants that remain useful across different languages and product domains: ownership, module boundaries, dependency direction, simplicity, failure semantics, implementation quality, and verifiability.

These standards belong to the Truth Plane. They are durable engineering constraints that design, implementation, and review agents should reference rather than re-copy into prompts.

## 2. What belongs here

A rule belongs in this baseline only when it is expected to remain valid across multiple languages, frameworks, and business domains.

Examples:

- every important state or rule should have an identifiable owner;
- dependencies should follow explicit responsibility boundaries;
- shared abstractions require real shared semantics or responsibility, not hypothetical future reuse;
- failures should be visible at the layer that can act on them;
- implementation should be the smallest clear solution that satisfies the current contract;
- validation evidence must match the risk being changed.

The following do not belong here:

- React, Godot, Rust, TypeScript, Python, or framework-specific patterns;
- a project's concrete directory names;
- project-specific API, state, persistence, deployment, or naming rules;
- temporary migration constraints;
- task-specific acceptance criteria.

Those remain in language/framework guidance, project-local standards, architecture documents, or task contracts.

## 3. Standards model

Use the standards as a layered baseline:

```text
Universal Engineering Standards
        ↓
Language / Framework Guidance (optional)
        ↓
Project-local Architecture and Standards
        ↓
Task / Frozen Technical Contract
        ↓
Implementation
```

The universal baseline defines default engineering invariants. More specific layers map those invariants onto a concrete system.

Specificity does not authorize silent conflict resolution. If an authoritative project rule, frozen design, or task contract appears to contradict another authoritative constraint, the agent must surface the conflict. A task-level exception is valid only when it is explicit and authorized; otherwise use the normal freeze-break or escalation path.

Safety, data integrity, legal requirements, and external contracts are never weakened by a lower layer.

## 4. Documents

- [Engineering Principles](engineering-principles.md) — cross-language decision principles for implementation and design.
- [Module Design](module-design.md) — responsibility, ownership, placement, sharing, and dependency rules.
- [Implementation Quality](implementation-quality.md) — readable, maintainable, testable implementation rules without prescribing language syntax.
- [Failure Semantics](failure-semantics.md) — how invalid state, expected rejection, dependency failure, and temporary fallback should be represented.

## 5. How agents should use these standards

### Technical design

Use the baseline to define affected modules, owners, dependencies, public contracts, state/control flow, and justified exceptions. Do not copy the standards into the design; reference the applicable documents and record only project/task-specific decisions.

### Coding

Read the applicable standards together with project-local rules and frozen contracts. Preserve existing valid project patterns when they are consistent with the target contract. Do not introduce a generic abstraction merely because the baseline mentions modularity or reuse.

### Review

Use the same rules for review that were used for implementation. Findings should identify a concrete violated invariant, reachable impact, and evidence in the change set. Do not create findings from stylistic preference alone.

## 6. Evolution rule

Do not promote every project lesson into this directory.

A candidate rule should normally have evidence from more than one project, or represent a well-established engineering invariant whose absence repeatedly causes correctness, ownership, maintainability, or verification problems.

Prefer a small stable baseline over an exhaustive rulebook.