# Prompt Generation — Explanation

> **Normative composition semantics:** [`../../skills/agentic-development/references/prompt-composition.md`](../../skills/agentic-development/references/prompt-composition.md). Root prompt files are launch adapters, not independent contracts.

## Purpose

Compose a bounded execution prompt from current intent, canonical stage authority, repository truth, and current task/freeze context.

```text
current intent
+ canonical stage contract
+ repository / base revision
+ authoritative Product / Design / Test artifacts
+ Task Packet / scope / dependencies / validation
        ↓
execution prompt
```

## Required fields

A stable execution prompt normally identifies:

- stage and task ID;
- repository / branch/worktree / `base_revision`;
- authoritative paths and freeze revisions;
- minimal required reading;
- write / forbidden scope;
- dependencies;
- required freeze preflight;
- validation;
- canonical stop conditions plus task-specific blockers;
- output profile and task-specific completion evidence.

Do not paste a second PRD or Technical Design into the prompt.

## Role semantics

The prompt **references** the canonical Role Contract from the installed Skill. It does not restate `Owns / May change / Must preserve / Must not do / Must stop when / Done when` as another independently editable copy.

## Discussion vs execution

Use natural-language Discussion when uncertainty itself is the work: product intent, UX, root-cause classification, architecture trade-offs, and freeze-break decisions.

Once intent is stable, use standardized launch prompts for Test, Coding, Module CR, Integration, and Final CR.

## Fresh-state rule

A next-stage prompt is generated from the new repository state and latest Task Packet/freezes. Do not reuse a prompt created before the preceding stage completed.
