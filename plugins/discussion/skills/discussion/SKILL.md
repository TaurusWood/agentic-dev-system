---
name: discussion
description: Use when the user invokes the Discussion plugin for an engineering or product discussion, especially with :init, :judge, :new-chat, or :local. Load the canonical Web Chat Discussion Protocol from GitHub and apply the requested command without introducing a heavyweight stage workflow.
---

# Discussion Router

This skill is a thin runtime adapter. It does not contain a copy of the discussion rules.

Canonical source:

- repository: `TaurusWood/agentic-dev-system`
- path: `docs/web-chat/discussion-protocol.md`
- ref: repository default branch

Use the plugin-provided GitHub connection to read that file.

## Protocol loading

For `:init`:

1. Fetch the canonical protocol from the default branch.
2. Read and apply the complete protocol.
3. Treat it as authoritative for the remainder of the current chat unless the user requests a refresh or replacement.
4. Do not refetch it on every turn.
5. Respond concisely that the protocol is active. Include the protocol version/status and fetched GitHub blob SHA when available.
6. If a useful chat title can already be inferred, recommend it; otherwise do not force one.

For every other command:

- if the current chat has not successfully loaded the canonical protocol, load it first;
- if it is already loaded and no refresh is needed, do not fetch it again;
- then execute the requested command under that protocol.

If the GitHub source cannot be read, say that initialization failed. Do not silently fall back to an embedded or remembered copy.

## Command router

Recognize these v0.1 commands after the plugin mention.

### `:init`

Initialize the current chat with the canonical protocol.

Do not create project workflow state, Task Packets, stages, or artifacts.

### `:judge`

Judge only the next useful route for the current discussion.

Choose one canonical route from the protocol:

- `CONTINUE`
- `NEW_CHAT_CONTINUATION`
- `NEW_CHAT_BRANCH`
- `LOCAL_INVESTIGATION`
- `LOCAL_EXECUTION`
- `AGENTIC_DEV_SYSTEM_HANDOFF`
- `STOP`

Output:

```text
Recommended route: <route>

<short reason grounded in the current chat>

<next action only if one is needed>
```

Do not solve a different problem merely because `:judge` was invoked.

### `:new-chat`

Generate a compact new-chat context capsule using the canonical protocol.

If the user says `continuation` or `branch`, honor it.

Otherwise infer which one fits the current discussion. If the distinction materially changes what context must be carried and cannot be inferred reliably, ask one minimal question.

Always include a recommended title using the protocol naming convention.

Do not paste the discussion protocol into the capsule.

Do not claim that a new ChatGPT conversation was created unless the runtime actually provides and uses such an action.

### `:local`

Convert the current discussion into the smallest appropriate local-agent handoff.

First classify it as:

- `LOCAL_INVESTIGATION`;
- `LOCAL_EXECUTION`; or
- `AGENTIC_DEV_SYSTEM_HANDOFF`.

Then produce the corresponding handoff under the canonical protocol.

Do not force a formal `agentic-development` lifecycle when a bounded investigation or small execution task is sufficient.

If material product/UX/architecture uncertainty still prevents a safe handoff, say so and identify the unresolved decision instead of inventing it.

## Natural-language qualifiers

The user may add qualifiers after a command, for example:

```text
@discussion :new-chat continuation
@discussion :new-chat branch
@discussion :local investigate
@discussion :local execute
```

Treat these as routing hints, not as permission to violate the canonical protocol.

## Scope

This plugin governs the Web Chat Discussion Layer only.

Do not duplicate or rewrite the execution-stage semantics owned by the repository's `agentic-development` skill.
