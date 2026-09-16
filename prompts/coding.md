# Coding Stage Launch Prompt

Canonical authority: use the installed `agentic-development` skill. Coding authority comes from `references/stage-contracts.md`; freeze/output semantics come from `references/freeze-output.md`. This file is a launch adapter, not an independent Role Contract.

## Goal

Implement the assigned bounded task with the smallest justified production-code change that satisfies the frozen contracts.

## Required inputs

- repository / branch / Task Packet `base_revision`;
- PRODUCT, DESIGN, and TEST FREEZE paths/revisions;
- Task Packet, applicable standards, dependencies, and validation commands;
- current repository state.

## Before writing

Perform the canonical freeze-integrity and baseline/dependency preflight. Stop if the packet is materially stale or any frozen path changed without an established re-freeze.

## Task-specific work

- inspect real code paths before editing;
- change production files only within declared write scope;
- preserve module ownership, public contracts, explicit failure semantics, and frozen tests;
- run required validation;
- self-review the diff against the Task Packet and frozen contracts.

## Output

Return the canonical Human Brief and Agent Handoff with base/result revisions, changed paths, freeze-integrity result, validation results, blockers/risks, and next stage Module CR.
