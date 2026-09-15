# Roadmap

This roadmap intentionally avoids freezing a detailed product/platform sequence before the methodology has been exercised on real projects.

## Now — validate the protocol

The current objective is to make the methodology runnable and collect evidence.

Established baseline:

- repository-as-truth principle;
- PRD → Technical Design → Test → Coding → CR → Integration → Final CR lifecycle;
- Product / Design / Test freeze semantics;
- vertical per-module Test / Coding / CR execution;
- Freeze Break Request;
- language-independent engineering standards;
- task-packet / handoff contract;
- stage Role Contract model;
- Human Brief / Human Discussion / Agent Handoff output protocol;
- stage prompt templates usable by manual chats or sub-agents.

Validation questions:

- Does PRD + Technical Design separation reduce product/implementation drift?
- Does vertical module slicing reduce context size and rework?
- Does TEST FREEZE prevent implementation-driven test weakening without creating excessive friction?
- Which freeze breaks are legitimate in real projects?
- Are stage Role Contracts sufficient to prevent agents from overreaching?
- Does Human Brief materially reduce cognitive load while preserving necessary decisions?
- Are Agent Handoffs sufficient for a fresh chat/agent to continue without conversational history?
- Which prompt fields repeatedly prove useful or unnecessary?

## Near-term — refine from evidence

Only after real-project runs:

- simplify or strengthen stage prompts;
- refine task packet fields;
- refine freeze/gate rules;
- improve project adoption guidance (`AGENTS.md`, standards mapping, document locations);
- add lightweight examples/case studies;
- record failure patterns and corrections.

The workflow should remain manually executable throughout this phase.

## Deferred ideas — not scheduled commitments

The following may become useful implementation mechanisms later, or may be delegated/integrated with external systems such as GitHub Spec Kit or future agent runtimes:

1. prompt generation/compiler tooling;
2. DAG engine / dependency execution;
3. CLI;
4. queue;
5. scheduler;
6. automatic worktree/branch provisioning;
7. agent RPC / cross-agent transport;
8. persistent orchestration state database;
9. automatic write-scope/freeze-diff enforcement;
10. automatic review/integration dispatch.

These are **implementation options, not current methodology requirements**.

If an existing ecosystem provides these capabilities well, prefer integration or adaptation over rebuilding them solely for this repository.

## Deferred research note — input Transform

Natural-language normalization/Transform may eventually improve intent fidelity, especially for pronouns, implicit referents, and relative instructions.

It is not part of the required workflow today. If explored, it should remain a pre-execution normalization layer and must not become a second source of truth or inject its internal reasoning into every task context.

## Non-goal for now

Do not build a multi-agent orchestration platform before the protocol itself has demonstrated value.

Success in the current phase means:

> the same documented method can be run reliably by a human using multiple chats or by an agent runtime using sub-agents, with repository artifacts carrying truth between stages.
