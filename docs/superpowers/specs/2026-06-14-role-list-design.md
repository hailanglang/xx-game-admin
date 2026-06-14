# 角色列表功能设计

## 概述

在 `role-list` 页面实现完整的角色管理功能，包含角色列表展示、新建角色、权限编辑、删除角色。

## 相关 API

### 角色接口（`src/services/ant-design-pro/roles.ts`）

| 接口 | 方法 | 描述 |
|------|------|------|
| `rolesControllerFindAll` | `GET /api/roles` | 获取角色列表，返回 `RoleDetailDto[]` |
| `rolesControllerCreate` | `POST /api/roles` | 创建角色，body: `CreateRoleDto`，返回 `RoleDto` |
| `rolesControllerUpdate` | `PUT /api/roles/:id` | 更新角色信息 |
| `rolesControllerRemove` | `DELETE /api/roles/:id` | 删除角色，返回 `RoleDto` |
| `rolesControllerAssignPermissions` | `POST /api/roles/:id/permissions` | 分配权限，body: `AssignPermissionDto`, 返回 `RoleDetailDto` |

### 权限接口（`src/services/ant-design-pro/permissions.ts`）

| 接口 | 方法 | 描述 |
|------|------|------|
| `permissionsControllerFindGrouped` | `GET /api/permissions/modules` | 获取按模块分组的权限，返回 `PermissionGroupDto[]` |

## 数据结构

```typescript
// 角色列表项
interface RoleDetailDto {
  id: number;
  name: string;
  description: string | null;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  permissions: RolePermissionDto[];
  userCount: number;
}

// 创建角色请求
interface CreateRoleDto {
  name: string;
  description?: string;
}

// 分配权限请求
interface AssignPermissionDto {
  permissionIds: number[];
}

// 权限分组（用于 Tree）
interface PermissionGroupDto {
  module: string;
  moduleName: string;
  permissions: PermissionItemDto[];
}
```

## 组件架构

```
src/pages/role-list/
├── index.tsx              # 主页面 — ProTable 角色列表
├── service.ts             # API 调用封装
├── style.style.ts         # 已有样式（可复用）
└── components/
    ├── OperationModal.tsx  # 重写为权限编辑 Modal（antd Tree）
    └── CreateModal.tsx     # 新建角色 Modal（表单）
```

## 设计细节

### 0. ProTable 响应适配

`rolesControllerFindAll` 返回 `RoleDetailDto[]`（数组），但 ProTable 的 `request` 属性需要 `{ data: T[], success: boolean, total: number }` 格式。

需要包装：
```typescript
request: async () => {
  const data = await rolesControllerFindAll();
  return { data, total: data.length, success: true };
}
```

### 1. 列表页（ProTable）

使用 `ProTable` 替代当前 `<List>` 组件。列结构：

| 列 | 数据源 | 渲染 |
|------|--------|------|
| 角色名称 | `name` | 文本 |
| 描述 | `description` | 文本，空时显示 `-` |
| 用户数 | `userCount` | 数值 |
| 系统角色 | `isSystem` | `true` → 绿色 Badge "系统内置"；`false` → 橙色 Badge "自定义" |
| 权限数 | `permissions.length` | 数值 |
| 创建时间 | `createdAt` | `dayjs().format('YYYY-MM-DD HH:mm')` |
| 操作 | — | "权限编辑" + "删除" 按钮 |

**工具栏**：`toolBarRender` → `+ 新建角色` 按钮

**请求**：通过 `request` 属性调用 `rolesControllerFindAll`，响应直接为 `RoleDetailDto[]`。

### 2. 操作按钮逻辑

| 场景 | isSystem = false | isSystem = true |
|------|-----------------|-----------------|
| 权限编辑 | 按钮可用，点击打开权限 Modal | 按钮禁用（`disabled`），tooltip "系统角色权限不可修改" |
| 删除 | 按钮存在，点击弹出 `Modal.confirm` 确认 | 按钮不渲染 |

### 3. 新建角色（CreateModal）

- 使用 `Modal` + `ProForm` / antd `Form`
- 字段：名称（必填）、描述（选填）
- 提交：`rolesControllerCreate(body)`
- 成功后：关闭 Modal，`message.success`，刷新 ProTable

### 4. 权限编辑 Modal（OperationModal 重写）

- 使用 `Modal`（非 `ModalForm`，因为内容为 Tree 而非表单）
- 标题：`权限编辑 - {角色名}`
- 内容：antd `<Tree>` 组件，`checkable` 模式
  - `treeData` 由 `permissionsControllerFindGrouped` 转换而来
  - 父节点对应 `module`，`selectable={false}`
  - 子节点对应 `permission` 列表
  - `checkedKeys` 从 `role.permissions.map(p => p.permissionId)` 预填充
- 加载状态：Tree 加载时显示 `spinning` 或骨架
- 提交：`rolesControllerAssignPermissions({id}, {permissionIds})`
- 完成后：关闭 Modal，`message.success`，刷新列表

### 5. 边界状态

| 状态 | 处理方式 |
|------|---------|
| 列表加载中 | ProTable 内置 loading |
| 列表为空 | ProTable 默认空状态 |
| 树加载中 | Tree 上方或内部 loading 指示 |
| 权限提交失败 | `message.error` 提示错误，Modal 保持打开可重试 |
| 删除失败 | `message.error` 提示 |
| 删除确认 | `Modal.confirm({ title: '确认删除', content: '确定删除角色「xxx」吗？', onOk })` |

## 文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/pages/role-list/service.ts` | 重写 | 替换 user 接口为 role + permission 接口 |
| `src/pages/role-list/index.tsx` | 重写 | ProTable + 角色列表逻辑 |
| `src/pages/role-list/components/OperationModal.tsx` | 重写 | 权限编辑 Modal（Tree） |
| `src/pages/role-list/components/CreateModal.tsx` | 新建 | 新建角色表单 Modal |
| `src/pages/role-list/data.d.ts` | 删除（可选） | 不再需要 |
| `src/pages/role-list/utils/utils.style.ts` | 删除（可选） | 不再需要 |
