# System Model

## 1. Principle

The repository is the durable system of record. Chats and agents are disposable execution environments.

A chat may reason about the project, but a decision is not authoritative until it is represented by a versioned repository artifact or code change.

This keeps the workflow independent from one model, one chat product, or one orchestration runtime.

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
- approved Technical Design
- module task contracts
- frozen test contract

A mismatch between current and target truth is normal during implementation; it is the work to be completed, not a reason for an agent to reinterpret either side.

## 3. Three conceptual planes

These planes describe responsibility. They do not imply that a platform, daemon, scheduler, or database must exist.

### Truth Plane
Versioned artifacts that define current and target state:

- code
- PRD
- Technical Design
- standards
- task contracts
- tests
- Git revisions / freeze points

### Control Plane
The protocol that decides what an execution agent may do and what it must read:

- stage Role Contract
- task/module scope
- task packet
- prompt composition
- freeze gates
- write/read boundaries
- dependency declarations
- stop / escalation policy
- output contract

Today these controls may be applied manually through prompts and repository documents. They may be automated later without changing their semantics.

### Execution Plane
Short-lived chats or agents that execute one bounded role:

- PRD agent
- technical-design agent
- test agent
- coding agent
- module CR agent
- integration/top-level coding agent
- final CR agent

The number of chats is an implementation detail. A single runtime with sub-agents and a human manually opening multiple chats are both valid executions of the same protocol.

## 4. Communication model

Agents should exchange project truth through the repository rather than free-form retellings.

Preferred model:

```text
                   Repository
              /        |        \
             /         |         \
         Test        Coding       CR
             \         |         /
              \        |        /
              human or agent coordinator
```

Each stage reads authoritative artifacts directly. Inter-stage communication should contain only the small amount of execution metadata not already represented in those artifacts, for example:

- task ID
- status
- freeze revision
- validation result
- blocker
- next stage

This reduces telephone-game drift and duplicated context.

## 5. Human responsibility

Human review should be concentrated where judgment cannot be delegated safely:

- product intent
- user/player-visible behavior
- trade-offs with material business, UX, architecture, or risk consequences
- approval of freeze-breaking changes
- focused final acceptance

Humans should not be forced to reconstruct large state machines or implementation detail from long prose merely to approve a product behavior.

The default human-facing projection should therefore be concise. Detailed discussion is reserved for genuine decisions, unresolved trade-offs, or explicit requests.

## 6. Prompt position

Prompts are part of the Control Plane.

They define how one bounded execution should consume repository truth:

- Role Contract
- task objective
- artifacts to read
- authority boundaries
- write scope
- validation method
- stop conditions
- escalation behavior
- requested output projection

They must not become a parallel copy of the PRD or Technical Design.

## 7. Current boundary

The current project validates **development protocol**, not orchestration infrastructure.

No current methodology requirement depends on:

- a DAG engine
- CLI tooling
- a queue
- a scheduler
- automatic worktrees
- agent RPC
- a state database

Those are potential future implementation mechanisms. The protocol must remain usable before they exist.
