// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 获取用户列表 GET /api/users */
export async function usersControllerFindAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UsersControllerFindAllParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedUserDto>("/api/users", {
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

/** 创建用户 POST /api/users */
export async function usersControllerCreate(
  body: API.CreateUserDto,
  options?: { [key: string]: any }
) {
  return request<API.UserDto>("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户详情 GET /api/users/${param0} */
export async function usersControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UsersControllerFindOneParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserDetailDto>(`/api/users/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新用户 PUT /api/users/${param0} */
export async function usersControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UsersControllerUpdateParams,
  body: API.UpdateUserDto,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserDto>(`/api/users/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /api/users/${param0} */
export async function usersControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UsersControllerRemoveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserDto>(`/api/users/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}
