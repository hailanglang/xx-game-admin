// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 获取角色列表 GET /api/roles */
export async function rolesControllerFindAll(options?: { [key: string]: any }) {
  return request<API.RoleDetailDto[]>("/api/roles", {
    method: "GET",
    ...(options || {}),
  });
}

/** 创建角色 POST /api/roles */
export async function rolesControllerCreate(
  body: API.CreateRoleDto,
  options?: { [key: string]: any }
) {
  return request<API.RoleDto>("/api/roles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取角色详情 GET /api/roles/${param0} */
export async function rolesControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RolesControllerFindOneParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleDetailDto>(`/api/roles/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新角色 PUT /api/roles/${param0} */
export async function rolesControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RolesControllerUpdateParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleDto>(`/api/roles/${param0}`, {
    method: "PUT",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除角色 DELETE /api/roles/${param0} */
export async function rolesControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RolesControllerRemoveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleDto>(`/api/roles/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分配角色权限 POST /api/roles/${param0}/permissions */
export async function rolesControllerAssignPermissions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RolesControllerAssignPermissionsParams,
  body: API.AssignPermissionDto,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleDetailDto>(`/api/roles/${param0}/permissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
