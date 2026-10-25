# Admin UX Design 使用指南

`admin-ux-design` 专注后台管理系统。它补充交互设计能力，不接管业务分析、技术设计或工程质量，也不是一个页面生成框架。

## 安装

安装已合入的仓库版本：

```bash
npx skills add https://github.com/TaurusWood/agentic-dev-system --skill admin-ux-design --global --agent codex --yes
```

未合入版本使用对应分支的 GitHub tree URL 作为安装源；不要误以为默认分支已包含它。继续使用原有 `agentic-development`，两者可分别安装、分别调用；后者不强制依赖前者。

## 第一次使用

在目标项目中指定业务资料与页面范围，例如：

```text
使用 admin-ux-design 改善当前后台的审核列表交互。
先读取项目已有业务资料、页面实现和已确认的交互决定。
保持业务流程与底部悬浮批量操作栏，不重做架构。
依据规则直接提出改良后的可操作原型，并同步一份简短交互合同。
原型用模拟数据，隔离于生产；未知接口和业务规则不要编造。
优先让我操作原型，只单独列出影响结果的待确认决定。
本轮不修改正式业务代码。
```

这里的底部操作栏只是示例任务约束，不是通用后台布局规定。更换成实际已确认的项目约定。

## 确认设计后

```text
依据已批准的交互合同及原型版本，进入现有 Technical Design。
先落实本次实现所需的接口、数据和模块边界，再按现有开发流程实现。
原型仅用于理解体验；其 mock、数据结构和事件代码不是技术合同。
Coding 阶段落实已经确认的交互，不重新设计一版。
```

后端尚未完成，不等于前端不能开发：接口合同已经明确时，可以用符合合同的隔离 mock。接口尚未定义时，先解决受影响的技术决定，而不是把原型的数据结构升级为接口。

## 交付物如何存放

沿用项目原有设计/迭代目录。业务文档继续是业务依据；同一份简短交互合同表达具体交互决定；原型提供可操作的体验表达；技术设计落实工程合同。不要求复制整份 PRD，不要求同时维护 Markdown 和 YAML，也不要求把所有样式写成配置。

模板与示例都在 [Skill 目录](../../skills/admin-ux-design/SKILL.md) 内。示例是虚构练习，不是任何实际项目的已批准规则。既有页面的小修改可更新现有约定并沿用验收路径，不必新建原型。

## 与现有流程的关系

`agentic-development` 继续管理阶段、权限边界、冻结和交接；本 Skill 按需提供设计知识。没有新增 UX 阶段、UX FREEZE 或强制审计。外部组件库 Skill 只辅助具体实现，不保证工程质量。

## 检查与限制

在本仓库执行：

```bash
node skills/admin-ux-design/scripts/check-package.mjs
node --test scripts/check-admin-ux-skill.test.mjs
node scripts/check-protocol-drift.mjs
```

前两项检查安装包结构、引用与回归样例结构，并验证检查器能发现故意制造的缺陷。它们不证明交互更好用。实际 Agent 行为评估见 [评估说明](../../skills/admin-ux-design/evaluations/README.md)，真实项目效果仍需操作验证。
