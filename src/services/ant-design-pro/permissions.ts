// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 获取所有权限列表（平铺） GET /api/permissions */
export async function permissionsControllerFindAll(options?: {
  [key: string]: any;
}) {
  return request<API.PermissionItemDto[]>("/api/permissions", {
    method: "GET",
    ...(options || {}),
  });
}

/** 获取按模块分组的权限列表 GET /api/permissions/modules */
export async function permissionsControllerFindGrouped(options?: {
  [key: string]: any;
}) {
  return request<API.PermissionGroupDto[]>("/api/permissions/modules", {
    method: "GET",
    ...(options || {}),
  });
}
