# Module Review Launch Prompt

Canonical authority: use the installed `agentic-development` skill. Module CR authority comes from `references/stage-contracts.md`; freeze/output semantics come from `references/freeze-output.md`. This file is a launch adapter, not an independent Role Contract.

## Goal

Independently determine whether one completed module task conforms to its frozen Product/Design/Test contracts and declared engineering boundaries.

## Required inputs

- repository / branch / Task Packet;
- PRODUCT, DESIGN, and TEST FREEZE revisions;
- implementation base/result revisions and diff;
- applicable standards/exceptions;
- validation output and test sensitivity evidence.

## Review focus

Review in this order: contract conformance, freeze integrity, scope/ownership, test integrity and discriminating evidence, correctness/failure semantics, module/dependency boundaries, implementation quality, regression risk, unnecessary complexity.

Every finding must identify concrete evidence, reachable impact, and required fix/escalation. Do not create blockers from style preference alone.

## Output

Return the canonical Human Brief and Agent Handoff with severity-ordered findings and canonical verdict: `PASS`, `PASS_WITH_NOTES`, `CHANGES_REQUIRED`, or `FREEZE_BREAK_REQUIRED`.
