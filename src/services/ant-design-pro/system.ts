// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 GET /api/system/configs */
export async function systemControllerFindAllConfigs(options?: {
  [key: string]: any;
}) {
  return request<any>("/api/system/configs", {
    method: "GET",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/system/configs */
export async function systemControllerCreateConfig(
  body: API.CreateSystemConfigDto,
  options?: { [key: string]: any }
) {
  return request<any>("/api/system/configs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/system/configs/${param0} */
export async function systemControllerFindConfigByKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemControllerFindConfigByKeyParams,
  options?: { [key: string]: any }
) {
  const { key: param0, ...queryParams } = params;
  return request<any>(`/api/system/configs/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/system/configs/${param0} */
export async function systemControllerUpdateConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemControllerUpdateConfigParams,
  body: API.UpdateSystemConfigDto,
  options?: { [key: string]: any }
) {
  const { key: param0, ...queryParams } = params;
  return request<any>(`/api/system/configs/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/system/configs/${param0} */
export async function systemControllerDeleteConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemControllerDeleteConfigParams,
  options?: { [key: string]: any }
) {
  const { key: param0, ...queryParams } = params;
  return request<any>(`/api/system/configs/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/system/logs */
export async function systemControllerFindAllLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemControllerFindAllLogsParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/system/logs", {
    method: "GET",
    params: {
      // page has a default value: 1
      page: "1",
      // pageSize has a default value: 20
      pageSize: "20",
      ...params,
    },
    ...(options || {}),
  });
}
