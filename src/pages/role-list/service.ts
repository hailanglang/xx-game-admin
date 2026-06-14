import { permissionsControllerFindGrouped } from '@/services/ant-design-pro/permissions';
import {
  rolesControllerAssignPermissions,
  rolesControllerCreate,
  rolesControllerFindAll,
  rolesControllerRemove,
} from '@/services/ant-design-pro/roles';

export {
  permissionsControllerFindGrouped as queryGroupedPermissions,
  rolesControllerAssignPermissions as assignPermissions,
  rolesControllerCreate as createRole,
  rolesControllerFindAll as queryRoleList,
  rolesControllerRemove as removeRole,
};
