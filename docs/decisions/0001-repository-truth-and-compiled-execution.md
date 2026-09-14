# ADR-0001: Repository Truth and Compiled Agent Execution

## Status

Accepted for v0.1 baseline.

## Context

Repeated agentic development work exposed several failure modes:

- product intent was correctly discussed at a high level but drifted during detailed planning;
- tests sometimes froze a locally reasoned behavior that no longer matched the intended player/user path;
- implementation agents occasionally modified tests after failures, weakening the meaning of a prior “test freeze”;
- large horizontal batches (all docs, then all tests, then all code) increased attention fragmentation and made human review ineffective;
- long human-readable plans exceeded practical review bandwidth even when only a few details were actually wrong;
- starting important agent tasks through ad-hoc conversational instructions created inconsistent execution quality.

## Decision

Adopt the following foundation:

1. The repository, not chat history, is the durable source of truth.
2. Each requirement/version produces a PRD and Technical Design before implementation.
3. Technical Design slices work into bounded module tasks.
4. Test, Coding, and CR may execute vertically per module task.
5. Product, Design, and Test artifacts have explicit freeze points.
6. Downstream agents must request a freeze break rather than silently rewriting frozen upstream artifacts.
7. Agent handoffs use repository artifacts and structured task packets, not free-form chat summaries.
8. Phase prompts are generated from stable role templates plus dynamic task/repository context.
9. Prompts are control-plane execution artifacts, not a parallel source of truth.
10. A top-level orchestrator coordinates module tasks, while a separate integration/final-review layer validates the system as a whole.

## Consequences

### Positive

- Lower cross-chat drift
- Clear ownership of product/design/test changes
- Better isolation of module work
- Smaller human approval surfaces
- Easier mechanical enforcement later
- Prompts become reproducible and project-specific

### Cost

- More artifacts and handoff structure
- More total agent invocations/chats
- Potential token duplication if prompts are generated poorly
- Requires discipline around freeze revisions and task scopes

The expected optimization target is not minimum tokens per invocation. It is lower total cost per correct change, including avoided rework and repeated review cycles.

## Follow-up

Validate this model on real projects before building a large orchestration platform. Use empirical failures to refine task-packet fields, prompt templates, and freeze rules.
