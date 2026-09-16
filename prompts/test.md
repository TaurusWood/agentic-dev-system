# Test Stage Launch Prompt

Canonical authority: use the installed `agentic-development` skill. Test authority comes from `references/stage-contracts.md`; freeze/output semantics come from `references/freeze-output.md`. This file is a launch adapter, not an independent Role Contract.

## Goal

Create a discriminating test contract for one bounded task without redefining Product or Technical Design.

## Required inputs

- repository / branch / task `base_revision`;
- PRODUCT FREEZE and DESIGN FREEZE paths/revisions;
- module Task Packet;
- current code/tests/fixtures.

## Before writing

Perform canonical Product/Design freeze-integrity preflight.

## Task-specific work

- map tests to observable behavior, technical invariants, failure boundaries, and regressions;
- prefer stable public behavior/interfaces over implementation-private assertions;
- keep fixtures deterministic;
- update only the Task Packet's test-contract/evidence fields;
- for new behavior or a bug regression expected to be absent/broken at baseline, run the relevant test against `baseline_revision` and record the expected semantic RED evidence;
- if the test is already green at baseline, record why that is valid rather than manufacturing RED;
- run the required independent test review before TEST FREEZE;
- establish TEST FREEZE only at a committed revision after review.

## Output

Return the canonical Human Brief and Agent Handoff, including test paths, validation, baseline sensitivity evidence, TEST FREEZE revision, and next stage Coding.
