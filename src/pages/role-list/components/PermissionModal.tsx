import { Modal, message, Spin, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { assignPermissions, queryGroupedPermissions } from '../service';

type OperationModalProps = {
  open: boolean;
  role: API.RoleDetailDto | null;
  onCancel: () => void;
  onSuccess: () => void;
};

function buildTreeData(groups: API.PermissionGroupDto[]): DataNode[] {
  return groups.map((group) => ({
    title: group.moduleName,
    key: `module_${group.module}`,
    selectable: false,
    checkable: false,
    children: group.permissions.map((perm) => ({
      title: perm.name,
      key: perm.id,
    })),
  }));
}

const OperationModal: FC<OperationModalProps> = ({
  open,
  role,
  onCancel,
  onSuccess,
}) => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // 加载权限树并设置已选
  useEffect(() => {
    if (!open || !role) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const groups = await queryGroupedPermissions();
        setTreeData(buildTreeData(groups));

        // 预勾选当前角色已有的权限
        const ids = role.permissions.map((p) => p.permissionId);
        setCheckedKeys(ids);
      } catch {
        message.error('加载权限列表失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open, role]);

  const handleOk = async () => {
    if (!role) return;
    // checkedKeys 包含父节点 key（module_xxx），过滤掉只保留数字类型的 permissionId
    const permissionIds = checkedKeys.filter(
      (key): key is number => typeof key === 'number',
    );

    setConfirmLoading(true);
    try {
      await assignPermissions({ id: String(role.id) }, { permissionIds });
      message.success('权限更新成功');
      onSuccess();
    } catch (error: any) {
      message.error(error?.message || '权限更新失败，请重试');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    if (confirmLoading) return; // 提交中不允许关闭
    setCheckedKeys([]);
    setTreeData([]);
    onCancel();
  };

  const roleTitle = role?.name ?? '';

  return (
    <Modal
      title={`权限编辑 - ${roleTitle}`}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      destroyOnClose
      width={480}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <Spin />
        </div>
      ) : (
        <div style={{ maxHeight: 400, overflow: 'auto', marginTop: 8 }}>
          <Tree
            checkable
            treeData={treeData}
            checkedKeys={checkedKeys}
            onCheck={(keys) => setCheckedKeys(keys as React.Key[])}
            defaultExpandAll
          />
        </div>
      )}
    </Modal>
  );
};

export default OperationModal;
