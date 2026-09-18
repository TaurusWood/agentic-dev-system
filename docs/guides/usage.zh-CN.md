# 使用手册（中文）

> Agentic Development System 是一套可由人工多 Chat 或支持子 Agent 的运行时执行的软件开发协议。当前重点是验证协议，而不是建设调度平台。

English version: [`usage.en.md`](usage.en.md)

## 1. 先理解一件事：只有一套运行时协议

运行时规范只由以下文件定义：

- `skills/agentic-development/references/workflow.md`
- `skills/agentic-development/references/stage-contracts.md`
- `skills/agentic-development/references/freeze-output.md`
- `skills/agentic-development/references/prompt-composition.md`

`prompts/*` 只是启动适配器，不再复制 Role Contract。`docs/*` 用于解释。出现冲突时，以 Skill references 为准，并修正文档。

这避免了“方法论本身拥有多套事实源”。

## 2. 安装与使用

```bash
npx skills add https://github.com/TaurusWood/agentic-dev-system --skill agentic-development
```

无论人工新开 Chat，还是 Runtime 派发 Sub-agent，都让新的执行单元先使用 `agentic-development`，直接读取目标项目仓库事实。Runtime 已支持隔离 Sub-agent 时，优先由 Coordinator 自动续跑；人工新开 Chat 是兼容降级路径。

## 3. 核心流程

```text
Requirement / finding
→ PRD / Product Discussion
→ PRODUCT FREEZE
→ Technical Design + Task Packet
→ DESIGN FREEZE
→ 对一个或多个 Ready Task 进行 Test 准备
→ 每个 Task 独立 TEST FREEZE
→ Coding → 独立新上下文 Module CR，按依赖波次执行
→ Integration
→ Final CR
→ Focused Human Acceptance
```

任务可以从更后面的阶段进入；关键是进入“最早仍拥有未解决事实”的阶段。

## 4. Freeze 的实际含义

Freeze 不是一句“已冻结”。必须满足：

1. 对应阶段要求的审核/批准已完成；
2. Artifact 已存在于 committed Git revision；
3. 路径和 freeze revision 已写入 Task Packet / Handoff；
4. 该阶段要求的证据已经记录。

因此 `ready to freeze`、`proposed freeze` 和未提交 working tree 都不属于正式 Freeze。

下游在写入前必须检查 frozen paths 是否仍与记录 revision 一致；发现不明变化时停止，而不是自行选择“旧版本还是当前版本”。

## 5. TEST FREEZE 不只防止改测试

对于新增行为或 Bug regression，如果目标行为按定义在 `baseline_revision` 上尚未正确存在，应在 TEST FREEZE 前验证相关测试：

- 在 baseline 上运行；
- 因预期语义原因失败；
- 将该证据写入 Task Packet。

如果 baseline 已经 GREEN，不强行制造 RED，而是说明为什么仍然是有效测试合同。

这用于防止“测试从一开始就太弱，但 Coding/CR 全绿”的假绿。

## 6. Task Packet

Technical Design 创建初始 Task Packet，至少固定：

- repository / branch / `base_revision`；
- Product / Design contract revisions；
- task scope / dependencies；
- write / forbidden scope；
- validation；
- stop conditions。

Test 阶段只拥有其中 `test_contract` 和 test evidence，直到 TEST FREEZE。Coordinator 可以改 phase/status/result revision 等执行状态，但不能偷偷改 frozen contract 字段。

## 7. Runtime 原生编排与人工降级

Runtime 已提供隔离 Sub-agent / Thread 时，默认由一个 Coordinator 在常规阶段之间自动续跑。兼容的 Test Task 可以在同一个 Test 上下文中批处理，但每个 Task 仍独立维护 Task Packet、test evidence 和 TEST FREEZE revision。

Coding 与 Module CR 必须使用不同的执行上下文；不要通过 resume/continue 复用 Coding Agent 的推理 transcript 来充当独立审查。没有依赖关系的 Ready Task 可以并行；存在依赖的 Task 按 dependency graph 分波次执行。

Runtime 无法安全 delegation 时，再降级为人工方式：

```text
Product Chat
→ Design Chat
→ Test Chat / compatible Test batch
→ Coding Chat
→ 独立新上下文 Module CR Chat
→ ...
→ Integration Chat
→ Final CR Chat
```

每个执行上下文都从仓库与 Task Packet 重新读取事实，而不是依赖上一 Chat 的长总结。

## 8. Prompt Generator

Prompt Generator 当前仍然是 composition practice：

```text
当前意图
+ canonical stage contract
+ repository truth
+ Task Packet / Freeze Context
→ 本次 execution prompt
```

根目录 `prompts/*` 只补充任务启动形状，不拥有新的 Role/Freeze 定义。

原则仍然是：

> Explore with Discussion; execute with standardized prompts.

## 9. 输出

默认给人的是 Human Brief：结论、能力/边界、material risk、需要人工决策的事项、下一步。

只有产品/UX/架构 trade-off、Freeze Break、证据不足或用户主动要求时，展开 Human Discussion。

Agent Handoff 只传执行元数据：revision、authority、scope、freeze integrity、validation、blocker、next stage；大段事实继续留在 repository。

## 10. 当前不做什么

当前不因为未来自动化目标而提前建设 DAG engine、scheduler、queue、worktree manager、Agent RPC、state database 或大型 Prompt Compiler。

先在 `pocket-railway`、`workspace-lens`、`J-Store` 等真实项目中验证：新的执行上下文是否能只靠 Skill + Repository Truth + Task Packet 正确继续，Freeze 是否真正阻止越权，baseline test evidence 是否减少假绿，Runtime 原生 delegation 是否能减少人工调度，以及 Human Brief 是否降低人工阅读和重复 CR 成本。
