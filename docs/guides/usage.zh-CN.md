# 使用手册（中文）

> Agentic Development System 当前是一套**可由人工多 Chat 或支持子 Agent 的运行时执行的软件开发协议**。它首先是一套方法论，不要求 CLI、调度器或多 Agent 平台才能使用。

English version: [`usage.en.md`](usage.en.md)

## 1. 适用场景

这套流程适用于：

- 新功能或版本迭代；
- UI / UE / 交互调整；
- Bugfix / 人工 E2E 问题；
- 重构与技术债；
- 需要多个 Agent / Chat 分阶段协作的较复杂修改。

不要求每个需求都走完整流程。任务越小，允许越轻量；但只要进入 Test / Coding / CR，就应遵守对应阶段的 Role、Freeze 和输出协议。

## 2. 最重要的原则

1. **代码和版本化文档是事实源。** Chat 历史不是事实源。
2. **PRD 负责 WHAT，Technical Design 负责 HOW。**
3. **上游 Freeze 后，下游默认只读。** 发现问题用 Freeze Break Request，不允许偷偷改。
4. **Test Freeze 后，Coding 不得为了变绿修改测试语义。**
5. **按技术任务垂直执行。** 推荐 `Test → Coding → CR` 逐模块闭环，而不是先写完所有测试再一次性写所有代码。
6. **人工只重点审核需要判断的内容。** 默认使用 Human Brief，只有真正存在权衡时才展开 Human Discussion。
7. **Prompt 是执行接口，不是事实源。** Prompt 应引用仓库事实，而不是复制一套新的需求。

## 3. 两种运行方式

### 3.1 人工多 Chat

这是当前最低依赖、推荐用于验证方法论的方式。

你可以手动创建：

```text
PRD / Product Discussion Chat
        ↓
Technical Design Chat
        ↓
Module A: Test Chat → Coding Chat → CR Chat
Module B: Test Chat → Coding Chat → CR Chat
        ↓
Integration / Top-level Coding Chat
        ↓
Final CR Chat
```

每个新 Chat 通过对应阶段 Prompt 启动，并直接读取项目仓库中的事实文档和代码。

### 3.2 子 Agent / 多线程

如果 Codex、Grok、Antigravity 或其他运行时支持子 Agent，可由一个总控 Agent 按相同协议分派任务。

**是否自动编排只是表现形式。** PRD、Technical Design、Freeze、Role Contract、测试和 Handoff 语义不应因此变化。

## 4. 多入口开发流程

不是所有工作都从“完整新需求”开始。

### 入口 A：完整需求 / 版本迭代

```text
自然语言讨论
→ PRD
→ PRODUCT FREEZE
→ Technical Design + Module Slicing
→ DESIGN FREEZE
→ 各模块 Test → TEST FREEZE → Coding → CR
→ Integration
→ Final CR
→ 人工验收
```

### 入口 B：Bugfix / 人工 E2E 问题

先确认问题是否只是实现错误，还是暴露出产品/技术合同错误。

- **实现明确违背冻结合同**：可直接进入模块 Test/Coding/CR。
- **现有 PRD/GDD 本身与真实意图冲突**：必须先修正产品合同，再 Freeze。
- **模块边界或技术设计不成立**：先回到 Technical Design。

不要因为名字叫“Bug”就默认只改代码。

### 入口 C：纯技术重构

如果用户可观察行为不变，可以弱化 PRD，但必须明确：

- 行为不变的范围；
- 技术目标；
- 模块边界；
- regression contract。

随后进入 Technical Design → Test → Coding → CR。

## 5. 哪些阶段适合自然语言 Discussion

高不确定、需要探索的阶段允许大量自然语言：

- 产品需求 / PRD；
- UE / UI / 玩家路径；
- Bug 描述、复现与归因；
- 技术方案、架构权衡；
- Freeze Break 决策。

这些阶段的目标是**把不确定性讨论掉并写回文档**。

当目标已经确定后，高频执行动作应尽量进入标准 Prompt：

- Test；
- Coding；
- Module CR；
- Integration；
- Final CR；
- 其他重复出现且职责稳定的阶段。

原则：

> **探索用 Discussion，执行用标准 Prompt。**

## 6. Prompt Generator：当前如何使用

这里的 **Prompt Generator 不是自动化工具**。

它是一种 Prompt 生成流程：

```text
你的当前意图
+ 对应阶段基础模板
+ 当前项目事实（文档 / 代码 / 分支 / Freeze）
        ↓
生成本次任务专用的高质量 Prompt
```

可直接使用 [`../../prompts/prompt-generator.md`](../../prompts/prompt-generator.md) 启动一个 Chat，让 Agent 生成下一阶段 Prompt。

### 输入示例

```text
项目：TaurusWood/pocket-railway
当前分支：fix/m1-interaction-audit
阶段：Test
模块：BUILD-01
产品事实：docs/.../prd.md @ <PRODUCT_FREEZE>
技术事实：docs/.../technical-design.md#BUILD-01 @ <DESIGN_FREEZE>
意图：为建设模式“点击城市 A → 点击城市 B → 进入路线方案比较”建立测试合同
```

Prompt Generator 应输出一份可以直接粘贴到新 Test Chat 的执行 Prompt。

### 下一步 Prompt

如果当前 Agent 已经完成某阶段，并且下一阶段所需事实已经明确，它的回答可以附带：

- Human Brief；
- Agent Handoff；
- **下一阶段建议 Prompt**。

但下一阶段 Prompt 仍然只是启动接口，最终事实必须来自仓库。

## 7. Stage Prompt 的最小结构

一份可执行 Prompt 至少要让 Agent 明确：

