import React from "react";
import { Input, Form, Button } from "antd";
import axios from "axios";

function EditCourt({
  onFinishFailed,
  setEditCourtModalVisible,
  updateCourtData,
  callCourtData,
}) {
  const [form] = Form.useForm();

  form.setFieldsValue({
    name: updateCourtData.name,
    onCoaching: updateCourtData.playersAllowed.onCoaching,
    onMembership: updateCourtData.playersAllowed.onMembership,
  });

  const onEditCourtFinish = async (val) => {
    const courtId = updateCourtData._id;
    await axios.put(`http://localhost:8000/api/court/${courtId}`, val);

    setEditCourtModalVisible(false);
    callCourtData();
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
      onFinish={onEditCourtFinish}
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
        label="OnCoaching"
        name="onCoaching"
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
        label="OnMembership"
        name="onMembership"
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
          onClick={() => setEditCourtModalVisible(false)}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditCourt;
