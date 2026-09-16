# Technical Design Stage Launch Prompt

Canonical authority: use the installed `agentic-development` skill. Technical Design authority comes from `references/stage-contracts.md`; freeze/output semantics come from `references/freeze-output.md`. This file is a launch adapter, not an independent Role Contract.

## Goal

Map the frozen product contract onto the real repository and slice it into bounded tasks that can be tested, implemented, and reviewed independently.

## Required inputs

- repository / branch / `base_revision`;
- PRD path + PRODUCT FREEZE revision;
- current code baseline;
- relevant architecture/engineering standards.

## Before writing

Perform canonical PRODUCT FREEZE integrity preflight.

## Task-specific work

- inspect real code before designing;
- define ownership, public contracts, invariants, state/data flow, integration boundaries, compatibility needs, and dependencies;
- create the initial Task Packet for each bounded task, including repository identity, `base_revision`, product/design references, scope, dependencies, validation, and stop conditions;
- do not establish DESIGN FREEZE until required review is complete and the design exists at a committed revision.

## Output

Return the canonical Human Brief and Agent Handoff with design revision, task packets, dependency state, and either the established DESIGN FREEZE revision or an explicit `ready to freeze` state.
