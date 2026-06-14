import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge, Button, Modal, message } from 'antd';
import dayjs from 'dayjs';
import type { FC } from 'react';
import React, { useState } from 'react';
import CreateModal from './components/CreateModal';
import PermissionModal from './components/PermissionModal';
import { queryRoleList, removeRole } from './service';

const ROLE_LIST_QUERY_KEY = ['role-list'];

const BasicList: FC = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [permModalOpen, setPermModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<API.RoleDetailDto | null>(
    null,
  );

  const queryClient = useQueryClient();

  const refreshList = () => {
    queryClient.invalidateQueries({ queryKey: ROLE_LIST_QUERY_KEY });
  };

  const { mutate: deleteRole } = useMutation({
    mutationFn: (id: number) => removeRole({ id: String(id) }),
    onSuccess: () => {
      message.success('删除成功');
      refreshList();
    },
    onError: (error: any) => {
      message.error(error?.message || '删除失败');
    },
  });

  const handleDelete = (record: API.RoleDetailDto) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定删除角色「${record.name}」吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => deleteRole(record.id),
    });
  };

  const handlePermissionEdit = (record: API.RoleDetailDto) => {
    setSelectedRole(record);
    setPermModalOpen(true);
  };

  const columns: ProColumns<API.RoleDetailDto>[] = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      width: 160,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (_, record) => record.description || '-',
    },
    {
      title: '用户数',
      dataIndex: 'userCount',
      key: 'userCount',
      width: 80,
      search: false,
    },
    {
      title: '系统角色',
      dataIndex: 'isSystem',
      key: 'isSystem',
      width: 110,
      search: false,
      render: (_, record) =>
        record.isSystem ? (
          <Badge status="success" text="系统内置" />
        ) : (
          <Badge status="warning" text="自定义" />
        ),
    },
    {
      title: '权限数',
      dataIndex: 'permissions',
      key: 'permissions',
      width: 80,
      search: false,
      render: (_, record) => record.permissions?.length ?? 0,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 170,
      search: false,
      render: (_, record) =>
        record.createdAt
          ? dayjs(record.createdAt).format('YYYY-MM-DD HH:mm')
          : '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      search: false,
      render: (_, record) => (
        <>
          <Button
            type="link"
            disabled={record.isSystem}
            onClick={() => handlePermissionEdit(record)}
            title={record.isSystem ? '系统角色权限不可修改' : undefined}
          >
            权限编辑
          </Button>
          {!record.isSystem && (
            <Button type="link" danger onClick={() => handleDelete(record)}>
              删除
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RoleDetailDto>
        rowKey="id"
        columns={columns}
        request={async () => {
          const data = await queryRoleList();
          return { data, total: data.length, success: true };
        }}
        search={false}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateOpen(true)}
          >
            新建角色
          </Button>,
        ]}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <CreateModal
        open={createOpen}
        onCancel={() => setCreateOpen(false)}
        onSuccess={() => {
          setCreateOpen(false);
          refreshList();
        }}
      />

      <PermissionModal
        open={permModalOpen}
        role={selectedRole}
        onCancel={() => {
          setPermModalOpen(false);
          setSelectedRole(null);
        }}
        onSuccess={() => {
          setPermModalOpen(false);
          setSelectedRole(null);
          refreshList();
        }}
      />
    </PageContainer>
  );
};

export default BasicList;
