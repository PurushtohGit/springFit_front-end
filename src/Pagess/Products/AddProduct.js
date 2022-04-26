import React from "react";
import { Input, Form, Button } from "antd";

function ProductAdd({
  onProductFinish,
  onProductFinishFailed,
  setProductAddModalVisible,
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
      onFinish={onProductFinish}
      onFinishFailed={onProductFinishFailed}
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
        label="Buy Price"
        name="buyPrice"
        rules={[
          {
            required: true,
            message: "Please input your Status",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Sell  Price"
        name="sellPrice"
        rules={[
          {
            required: true,
            message: "Please input your Status",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[
          {
            required: true,
            message: "Please input your Status",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Min"
        name="min"
        rules={[
          {
            required: true,
            message: "Please input your Status",
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
          onClick={() => setProductAddModalVisible(false)}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ProductAdd;
