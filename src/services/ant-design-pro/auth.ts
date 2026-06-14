// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 获取当前用户信息 GET /api/auth/currentUser */
export async function authControllerGetCurrentUser(options?: {
  [key: string]: any;
}) {
  return request<API.UserInfoDto>("/api/auth/currentUser", {
    method: "GET",
    ...(options || {}),
  });
}

/** 用户登录 POST /api/auth/login */
export async function authControllerLogin(
  body: API.LoginDto,
  options?: { [key: string]: any }
) {
  return request<API.LoginResponseDto>("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
