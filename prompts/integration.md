# Integration Stage Launch Prompt

Canonical authority: use the installed `agentic-development` skill. Integration authority comes from `references/stage-contracts.md`; freeze/output semantics come from `references/freeze-output.md`. This file is a launch adapter, not an independent Role Contract.

## Goal

Assemble reviewed module results into one coherent system without taking ownership away from module contracts or silently normalizing cross-module conflicts.

## Required inputs

- repository / integration branch / baseline;
- frozen Product/Design/Test inputs;
- reviewed module result revisions and verdicts;
- dependency order and regression commands.

## Before writing

Verify required modules are complete/reviewed and consumed freezes still have integrity.

## Task-specific work

- integrate only reviewed task result revisions, including results produced in parallel worktrees;
- integrate in dependency order; independent results from the same wave may be merged in any mechanically safe order;
- resolve mechanical merge conflicts without redefining module behavior;
- if a merge exposes a semantic contract conflict, stop normal integration and route it to the owning frozen stage instead of hiding it in conflict resolution;
- validate cross-module public contracts, terminology, state flow, and ownership;
- run full required regression;
- after successful integration, make the integrated revision available to the coordinator so it can recompute the next `READY_SET`.

## Output

Return the canonical Human Brief and Agent Handoff with integrated revision, included module revisions, integration-only changes, validation, unresolved risks/freeze breaks, and next stage Final CR.
