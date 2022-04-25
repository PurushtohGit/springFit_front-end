import React from "react";
import { Input, Form, Button } from "antd";
import axios from "axios";
import { useParams } from "react-router";

function CategoryEdit({
  onFinishFailed,
  setEditCategory,
  CategoryUpdate,
  callCategoryData,
}) {
  const [form] = Form.useForm();
  const { id } = useParams();

  form.setFieldsValue({
    name: CategoryUpdate.name,
    status: CategoryUpdate.status,
  });

  const onEditCategoryFinish = async (val) => {
    const CatId = CategoryUpdate._id;
    const INid = id;
    await axios.put(`http://localhost:8000/api/category/${INid}/${CatId}`, val);

    setEditCategory(false);
    callCategoryData();
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
      onFinish={onEditCategoryFinish}
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
        label="status"
        name="status"
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
          onClick={() => setEditCategory(false)}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CategoryEdit;
