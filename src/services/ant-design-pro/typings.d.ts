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
  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };
  type PageParams = {
    current?: number;
    pageSize?: number;
  };
}
