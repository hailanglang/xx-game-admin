declare namespace API {
  type AssignPermissionDto = {
    permissionIds: number[];
  };

  type CreateRoleDto = {
    name: string;
    description?: string;
  };

  type CreateSystemConfigDto = {
    key: string;
    value: Record<string, any>;
    description?: string;
    isEncrypted?: boolean;
  };

  type CreateUserDto = {
    username: string;
    password: string;
    email?: string;
    avatar?: string;
    roleId?: number;
  };

  type LoginDto = {
    username: string;
    password: string;
    autoLogin?: boolean;
  };

  type LoginResponseDto = {
    token: string;
    currentUser: UserInfoDto;
  };

  type PaginatedUserDto = {
    list: UserDetailDto[];
    total: number;
    page: number;
    pageSize: number;
  };

  type PermissionGroupDto = {
    module: string;
    moduleName: string;
    permissions: PermissionItemDto[];
  };

  type PermissionItemDto = {
    id: number;
    code: string;
    name: string;
    module: string;
    action: string;
  };

  type RoleDetailDto = {
    id: number;
    name: string;
    description: string;
    isSystem: boolean;
    createdAt: string;
    updatedAt: string;
    permissions: RolePermissionDto[];
    userCount: number;
  };

  type RoleDto = {
    id: number;
    name: string;
    description: string;
    isSystem: boolean;
    createdAt: string;
    updatedAt: string;
  };

  type RolePermissionDto = {
    roleId: number;
    permissionId: number;
    permission: {
      id: number;
      code: string;
      name: string;
      description: string;
      module: string;
      action: string;
      createdAt: string;
    };
  };

  type RolesControllerAssignPermissionsParams = {
    id: string;
  };

  type RolesControllerFindOneParams = {
    id: string;
  };

  type RolesControllerRemoveParams = {
    id: string;
  };

  type RolesControllerUpdateParams = {
    id: string;
  };

  type SystemControllerDeleteConfigParams = {
    key: string;
  };

  type SystemControllerFindAllLogsParams = {
    action?: string;
    adminUserId?: number;
    page?: number;
    pageSize?: number;
  };

  type SystemControllerFindConfigByKeyParams = {
    key: string;
  };

  type SystemControllerUpdateConfigParams = {
    key: string;
  };

  type UpdateSystemConfigDto = {
    value?: Record<string, any>;
    description?: string;
    isEncrypted?: boolean;
  };

  type UpdateUserDto = {
    password?: string;
    email?: string;
    avatar?: string;
    status?: boolean;
    roleId?: number;
  };

  type UserDetailDto = {
    id: number;
    username: string;
    email: string;
    avatar: string;
    status: boolean;
    roleId: number;
    lastLoginAt: string;
    createdAt: string;
    role: { id: number; name: string };
  };

  type UserDto = {
    id: number;
    username: string;
    email: string;
    avatar: string;
    status: boolean;
    roleId: number;
    lastLoginAt: string;
    createdAt: string;
  };

  type UserInfoDto = {
    id: number;
    username: string;
    email: string;
    avatar: string;
    roleId: number;
    roleName: string;
    permissions: string[];
  };

  type UsersControllerFindAllParams = {
    username?: string;
    status?: boolean;
    page?: number;
    pageSize?: number;
  };

  type UsersControllerFindOneParams = {
    id: string;
  };

  type UsersControllerRemoveParams = {
    id: string;
  };

  type UsersControllerUpdateParams = {
    id: string;
  };
}
