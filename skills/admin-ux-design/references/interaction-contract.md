# Project interaction contract

One concise record of the **specific decisions** shared by prototype and formal implementation. The Skill alone cannot ensure two agents make the same choices.

## Authority and granularity

Reference the existing business source instead of copying its fields, rules, roles, and workflow. Preserve the project's document organization. Use one structured Markdown section or one YAML file per meaningful screen/flow; do not require a second spec system or duplicate both formats.

Record only behavior that affects the result, interaction continuity, or implementation interpretation. Avoid a serialization of every visual property, DOM node, component prop, or internal event. Small changes may update a few existing lines; no new document is required just to use this Skill.

A project contract is not a runtime configuration, code-generation schema, server state machine, or API definition. The [template](../templates/interaction-contract.yaml) is an authoring aid, not a mandatory application architecture.

## Minimum useful contents

| Concern | Record |
| --- | --- |
| Identity and scope | Screen/flow, task, business references, non-goals, existing decisions to preserve |
| Approval state | Draft versus approved; actual evidence and the precisely reviewed scope; never fabricate reviewer/date/approval |
| Interaction decisions | Stable IDs, trigger, availability, meaningful observable transitions and outcomes |
| Context | What survives and what resets on save, cancel, query change, and navigation when applicable |
| View intent | Important grouping, information hierarchy, container choice, and approved prototype references; not implementation structure |
| Capability questions | Business questions versus technical questions; affected decisions, owner, and whether they block handoff of that scope |
| Prototype boundary | Synthetic data, simulated outcomes, fake timing, omitted states, and explicit non-production status |
| Acceptance path | Concrete actions and observable expectations linked to interaction IDs |

Do not reproduce all these sections for a one-line change when the existing contract already contains them.

## Decisions and unknowns

- `draft` or `proposed` is not approved. Repetition in a chat does not upgrade it.
- Ordinary design choices can be proposed directly in the prototype and recorded together. Ask only for material unresolved choices.
- Product behavior can be approved while a technical question remains open, provided its impact is visible. This is not readiness to code the affected integration.
- An unresolved business condition must not become a guessed guard or a default field value. Mark the affected branch unresolved and do not demonstrate it as settled.
- If a proposed experience needs a capability that might not exist, record it as a requirement to resolve, not as proof of availability. Examples: cross-page selection, cancellable server jobs, recoverable deletes, per-record batch results.
- A selected path through a prototype approves only the presented interaction and disclosed decisions. Hidden mock logic and unvisited branches are not implicitly approved.

## Agreement between human and agent views

The prototype expresses visual hierarchy and observable experience; the contract expresses the agreed behavior, including non-visible decisions. Capture any essential visual choice as a view-intent note or an explicitly approved visual reference so implementation does not invent a new layout.

When the user changes an interaction in the prototype, update its corresponding decision before handoff. Show a compact decision delta, not a second long review. If the two representations disagree, reconcile them rather than automatically favoring prose or code.

Keep a human-readable design revision identifier shared by both artifacts. At handoff, record the committed artifact paths and Git revisions using the existing workflow. Do not require a file to contain its own future commit hash. A document field saying `approved` is not a replacement for the host workflow's approval/freeze evidence.

## What Coding consumes

Business source + approved interaction decisions + approved visual intent + Technical Design. The acceptance path provides an observable check, not a new independent Test stage. Risk and test mode remain with the existing development protocol.

An agent may read a prototype to understand the experience, but must not import its data model, local state, hardcoded permissions, fake endpoints, or event-handler architecture as technical truth. No YAML parser or runtime interpreter is required in the application.
