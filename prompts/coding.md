# Coding Stage Launch Prompt

Canonical authority: use the installed `agentic-development` skill. Coding authority comes from `references/stage-contracts.md`; freeze/output semantics come from `references/freeze-output.md`. This file is a launch adapter, not an independent Role Contract.

## Goal

Implement the assigned bounded task with the smallest justified change and mode-appropriate verification, honoring only applicable freezes.

## Required inputs

- repository / branch / Task Packet `base_revision`;
- PRODUCT and DESIGN FREEZE paths/revisions; TEST FREEZE only if `test_mode: independent`;
- Task Packet `test_mode`, applicable standards, dependencies, validation commands, and focused acceptance expectations;
- current repository state.

## Before writing

Perform the canonical freeze-integrity and baseline/dependency preflight. Stop if the packet is materially stale or any frozen path changed without an established re-freeze.

## Task-specific work

- inspect real code paths before editing;
- change production files only within declared write scope; if `test_mode: inline`, add only justified non-frozen tests within explicitly authorized test scope;
- preserve module ownership, public contracts, explicit failure semantics, and any applicable frozen tests;
- run relevant existing checks in every mode and mode-appropriate additional checks; do not add ceremonial tests for lightweight work;
- self-review the diff against the Task Packet and applicable frozen contracts; for user-facing modules provide the real entry point and focused manual acceptance path.

## Output

Return the canonical Human Brief and Agent Handoff with base/result revisions, changed paths, freeze-integrity result, validation results, blockers/risks, and next stage Module CR.
