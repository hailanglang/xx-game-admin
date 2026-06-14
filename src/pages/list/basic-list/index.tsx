import { DownOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Avatar,
  Card,
  Dropdown,
  Input,
  List,
  Modal,
  Row,
  Segmented,
} from 'antd';
import type { FC } from 'react';
import React from 'react';
import type { BasicListItemDataType } from './data.d';
import { addUser, queryUserList, removeUser, updateUser } from './service';
import useStyles from './style.style';

const { Search } = Input;

const ListContent = ({
  data: { email, roleName },
}: {
  data: BasicListItemDataType;
}) => {
  const { styles } = useStyles();
  return (
    <div>
      <div className={styles.listContentItem}>
        <span>邮箱</span>
        <p>{email}</p>
      </div>
      <div className={styles.listContentItem}>
        <span>角色</span>
        <p>{roleName}</p>
      </div>
    </div>
  );
};

const BasicList: FC = () => {
  const { styles } = useStyles();
  const { data, isLoading: loading } = useQuery({
    queryKey: ['user-list'],
    queryFn: () => queryUserList({ page: 1, pageSize: 50 }),
  });
  const userList = data && data.list;
  console.log('data', data);
  const queryClient = useQueryClient();
  const { mutate: postRun } = useMutation({
    mutationFn: async ({ method, params }: { method: string; params: any }) => {
      if (method === 'remove') {
        return removeUser({ id: params.id });
      }
      if (method === 'update') {
        return updateUser({ id: params.id }, params);
      }
      return addUser(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list'] });
    },
  });

  // Wrapper to handle the original calling convention
  const runListOperation = (method: string, params: any) => {
    postRun({ method, params });
  };
  const list = Array.isArray(userList) ? userList : [];
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: list.length,
  };
  const deleteItem = (id: string) => {
    runListOperation('remove', {
      id,
    });
  };
  const editAndDelete = (
    key: string | number,
    currentItem: BasicListItemDataType,
  ) => {
    if (key === 'delete') {
      Modal.confirm({
        title: '删除用户',
        content: '确定删除该用户吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(String(currentItem.id)),
      });
    }
  };
  const extraContent = (
    <div>
      <Segmented
        defaultValue="all"
        options={[
          { label: '全部', value: 'all' },
          { label: '进行中', value: 'progress' },
          { label: '等待中', value: 'waiting' },
        ]}
      />
      <Search
        className={styles.extraContentSearch}
        placeholder="请输入"
        onSearch={() => ({})}
        variant="filled"
      />
    </div>
  );

  const renderMoreBtn = (item: BasicListItemDataType) => {
    return (
      <Dropdown
        menu={{
          onClick: ({ key }) => editAndDelete(key, item),
          items: [
            {
              key: 'delete',
              label: '删除',
            },
          ],
        }}
      >
        <a href="#">
          更多 <DownOutlined />
        </a>
      </Dropdown>
    );
  };

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            variant="borderless"
            title="用户列表"
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item actions={[renderMoreBtn(item)]}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.avatar} shape="square" size="large" />
                    }
                    title={<a>{item.username}</a>}
                    description={`ID: ${item.id}`}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>
    </div>
  );
};
export default BasicList;
