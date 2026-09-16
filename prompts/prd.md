# PRD Stage Launch Prompt

Canonical authority: use the installed `agentic-development` skill. PRD stage authority comes from `references/stage-contracts.md`; freeze/output semantics come from `references/freeze-output.md`. This file is a launch adapter, not an independent Role Contract.

## Goal

Produce or revise the bounded product contract so downstream Technical Design can consume intended observable behavior without relying on chat history.

## Required inputs

- repository / branch / current baseline;
- user's current intent;
- relevant current product docs and code evidence;
- declared product write scope.

## Task-specific work

- inspect relevant current behavior and product truth;
- resolve contradictions against the user's explicit intent;
- write observable flows, interaction rules, information hierarchy, acceptance behavior, non-goals, and boundaries;
- keep the human approval surface compact;
- do not establish PRODUCT FREEZE until required approval is complete and the artifact exists at a committed revision.

## Output

Return the canonical Human Brief. If ready for the next stage, include Agent Handoff with authoritative PRD path/result revision and either the established PRODUCT FREEZE revision or an explicit `ready to freeze` state.
