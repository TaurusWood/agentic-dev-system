# Roadmap

This roadmap intentionally keeps the near-term scope small. The methodology must first prove that it improves real software delivery before the project commits to orchestration infrastructure.

## Now — validate and refine the method

Current objective:

> run the documented workflow on real projects, measure where intent still drifts or humans still receive too much information, and refine the protocol/templates from evidence.

Established baseline:

- repository-as-truth principle;
- PRD → Technical Design → Test → Coding → CR → Integration → Final CR lifecycle;
- Product / Design / Test freeze semantics;
- bounded task execution with compatible Test batching, READY-set scheduling, safe worktree fan-out, dependency waves, and isolated Coding / Module CR contexts;
- Freeze Break Request;
- language-independent engineering standards;
- task-packet / handoff contract;
- stage Role Contract model;
- Human Brief / Human Discussion / Agent Handoff output protocol;
- stage prompt templates usable by manual chats or sub-agents;
- Prompt Generator as a composition method/meta-prompt;
- bilingual usage guides;
- lightweight learning loop for improving templates from real failures.

Validation questions:

- Does PRD + Technical Design separation reduce product/implementation drift?
- Does vertical module slicing reduce context size and rework?
- Does TEST FREEZE prevent implementation-driven test weakening without excessive friction?
- Which freeze breaks are legitimate?
- Are stage Role Contracts sufficient to prevent overreach?
- Does Human Brief materially reduce cognitive load while preserving necessary decisions?
- Can a fresh execution context continue from repository truth + Agent Handoff without conversational history?
- Can runtime-native delegation remove routine human orchestration without weakening Coding/Review independence?
- Does READY-set + worktree fan-out materially reduce wall-clock time on real multi-task iterations?
- Which conflict classes correctly force serialization, and where are we still being too conservative or too aggressive?
- When does Test batching reduce overhead without introducing cross-task coupling?
- Do standardized prompts improve high-frequency execution compared with ad-hoc natural-language commands?
- Which prompt fields repeatedly prove useful or unnecessary?

## Near term — improve from evidence

Based on real-project runs:

- simplify or strengthen stage prompts;
- refine task packet fields;
- refine freeze/gate rules;
- validate coordinator auto-continuation with runtime-native isolated sub-agents;
- validate READY-set calculation and runtime-native worktree fan-out on real projects;
- refine serialization/conflict rules from merge, shared-state, and resource-pressure evidence;
- refine Test batching and dependency-wave rules from observed coupling/failure cases;
- improve project-adoption guidance;
- add small examples/case studies;
- promote repeated/high-impact lessons into the base templates.

The workflow must remain fully usable through manual multi-chat execution as a fallback.

## Long-term direction — richer orchestration infrastructure

Runtime-native multi-agent execution is already a supported and preferred mode when the host provides isolated sub-agents. Building a **custom orchestration platform** remains a long-term option, not the current implementation goal.

If native runtime capabilities eventually become insufficient, the protocol may serve as the contract layer for richer coordination of dependency graphs, worktrees, validation, integration, and final review.

That infrastructure does not need to be built from scratch here. Prefer adapting or integrating existing coding-agent runtimes or orchestration frameworks when they satisfy the protocol.

The key principle is:

> **automation should implement a validated protocol, not define the protocol retroactively.**

## Deferred implementation mechanisms — no schedule

Possible future mechanisms include:

1. prompt composition automation / compiler;
2. DAG engine / dependency execution;
3. CLI;
4. queue;
5. scheduler;
6. custom automatic worktree/branch manager beyond runtime-native capabilities;
7. agent RPC / cross-agent transport;
8. persistent orchestration state database;
9. automatic write-scope / freeze-diff enforcement;
10. automatic review and integration dispatch.

These are implementation options, not methodology requirements.

If an existing ecosystem already provides them well, prefer integration/adaptation over rebuilding infrastructure solely for this repository.

## Deferred option — input Transform

A standalone natural-language Transform/Normalize layer is not currently needed if Prompt Generation reliably combines user intent with stage templates and repository truth.

Revisit it only when real use shows recurring ambiguity that Prompt Generation cannot handle cleanly, especially across multiple entry paths or external inputs.

If later introduced, it must remain a pre-execution normalization step and must not become a second source of truth.

## Success criterion for the current phase

The current phase succeeds when:

> the same documented method can be run reliably by a human using multiple chats or by an agent runtime using sub-agents, while repository artifacts preserve intent across stages and the base prompts improve through lightweight evidence-driven learning.
