# CLAUDE.md

## 项目

Ant Design Pro — 基于 Umi Max v4、antd v6、ProComponents v3 的 React 企业级脚手架。

## 命令

`npm start`（开发 + Mock）、`npm run dev`（无 Mock）、`npm run build`（utoopack）、`npm run lint`（Biome + tsc）、`npm run test`（Jest）、`npx antd lint ./src`（antd 专属检查）。

其他：`npm run openapi`（重新生成 `src/services/`）、`npm run simple`（**不可逆** — 先提交）、`npm run biome`（自动修复）、`npm run tsc`（仅类型检查）。

## 关键规则

- **切勿编辑 `src/services/ant-design-pro/`** — 自动生成，通过 `npm run openapi` 重新生成
- **仅用 Biome** — 无 ESLint、无 Prettier。提交前必须同时通过 `npm run lint` 和 `npx antd lint ./src`
- **编写 antd 代码前始终执行 `npx antd info <组件>`** — 不要凭记忆猜测 API
- **`npm run simple` 不可逆** — 始终先提交或创建分支
- **需要 Conventional Commits**（commitlint 强制检查）
- **TypeScript 严格模式** · **Node ≥ 22** · **`package-lock.json`**（不用 yarn/pnpm）
- **`.umi` 目录为自动生成** — 如果开发服务器异常，删除 `src/.umi` 后重启

## 架构要点

**配置**：`config/config.ts`（defineConfig）、`config/routes.ts`（声明式路由）。路由 `name` → `menu.xxx` 国际化键；`access` 字段控制可见性。

**约定文件**（`src/`）：`app.tsx`（运行时配置 + `getInitialState`）、`access.ts`（权限）、`global.tsx`（副作用）、`loading.tsx`、`typings.d.ts`。

**认证**：`getInitialState()` → `GET /api/currentUser`；401 → 跳转登录页。`access.ts`：`canAdmin = currentUser.access === 'admin'`。Mock 凭据：`admin`/`ant.design` 或 `user`/`ant.design`。

**状态管理**：全局 hooks 使用 `useModel('文件名')`（`src/models/`）。currentUser/settings 使用 `useModel('@@initialState')`。大多数数据加载通过 ProTable 的 `request` 属性。复杂服务端状态使用 `@tanstack/react-query`。

**样式优先级**：Tailwind CSS v4（布局）→ antd-style v4 / `createStyles`（主题 tokens）→ CSS Modules → Less（仅遗留代码）。

**请求**：使用 `@umijs/max` 内置的 `request`，在 `src/requestErrorConfig.ts` 中配置。非自动生成的 API 使用页面级 `service.ts`。

**国际化**：`src/locales/` 中 8 种语言。`useIntl().formatMessage({ id, defaultMessage })`。

**Mock**：`mock/`（全局）+ `src/pages/**/_mock.ts`（页面级）。Express 风格处理器。

**Cloudflare Worker**：`cloudflare-worker/` — 独立的 Hono 应用，有自己的 `package.json`，不是 npm workspace。

## AI 技能

本项目内置两个 Claude Code 技能（`.claude/skills/`）。如果你的项目中已有这些技能，无需安装 — 直接运行即可。要更新到最新的技能定义，执行 `npx skills add ant-design/ant-design-pro`。

### `/pro-upgrade` — 项目升级

在 Claude Code 中运行 `/pro-upgrade` 自动将项目升级到最新的 Ant Design Pro 版本。它会将最新模板与本项目进行对比，合并框架变更同时保留业务代码。适用于任何版本跨度（v5→v6、v6.x→最新版等）。

### `/antd` — Ant Design CLI

在 Claude Code 中运行 `/antd` 处理任何 antd 相关工作。它提供 `@ant-design/cli` 访问，包含 antd v3/v4/v5/v6 的离线元数据。关键命令：

- `npx antd info <组件>` — 编写代码前查询属性/API（强制要求）
- `npx antd lint ./src` — 检查已弃用或有问题的用法（提交前必须通过）
- `npx antd demo <组件> <示例>` — 获取可工作的代码示例
- `npx antd migrate <旧版本> <新版本>` — 主要版本间的迁移清单

## 页面文件组织

每个页面目录包含：`index.tsx`、可选的 `service.ts`、`_mock.ts`、`data.d.ts`、样式文件。将页面特定代码与页面放在一起。

# CLAUDE.md

减少常见 LLM 编码错误的行为准则。可根据需要与项目特定说明合并使用。

**权衡：** 这些准则倾向于谨慎而非速度。对于简单任务，请自行判断。

## 1. 先思考再编码

**不要假设。不要隐藏困惑。暴露取舍。**

在实施之前：
- 明确陈述你的假设。如果不确定，请提问。
- 如果存在多种解释，请全部列出 — 不要默默选择其一。
- 如果存在更简单的方案，请指出。必要时提出异议。
- 如果某件事不清楚，停下来。指出令人困惑之处。提问。

## 2. 简洁优先

**解决问题的代码量最小。不做任何推测性工作。**

- 不实现需求之外的功能。
- 不为单次使用的代码创建抽象。
- 不提供未经要求的"灵活性"或"可配置性"。
- 不为不可能的场景做错误处理。
- 如果你写了 200 行但可以精简为 50 行，重写它。

问问自己："资深工程师会认为这过于复杂吗？"如果是，请简化。

## 3. 精准修改

**只动必须动的地方。只清理自己造成的混乱。**

编辑现有代码时：
- 不要"改进"相邻的代码、注释或格式。
- 不要重构没有问题的部分。
- 匹配现有风格，即使你有不同的做法。
- 如果你发现无关的无效代码，提一下 — 但不要删除它。

当你的修改产生了孤儿代码：
- 删除你的修改导致不再使用的导入/变量/函数。
- 除非被要求，否则不要删除预先存在的无效代码。

检验标准：每一行被修改的代码都应能直接追溯回用户的需求。

## 4. 目标驱动执行

**定义成功标准。持续循环直到验证通过。**

将任务转化为可验证的目标：
- "添加验证" → "为无效输入编写测试，然后让它们通过"
- "修复 bug" → "编写能复现它的测试，然后让测试通过"
- "重构 X" → "确保重构前后测试均通过"

对于多步骤任务，陈述简要计划：
```
1. [步骤] → 验证：[检查项]
2. [步骤] → 验证：[检查项]
3. [步骤] → 验证：[检查项]
```

明确成功标准让你能独立循环。模糊的标准（"让它工作"）需要持续的澄清。

---

**这些准则生效的标志是：** diff 中不必要的变更减少，因过度复杂导致的返工减少，且在实施之前而非犯错之后提出澄清性问题。

---
