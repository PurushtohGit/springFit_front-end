import React from "react";
import { Input, Form, Button } from "antd";
import axios from "axios";
import { useParams } from "react-router";

function EditProduct({
  onFinishFailed,
  setProductEditModalVisible,
  updateProductData,
  callProductData,
}) {
  const [form] = Form.useForm();
  const { InvId } = useParams();

  form.setFieldsValue({
    name: updateProductData.name,
    buyPrice: updateProductData.buyPrice,
    sellPrice: updateProductData.sellPrice,
    quantity: updateProductData.quantity,
    min: updateProductData.min,
  });

  const onEditCategoryFinish = async (val) => {
    const CatId = updateProductData._id;

    await axios.put(`http://localhost:8000/api/product/${InvId}/${CatId}`, val);

    setProductEditModalVisible(false);
    callProductData();
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
          onClick={() => setProductEditModalVisible(false)}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditProduct;