- Role / 当前阶段负责什么；
- Goal / 本次唯一目标；
- Authority / 哪些文档和代码有权威性；
- Read set / 必须先看什么；
- Write scope / 能改什么；
- Forbidden scope / 不能改什么；
- Dependencies / 前置任务；
- Validation / 如何证明完成；
- Stop conditions / 什么时候必须停止而不是猜；
- Output / 给人和下游 Agent 输出什么。

不要用“大量背景文字”替代这些字段。

## 8. Freeze 如何使用

### PRODUCT FREEZE

确认本轮用户可观察行为、非目标和产品边界。

### DESIGN FREEZE

确认技术模块、公共合同、术语、依赖和任务切片。

### TEST FREEZE

确认测试已经正确表达产品和技术合同。

### Freeze Break Request

下游发现冻结内容有问题时，不允许自行修订。应输出：

```text
FREEZE_BREAK_REQUIRED
Frozen artifact: ...
Observed conflict: ...
Why current stage cannot proceed safely: ...
Suggested owning stage: Product / Design / Test
Impact if changed: ...
```

经对应上游阶段审核并重新 Freeze 后再继续。

## 9. 输出协议

详见 [`../protocols/execution-contract.md`](../protocols/execution-contract.md)。

### Human Brief（默认）

给人看的最短有效输出：

- 结论；
- 能力 / 边界；
- 影响 / 风险；
- 是否需要人工决策；
- 下一步。

如果没有需要人决策的事项，不展开大量技术细节。

### Human Discussion

只有以下情况需要展开：

- 存在多个有实质差异的方案；
- 产品 / UE / 架构需要人判断；
- Freeze Break；
- 用户主动要求深入讨论。

### Agent Handoff

给下游 Agent 的结构化信息：

- task ID / status；
- authoritative paths + revisions；
- scope；
- validation；
- blockers；
- next stage。

不要用一篇“前一个 Chat 的总结”替代仓库事实。

## 10. 轻量 Learning Loop

这套方法论必须从真实项目中逐步改进，但不做自动自修改。

每次出现明显返工或漂移时，问四个问题：

1. 这是一次性的项目问题，还是可复用的流程问题？
2. 问题发生在哪一层：需求、Technical Design、Test、Coding、CR、Handoff、Human Output？
3. 当前模板缺了什么约束，或者哪条约束造成了负担？
4. 修改模板后，是否能降低下一次同类错误，而不会把系统变重？

只把**重复出现或高影响**的问题沉淀进基础模板。

详见 [`../workflow/learning-loop.md`](../workflow/learning-loop.md)。

## 11. 示例：如何继续 pocket-railway 的 7 个 E2E 问题

当前已经完成了问题发现和初步归因。下一步不要直接进入 Coding，也不要把 7 个问题一起丢给一个 Agent。

### 第一步：建立本轮修复 PRD

开一个 Product / PRD Discussion Chat。

输入：

- 当前 7 个问题；
- 已经确认的归因；
- 当前 GDD / 实际代码；
- 本轮原则：逐类垂直修复，避免 Scope 扩散。

产物不是 7 份长 PRD，而是一份轻量的迭代 PRD，例如：

```text
M1 Interaction E2E Remediation

Goal:
恢复建设/运营交互与玩家直觉和已确认产品方向的一致性。

Known slices:
- BUILD-01 城市到城市的建设规划入口
- OPS-01 Build → 运营线路编辑 Handoff
- RAIL-01 轨道升级选择语义
- ROUTE-01 候选线路命名
- ROUTE-02 候选方案 + 最终确认信息架构
- COPY-01 玩家侧铁路术语统一

Execution rule:
一次只关闭一个 slice；新发现问题先进入 backlog。
```

对每个 Slice 只要求一个短 Behavior Card 供人工确认。

### 第二步：PRODUCT FREEZE

人工重点检查：

- 玩家点什么；
- 系统显示什么；
- 下一步是什么；
- 禁止出现什么；
- 什么行为不能被这次修改破坏。

不要求人工阅读状态机、EventBus 或测试实现。

### 第三步：Technical Design

新开 Technical Design Chat，读取 PRODUCT FREEZE 和真实代码。

它负责：

- 验证 6 个 slice 的模块边界；
- 明确每个 slice 涉及的 owner / public contract；
- 标记跨模块依赖；
- 生成每个 slice 独立可执行的技术任务；
- 禁止在这里重新修改产品行为。

然后 DESIGN FREEZE。

### 第四步：只执行第一个 Slice

建议先从 **BUILD-01：建设模式城市 A → 城市 B 直接规划** 开始，因为它是建设主路径的基础语义。

按顺序：

```text
BUILD-01 Test Chat
→ Test CR / TEST FREEZE
→ BUILD-01 Coding Chat
→ BUILD-01 Module CR
→ 人工 E2E 点击验收
→ CLOSE BUILD-01
```

如果通过，再进入下一个 Slice。

### 第五步：全部 Slice 完成后 Integration / Final CR

最后再统一检查：

- 完整玩家路径；
- terminology；
- 跨 Slice state transition；
- regression；
- 是否出现某个修复破坏另一个修复。

## 12. 最小日常操作清单

当你准备开始一个重要任务时：

```text
1. 判断入口：需求 / Bug / 重构？
2. Discussion 把不确定性讨论清楚并写回文档。
3. Freeze 当前上游事实。
4. 用对应阶段基础模板 + 项目事实生成本次 Prompt。
5. 新 Chat / 子 Agent 只执行一个明确阶段或模块。
6. 默认看 Human Brief；只有需要决策再看 Discussion。
7. 下游靠仓库 + Agent Handoff 继续，不靠上一 Chat 的长总结。
8. 出现流程性失败时再更新基础模板。
```

如果这八步能稳定执行，这套方法论就已经发挥作用；不需要先建设任何复杂的多 Agent 平台。
