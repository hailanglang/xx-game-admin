import { Form, Input, Modal, message } from 'antd';
import type { FC } from 'react';
import React from 'react';
import { createRole } from '../service';

type CreateModalProps = {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
};

const CreateModal: FC<CreateModalProps> = ({ open, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      await createRole(values);
      message.success('角色创建成功');
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      if (error?.message) {
        message.error(error.message);
      }
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="新建角色"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          name="name"
          label="角色名称"
          rules={[{ required: true, message: '请输入角色名称' }]}
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input.TextArea placeholder="请输入角色描述" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
