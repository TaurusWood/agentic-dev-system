# Agentic Development System

**English** · [简体中文](README.zh-CN.md)

A small set of **independent capabilities** for working with AI on software projects. Choose the tool for the task; this repository does not require a custom orchestrator, application framework, or new project layout.

## Choose a capability

| Your task | Use | What it provides |
| --- | --- | --- |
| Build a feature, fix a bug, refactor safely, or continue work across agents | [`agentic-development`](skills/agentic-development/SKILL.md) · Agent Skill | Repository-grounded task routing, scoped contracts, risk-based verification, independent review, and handoffs |
| Design or improve an **admin/back-office** workflow before coding | [`admin-ux-design`](skills/admin-ux-design/SKILL.md) · Agent Skill | Reusable interaction patterns, an isolated interactive prototype, and a concise approved interaction contract |
| Explore product/technical decisions in ChatGPT and decide when to hand off | [Discussion](plugins/discussion/plugin.json) · **ChatGPT plugin** | Discussion continuity, route judgment, new-chat context, and local-agent handoff |

The two **Agent Skills are independently installable**. Discussion is a separate ChatGPT plugin package, **not** a Skill installed with `npx skills add`; see its [protocol](docs/web-chat/discussion-protocol.md).

## Install

Choose interactively:

```bash
npx skills add TaurusWood/agentic-dev-system
```

Or install either Skill globally for Codex (run both commands if you want both):

```bash
npx skills add TaurusWood/agentic-dev-system -s agentic-development -g -a codex -y
npx skills add TaurusWood/agentic-dev-system -s admin-ux-design -g -a codex -y
```

`-g` installs for your user across projects; omit it for a project-local installation. `-a codex` targets Codex; `-y` skips confirmation prompts. Other supported agents can be selected using the Skills CLI.

## Start using it

**Development** — describe the task normally; optional `feat:`, `fix:`, and `refactor:` prefixes clarify intent without bypassing repository evidence or stage contracts:

```text
feat: Add bulk enable/disable to merchant rules. Use agentic-development.
fix: Saving a rule changes a manually confirmed transaction. Reproduce and fix the owning code.
refactor: Separate rule eligibility from impact planning without changing behavior.
```

**Admin UX** — use before implementation when the interaction still needs decisions:

```text
Use admin-ux-design to improve the existing review-list workflow.
Preserve approved business rules; create an isolated, interactive prototype
and a short interaction contract. Do not change production code.
```

**Discussion** — with the ChatGPT plugin connected, invoke `@discussion :init`, then `@discussion :judge`, `@discussion :new-chat`, or `@discussion :local` when useful.

When used together, `admin-ux-design` informs the **existing Product/PRD work** within `agentic-development`; it does not add a UX stage or freeze. Coding follows the approved interaction decisions **plus technical contracts**, not disposable prototype code or mock data.

## Guides and source of truth

- **Development:** [English guide](docs/guides/usage.en.md) · [中文指南](docs/guides/usage.zh-CN.md) · [canonical workflow](skills/agentic-development/references/workflow.md)
- **Admin interaction design:** [中文使用指南](docs/guides/admin-ux-design.zh-CN.md) · [Skill rules and references](skills/admin-ux-design/SKILL.md)
- **Discussion:** [Plugin package](plugins/discussion/plugin.json) · [canonical discussion protocol](docs/web-chat/discussion-protocol.md)
- **Engineering / contributors:** [Engineering standards](docs/standards/README.md) · [Repository instructions](AGENTS.md)

The Skills and their references own their respective rules. The README is a **capability index**, not another copy of the workflow or UX contracts.
