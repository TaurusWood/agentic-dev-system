# Test Stage Launch Prompt

Canonical authority: use the installed `agentic-development` skill. Test authority comes from `references/stage-contracts.md`; batching/continuation rules come from `references/workflow.md`; freeze/output semantics come from `references/freeze-output.md`. This file is a launch adapter, not an independent Role Contract.

## Goal

Create discriminating test contracts for one bounded task or an explicitly compatible batch of bounded tasks without redefining Product or Technical Design.

## Required inputs

- repository / branch / task `base_revision` values;
- PRODUCT FREEZE and DESIGN FREEZE paths/revisions;
- assigned Task Packet(s);
- current code/tests/fixtures.

## Before writing

Perform canonical Product/Design freeze-integrity preflight for every assigned task. Do not batch tasks whose frozen inputs, baselines, fixture changes, or write scopes create correctness-relevant coupling.

## Task-specific work

For each assigned task:

- map tests to observable behavior, technical invariants, failure boundaries, and regressions;
- prefer stable public behavior/interfaces over implementation-private assertions;
- keep fixtures deterministic;
- update only that Task Packet's test-contract/evidence fields;
- for new behavior or a bug regression expected to be absent/broken at baseline, run the relevant test against `baseline_revision` and record the expected semantic RED evidence;
- if the test is already green at baseline, record why that is valid rather than manufacturing RED;
- run the required independent test review before TEST FREEZE;
- establish that task's TEST FREEZE only at a committed revision after review.

## Output

Return the canonical Human Brief and Agent Handoff, with per-task test paths, validation, baseline sensitivity evidence, TEST FREEZE revision, and readiness for Coding.
