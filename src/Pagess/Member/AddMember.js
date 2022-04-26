import React from "react";
import { Input, Form, Button, Select } from "antd";
const { Option } = Select;

function AddMember({
  onMemberFinish,
  onMemberFinishFailed,
  setMemberAddVisible,
}) {
  return (
    <Form
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
      onFinish={onMemberFinish}
      onFinishFailed={onMemberFinishFailed}
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
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Other">Other</Option>
        </Select>
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
          onClick={() => setMemberAddVisible(false)}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddMember;
