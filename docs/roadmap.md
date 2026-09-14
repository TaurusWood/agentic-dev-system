# Roadmap

## v0.1 — Methodology baseline

Goal: make the development system explicit before automating it.

- [x] Repository-as-truth principle
- [x] Truth / Control / Execution plane model
- [x] PRD → Technical Design → Test → Coding → CR → Integration → Final CR lifecycle
- [x] Vertical per-module Test / Coding / CR execution
- [x] Product / Design / Test freeze semantics
- [x] Freeze Break Request
- [x] Task Packet contract
- [x] Prompt-generation model
- [x] Initial role prompt templates

## v0.2 — Validate on real projects

Apply the workflow to real changes and collect evidence rather than extending the system spec theoretically.

Target questions:

- Does vertical slicing reduce requirement drift?
- Which human gates are actually necessary?
- How small can the approval surface be without losing correctness?
- Which test edits after freeze are legitimate vs semantic drift?
- What task-packet fields are missing in practice?
- Which role prompts consistently fail or overreach?
- What information is repeatedly re-read and should become structured context?

Candidate validation projects:

- interaction-heavy game changes
- web application feature slices
- refactor + regression work

## v0.3 — Prompt compiler prototype

Build a small tool that generates phase-specific execution prompts from:

- repository metadata
- task packet
- role template
- freeze revisions
- current task state

Initial commands may resemble:

```text
ads prompt BUILD-04 --phase test
ads prompt BUILD-04 --phase implementation
ads prompt BUILD-04 --phase review
```

The exact CLI is intentionally not frozen in v0.1.

## v0.4 — Mechanical gates

Move critical workflow constraints out of prose and into executable checks:

- frozen-path diff detection
- allowed write-scope validation
- required validation commands
- dependency completion checks
- task result schema validation
- automatic Freeze Break routing

## v0.5 — Orchestration

Coordinate multiple isolated module tasks:

- task DAG scheduling
- worktree/branch provisioning
- module execution dispatch
- structured result collection
- integration sequencing
- final review dispatch

## Non-goal for now

Do not prematurely build a large agent platform before the contracts have been validated by repeated real-project use. The first objective is reliable software delivery, not orchestration complexity.
