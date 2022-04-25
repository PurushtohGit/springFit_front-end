import React from "react";
import { Input, Form, Button } from "antd";
import axios from "axios";

function EditMemberShip({
  onFinishFailed,
  setEditMemberShipModalVisible,
  UpdateMemberShipData,
  memberShipData,
}) {
  const [form] = Form.useForm();

  form.setFieldsValue({
    name: UpdateMemberShipData.name,
    type: UpdateMemberShipData.type,
    duration: UpdateMemberShipData.duration,
    amount: UpdateMemberShipData.amount,
  });

  const onEditMemberShipFinish = async (val) => {
    const MemShipId = UpdateMemberShipData._id;
    await axios.put(`http://localhost:8000/api/membership/${MemShipId}`, val);

    setEditMemberShipModalVisible(false);
    memberShipData();
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onEditMemberShipFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your username!",
            min: "5",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Duration"
        name="duration"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 20,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          type="primary"
          onClick={() => setEditMemberShipModalVisible(false)}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditMemberShip;
