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

无论人工新开 Chat，还是 Runtime 派发 Sub-agent，都让新的执行单元先使用 `agentic-development`，直接读取目标项目仓库事实。

## 3. 核心流程

```text
Requirement / finding
→ PRD / Product Discussion
→ PRODUCT FREEZE
→ Technical Design + Task Packet
→ DESIGN FREEZE
→ Module Test
→ TEST FREEZE
→ Coding
→ Module CR
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

## 7. 人工多 Chat

人工方式不需要调度器：

```text
Product Chat
→ Design Chat
→ Module A Test Chat
→ Module A Coding Chat
→ Module A CR Chat
→ ...
→ Integration Chat
→ Final CR Chat
```

每个 Chat 都从仓库与 Task Packet 重新读取事实，而不是依赖上一 Chat 的长总结。

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

先在 `pocket-railway`、`workspace-lens`、`J-Store` 等真实项目中验证：新 Chat 是否能只靠 Skill + Repository Truth + Task Packet 正确继续，Freeze 是否真正阻止越权，baseline test evidence 是否减少假绿，以及 Human Brief 是否降低人工阅读和重复 CR 成本。
