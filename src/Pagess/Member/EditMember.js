import React from "react";
import { Input, Form, Button } from "antd";
import axios from "axios";

function EditMember({
  onFinishFailed,
  setEditMemberModalVisible,
  UpdateMemberData,
  memberData,
}) {
  const [form] = Form.useForm();

  form.setFieldsValue({
    name: UpdateMemberData.name,
    RFID: UpdateMemberData.RFID,
    gender: UpdateMemberData.gender,
    address: UpdateMemberData.address,
    mobile: UpdateMemberData.mobile,
    email: UpdateMemberData.email,
  });
  console.log(UpdateMemberData);

  const onEditMemberFinish = async (val) => {
    const MemId = UpdateMemberData._id;
    await axios.put(`http://localhost:8000/api/members/${MemId}`, val);

    setEditMemberModalVisible(false);
    memberData();
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
      onFinish={onEditMemberFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="RFID"
        name="RFID"
        rules={[
          {
            required: true,
            message: "Please input your Reference Id!",
            min: 5,
          },
        ]}
      >
        <Input />
      </Form.Item>

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
        label="Gender"
        name="gender"
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
        label="Address"
        name="address"
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
        label="Mobile"
        name="mobile"
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
        label="Email"
        name="email"
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
          onClick={() => setEditMemberModalVisible(false)}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditMember;
