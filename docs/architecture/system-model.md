# System Model

## 1. Principle

The repository is the durable system of record. Chats and agents are disposable execution environments.

A chat may reason about the project, but a decision is not authoritative until it is represented by a versioned repository artifact or code change.

This prevents long-running agent workflows from depending on fragile conversational memory.

## 2. Two kinds of truth

### Current State Truth
What the system does now. Primary evidence:

- production code
- configuration
- schemas
- tests
- generated/runtime evidence where applicable

### Target State Truth
What the current requirement/version intends the system to become. Primary evidence:

- approved PRD
- approved technical design
- module task contracts
- frozen test contract

A mismatch between current and target truth is normal during implementation; it is the work to be completed, not a reason for an agent to reinterpret either side.

## 3. Three-plane architecture

### Truth Plane
Versioned artifacts that define current and target state:

- code
- PRD
- technical design
- standards
- task contracts
- tests
- Git revisions / freeze points

### Control Plane
Mechanisms that decide what an agent may do and what context it receives:

- task DAG / orchestration
- module ownership
- task packets
- prompt generation
- freeze gates
- write scopes
- dependency status
- stop / escalation policy

### Execution Plane
Short-lived agents or chats that execute one bounded role:

- PRD agent
- technical-design agent
- test agent
- coding agent
- module CR agent
- integration agent
- final CR agent

The number of chats is an implementation detail. Role boundaries and artifacts are the durable design.

## 4. Communication model

Sub-agents should not pass project truth to one another through free-form summaries.

Preferred model:

```text
                Repository
               /    |     \
              /     |      \
          Test    Coding    CR
            \       |      /
             \      |     /
               Orchestrator
```

Each agent independently reads the frozen artifacts relevant to its task. It reports only structured execution state to the orchestrator, such as:

- DONE
- BLOCKED
- FAILED
- FREEZE_BREAK_REQUIRED
- DEPENDENCY_REQUIRED

This reduces telephone-game drift.

## 5. Human responsibility

Human review should be concentrated where judgment cannot be delegated safely:

- product intent
- player/user-visible behavior
- trade-offs with material business or UX consequences
- approval of freeze-breaking changes

Humans should not be forced to manually reconstruct large state machines or architecture from long prose merely to approve a product behavior. Product-facing approval surfaces should therefore be compressed and concrete.

## 6. Prompt position in the architecture

Prompts are part of the Control Plane.

They define:

- role
- task objective
- artifacts to read
- authority boundaries
- write scope
- validation method
- stop conditions
- escalation behavior

They must not become a parallel copy of the PRD or technical design. A good prompt points to authoritative artifacts and injects only the task-specific context needed to execute correctly.
