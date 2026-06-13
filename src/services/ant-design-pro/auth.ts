// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 GET /api/auth/currentUser */
export async function authControllerGetCurrentUser(options?: {
  [key: string]: any;
}) {
  return request<any>("/api/auth/currentUser", {
    method: "GET",
    ...(options || {}),
  });
}

/** Create a new cat This operation allows you to create a new cat. POST /api/auth/login */
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
