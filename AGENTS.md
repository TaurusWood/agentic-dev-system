# AGENTS.md

This repository defines the Agentic Development System itself. Treat repository artifacts as authoritative; do not treat prior chat history as an implicit requirement.

## Working rules

1. Read the relevant repository documents before proposing changes.
2. Preserve the distinction between product requirements, technical design, tests, and implementation.
3. Do not silently rewrite an upstream frozen artifact to make downstream work easier.
4. If a frozen artifact appears incorrect or contradictory, stop that stage and raise a Freeze Break Request.
5. Keep changes scoped. New ideas discovered during one task go to backlog unless they block correctness.
6. Prefer explicit contracts, invariants, write scopes, validation commands, and stop conditions over broad prose instructions.
7. Prompts are execution interfaces, not sources of truth. They should reference repository artifacts and Git revisions.
8. When changing this development system, distinguish methodology changes from future tooling ideas.

## Current maturity

v0.1 is a methodology and contract baseline. Do not assume CLI automation, automatic prompt compilation, or hard enforcement exists unless the repository actually implements it.
