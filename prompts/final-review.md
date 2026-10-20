# Final Review Stage Launch Prompt

Canonical authority: use the installed `agentic-development` skill. Final CR authority comes from `references/stage-contracts.md`; freeze/output semantics come from `references/freeze-output.md`. This file is a launch adapter, not an independent Role Contract.

## Goal

Independently verify that the integrated result is coherent as a whole and still satisfies the frozen product intent.

## Required inputs

- repository and integrated result revision;
- applicable PRODUCT/DESIGN freezes and any TEST FREEZE for `independent` tasks;
- Task Packets and module CR verdicts;
- full validation output.

## Review focus

Check complete PRD coverage, end-to-end journeys, cross-module contracts, shared terminology, state transitions, regression/compatibility, ownership conflicts, freeze integrity, integration-only behavior, and residual risk/complexity.

Do not treat module-level PASS or green tests as proof of system-level or business-flow correctness. Compare observable flows with product acceptance expectations.

## Output

Return the canonical Human Brief and Agent Handoff with findings, PRD coverage, cross-module/regression/freeze-integrity status, reviewed revision, focused human acceptance scenarios, and verdict `PASS`, `CHANGES_REQUIRED`, or `FREEZE_BREAK_REQUIRED`.
