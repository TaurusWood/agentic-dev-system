# Agentic Development System

[English](README.md) · **简体中文**

一个面向 AI 辅助软件开发的**多能力仓库**。根据任务选择需要的 Skill 或插件；无需额外搭建调度平台、应用框架或强制采用新的项目目录。

## 该选择哪项能力？

| 使用场景 | 选择 | 解决什么问题 |
| --- | --- | --- |
| 新功能、Bug 修复、保持行为不变的重构，以及跨 Agent / 会话继续开发 | [`agentic-development`](skills/agentic-development/SKILL.md) · Agent Skill | 基于项目事实分流任务、约束职责和改动范围、按风险验证、独立 CR、冻结与交接 |
| 开发前设计或改进**后台管理系统**的交互 | [`admin-ux-design`](skills/admin-ux-design/SKILL.md) · Agent Skill | 复用成熟交互模式，制作隔离的可操作原型，沉淀简短且经过确认的交互合同 |
| 在 ChatGPT 中讨论产品或技术决策，判断是否继续讨论、切换对话或交给本地 Agent | [Discussion](plugins/discussion/plugin.json) · **ChatGPT 插件** | 讨论连续性、路径判断、新对话上下文与本地任务交接 |

两项 **Agent Skill 可独立安装**，无需同时使用。Discussion 是单独的 ChatGPT 插件包，**不能通过 `npx skills add` 安装**；具体行为参见[讨论协议](docs/web-chat/discussion-protocol.md)。

## 安装

交互式选择需要的 Skill：

```bash
npx skills add TaurusWood/agentic-dev-system
```

或直接为 Codex 全局安装指定 Skill（需要两项就分别执行）：

```bash
npx skills add TaurusWood/agentic-dev-system -s agentic-development -g -a codex -y
npx skills add TaurusWood/agentic-dev-system -s admin-ux-design -g -a codex -y
```

`-g` 表示当前用户跨项目全局安装；省略则为项目级安装。`-a codex` 指定 Codex，`-y` 跳过确认；其他受支持的 Agent 可通过 CLI 选择。

## 如何开始

**软件开发**：直接描述需求即可。可选的 `feat:`、`fix:`、`refactor:` 前缀帮助识别意图，不会覆盖项目事实和阶段职责：

```text
feat: 给商户规则新增批量启用/禁用。使用 agentic-development。
fix: 保存规则会改动人工确认的交易。复现问题并在正确的模块最小修复。
refactor: 分离规则适用性判断与影响计划，不改变已有行为。
```

**后台交互设计**：在交互尚待确认、但业务约束已经明确时调用：

```text
使用 admin-ux-design 改进现有审核列表的交互。
保留已确认的业务规则，生成隔离的可操作原型与简短交互合同。
本轮不修改正式业务代码。
```

**ChatGPT 讨论**：安装并连接 Discussion 插件后，使用 `@discussion :init`；按需调用 `@discussion :judge`、`@discussion :new-chat` 或 `@discussion :local`。

两个 Skill 可协同：`admin-ux-design` 在 `agentic-development` **现有的 Product/PRD 职责范围内**提供设计能力，不新增 UX 阶段或冻结。正式 Coding 依据**已确认交互决定和技术合同**，不继承原型里的临时代码、模拟数据或假接口。

## 详细指南与权威来源

- **软件开发：** [中文使用手册](docs/guides/usage.zh-CN.md) · [English guide](docs/guides/usage.en.md) · [运行时工作流规范](skills/agentic-development/references/workflow.md)
- **后台 UX：** [中文使用指南](docs/guides/admin-ux-design.zh-CN.md) · [Skill 规则及引用](skills/admin-ux-design/SKILL.md)
- **Discussion：** [插件包](plugins/discussion/plugin.json) · [讨论协议](docs/web-chat/discussion-protocol.md)
- **工程与贡献：** [工程规范](docs/standards/README.md) · [仓库协作说明](AGENTS.md)

各 Skill 及其 references 保持各自领域的权威规则。README 只负责**能力导航与快速上手**，不复制另一份流程或交互规范。
