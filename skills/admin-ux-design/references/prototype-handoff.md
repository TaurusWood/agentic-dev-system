# Prototype isolation and implementation handoff

## Two different activities

**Exploration prototype:** validates an experience while APIs, data models, or module boundaries may be unsettled. Code is disposable by default. Mark it non-production. Mock convenience does not establish technical authority.

**Formal component development with mocks:** uses explicit component/data/API contracts and production engineering standards; only external dependencies are simulated. It may become production code. Do not confuse a defined-but-unimplemented API with an undefined API.

An exploration prototype does not become formal code merely because both use React or the user likes the screen. Any proposed reuse must be explicitly scoped through Technical Design, with fake behavior removed and normal engineering checks. The default remains to implement from the contracts.

Source: S12 in [Sources](sources.md) supports separating prototype and production quality requirements. The dependency and promotion boundaries here are project policy.

## Build the smallest useful prototype

Use the project's existing prototype tool or a simple isolated HTML/React preview. No mandated Figma, Storybook, wrapper library, or new dependencies. Reuse existing visual conventions. Use an existing runnable page for a bounded improvement when a separate prototype adds no value.

Demonstrate the relevant normal path and consequential alternatives. Expose deterministic scenario controls for simulated failure/pending/empty states when useful, outside the product UI. Do not invent business features to demonstrate an edge case. Record states not demonstrated and why.

Use clearly synthetic, non-sensitive representative content, including realistic long values when layout depends on them. Never upload production data to an external design service without authorization.

## Isolation rules

1. Locate prototype code, fixtures, and simulation controls outside production entry points, build inputs, and deploy artifacts using the project's actual build structure. A directory name alone is not an isolation guarantee; account for public/static copying and catch-all routing.
2. Production modules must not import prototype modules or fixtures, directly or through barrel exports. One-way reuse of existing production components in a preview is allowed.
3. Do not connect exploration controls to live writes or real credentials. Do not simulate success on an actual failed request.
4. Clearly distinguish simulated outcomes, timings, permissions, and data shapes from known project facts. Unknown API contracts remain unknown.
5. Keep a launch path, reset/scenario instructions, design revision, and simulation limits. Do not claim browser validation from a screenshot or syntax check alone.

These are required design/engineering boundaries, not a claim that this Skill automatically enforces a project's build graph. Use the project's existing build/import checks where available; request a small targeted guard only for an evidenced risk.

## Handoff to the existing development workflow

Pass:
- approved business/interaction/visual artifacts and their revisions;
- relevant interaction IDs and the focused acceptance path;
- explicit technical capability questions and their affected scope;
- prototype-only artifacts excluded from production authority and dependencies;
- observed prototype evidence and unverified states.

Do not create a new UX freeze or duplicate Task Packet format. With `agentic-development`, place these inputs into its existing artifacts and handoff. Without it, give the receiving engineer these same facts without inventing an orchestrator.

Technical Design establishes or verifies API/data contracts, state ownership, component boundaries, server enforcement, and validation appropriate to risk. An open technical dependency blocks its affected implementation, not every unrelated task. A material change to approved behavior returns to its owning product decision; Coding does not silently adapt the product to whatever the API happens to return.

## Formal implementation

Use the actual codebase, approved interaction contract, and technical contracts. Preserve existing sound architecture; do not require a rewrite or generic CRUD layer. Library API skills can help with installed-version correctness but cannot guarantee engineering quality.

Use contract-conforming mocks only behind an explicit test/development boundary. Production code must not silently fall back to them. Verify production paths do not package simulation controls, fixtures, or prototype dependencies.

Use the same interaction IDs to exercise relevant behavior in the formal UI. Check the user-visible result, not the number of matching lines of prototype code. Keep the established risk-based testing approach; do not add a test for every visual element.

## Human acceptance

Prefer a short runnable task sequence: complete the ordinary task, exercise a consequential failure, and return to the working context. The exact scope depends on the change. Use screenshots for appearance, DOM/state evidence for deterministic checks, and focused interaction for behavior. Never substitute screenshot similarity for functional correctness or call a manual walk-through an independent agent evaluation.
