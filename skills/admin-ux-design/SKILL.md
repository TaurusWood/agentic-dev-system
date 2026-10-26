---
name: admin-ux-design
description: Design or improve interactions for admin systems, internal tools, and operational consoles (后台管理). Use for admin lists, filtering, editing, review queues, bulk actions, feedback, contextual navigation, interactive prototypes, and their implementation handoff. Produces project-specific interaction decisions, not a generic visual redesign or a CRUD generator. During coding, apply approved decisions without redesigning them.
license: MIT
compatibility: Works with existing project documents and any frontend stack. A browser or preview tool is optional; never claim interactive verification without actually running it.
metadata:
  version: "0.1.0"
  source: "TaurusWood/agentic-dev-system"
---

# Admin UX Design

Turn known business intent into usable admin interactions. Reuse **approved decisions**, not disposable prototype code.

## Scope and ownership

Use for administration, record management, configuration, and operational workflows. Not for marketing sites, consumer-app branding, business-rule discovery, backend architecture, or automatically generating an application from a schema.

This is a design capability, not a lifecycle controller. When `agentic-development` is active, its canonical stage authority, approval, freeze, risk-based verification, and handoff rules remain authoritative. Do not add a UX stage, UX freeze, or mandatory audit. When used alone, request explicit approval of the scoped design before presenting it as approved; do not invent a freeze protocol.

Existing business rules and approved project interactions constrain the design. This Skill supplies defaults only where decisions are open. If approved artifacts conflict, surface the conflict; do not select the easiest artifact or silently redesign during implementation.

## Load only what this task needs

| Task | Read |
| --- | --- |
| New or improved admin interaction | [Principles](references/principles.md), then only applicable sections of [Patterns](references/patterns.md) |
| Capture decisions or revise a prototype | [Interaction contract](references/interaction-contract.md) and [Prototype and handoff](references/prototype-handoff.md) |
| Implement an already approved design | The project's approved contract and technical design, then [Prototype and handoff](references/prototype-handoff.md); consult patterns only for gaps |
| Need an unfamiliar pattern or resolve conflicting advice | [Sources](references/sources.md); verify the relevant primary source, not an entire library |
| Need an example | [Fictional review-list exercise](examples/review-list.md) |

Do not load every reference, generate a design system, or produce an audit report by default.

## Work from the current state

1. Read project instructions, relevant business material, existing pages/components, and prior approved decisions. Reuse terminology, shell, tokens, component library, and current dependency versions. Do not restart discovery or translate the whole PRD into YAML.
2. Identify the concrete operator task, working context, repeated operations, and the interaction decision that needs improvement. Infer only low-risk presentation choices from evidence. Unknown eligibility, permissions, irreversible effects, or batch semantics are not presentation defaults.
3. Select the smallest matching pattern. Make ordinary UX choices and show them directly; ask only when an unresolved material decision changes business behavior, established interaction, or a consequential outcome. Group necessary questions. Continue independent, non-blocked design work.
4. Create or update a runnable prototype when interaction needs exploration. Keep it isolated and label all simulated behavior. Let the user operate the design rather than requiring a long specification review. For a small already-understood change, reuse the current acceptance path instead of building another prototype.
5. Maintain one concise project interaction contract alongside the prototype. Record non-obvious behavior, decision status, relevant states, and capability questions. Use the [YAML template](templates/interaction-contract.yaml) only if helpful; an existing structured document is equally valid. Do not maintain duplicate YAML and prose specifications.
6. Before handoff, reconcile the contract and prototype, surface important non-visible decisions, and record the actual approval scope. A working demo, silence, and AI-generated text are not approval evidence.
7. Handoff approved behavior and visual intent to Technical Design/Coding. The formal implementation is based on the business, interaction, and technical contracts, not an HTML-to-React translation or automatic promotion of prototype code.

## Non-negotiable boundaries

- Never invent business fields, permissions, transition rules, or backend capabilities to make a screen complete.
- Never present a fake success, guessed count, simulated permission, or invented progress as a real result.
- Prototype data shapes, local state, request timing, and mock endpoints are not technical contracts.
- Production must not import prototype modules, fixtures, or simulation controls. Reusing existing production components in a prototype is allowed; the dependency does not reverse.
- An API can be defined but not implemented, or not defined at all. Contract-conforming mocks may support formal development in the first case. In the second, defer the affected integration decision; do not promote the mock to the missing API definition.
- Do not select inline editing, a drawer, a dialog, or a page by field count alone. Do not impose a fixed table wrapper, new CRUD framework, or universal state library.
- Preserve approved project patterns, including a bottom floating bulk bar. Source guidance is not permission to replace them.
- Do not add undo, autosave, cross-page selection, partial-success handling, mobile layouts, shortcuts, or approval flows as new product features without authorization.
- Verify implementation APIs against the installed versions and documented compatibility; do not infer compatibility from matching major numbers. Optional library skills, such as `ant-design/antd-skill`, help implementation, not design authority or guaranteed quality.

## Deliver only the useful delta

For design: prototype location and how to exercise it; the few important changes; material open decisions and simulation limits; authoritative contract location. The user does not need to approve the same interaction again in a long document.

For implementation handoff: approved artifact paths/revisions, interaction IDs, relevant examples, technical dependencies, excluded prototype artifacts, and a focused acceptance path. Use the host workflow's existing handoff format.

Report what was actually inspected or executed. Static package checks and regression prompts do not prove UX quality, production correctness, accessibility compliance, or user approval.
