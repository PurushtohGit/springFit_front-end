import { Table, Tag, Space, Button, Popconfirm, Modal } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

function Product() {
  // Add Modal
  const [ProductsAddVisible, setProductsAddVisible] = useState(false);

  const showModal = () => {
    setProductsAddVisible(true);
  };

  const handleOk = () => {
    setProductsAddVisible(false);
  };

  const handleCancel = () => {
    setProductsAddVisible(false);
  };

  const columns = [
    {
      title: "RefId",
      dataIndex: "RFID",
      key: "RFID",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      render: (text) => <a>{text}</a>,
    },

    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 10,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",

      render: (_, record) => (
        <Space size="middle">
          <EditOutlined style={{ color: "blue" }} />
          <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
          <EyeOutlined style={{ color: "green" }} />
        </Space>
      ),
    },
  ];

  const data = [];
  return (
    <>
      <Button
        type="primary"
        style={{ fontWeight: 800, float: "right", marginBottom: 20 }}
        onClick={showModal}
      >
        ADD
      </Button>
      <Modal
        title="Basic Modal"
        visible={ProductsAddVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default Product;
