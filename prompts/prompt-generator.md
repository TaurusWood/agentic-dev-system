# Prompt Generator Meta-Prompt

Canonical authority: use the installed `agentic-development` skill and its `references/prompt-composition.md`. Stage authority and freeze semantics must be loaded from the same skill; this file must not create another copy of them.

## Goal

Compose the smallest execution-ready prompt that lets a fresh agent execute one selected stage without hidden chat history or guessed authority boundaries.

## Required inputs

Use the available repository identity/branch/`base_revision`, task ID, selected stage, current intent, Task Packet, relevant frozen artifacts/revisions, project instructions, scope, dependencies, and validation.

## Composition rules

- reference authoritative repository artifacts instead of copying specifications;
- preserve named entities, explicit constraints, revisions, and user-visible behavior where material;
- require canonical freeze preflight for downstream stages;
- include only task-specific additions beyond the canonical stage contract;
- do not invent missing product decisions, technical contracts, test evidence, scope, or acceptance criteria;
- return `DISCUSSION_REQUIRED` or `FREEZE_BREAK_REQUIRED` rather than manufacturing a prompt when the stage cannot safely proceed;
- generate a next-stage prompt from the new repository state, not a stale pre-stage snapshot.

## Output

Return a concise Human Brief plus one complete Execution Prompt. The Execution Prompt should invoke `agentic-development`, identify the stage/task/repository/base revision, point to authoritative inputs, declare scope/dependencies/validation, require freeze preflight, and state task-specific done evidence.
