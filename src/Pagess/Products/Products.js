import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Table, Space, Modal, Button, Popconfirm } from "antd";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductAdd from "./AddProduct";
import EditProduct from "./EditProduct";
// import AddCourt from "./AddCourt";
// import "../../index.css";

// import EditCourt from "./EditCourt";

function Court() {
  const { InvId, categoryId } = useParams();

  const [ProductData, setProductData] = useState([]);
  const [ProductEditModalVisible, setProductEditModalVisible] = useState(false);
  const [ProductAddModalVisible, setProductAddModalVisible] = useState(false);
  const [updateProductData, setupdateProductData] = useState([]);

  const callProductData = async () => {
    const getProductData = await axios.get(
      `http://localhost:8000/api/products/${InvId}/${categoryId}`
    );
    setProductData(getProductData.data);
  };

  useEffect(() => {
    callProductData();
  }, []);

  // delete Row
  const onDelete = async (record) => {
    const deleteId = record._id;
    await axios.delete(
      `http://localhost:8000/api/product/${InvId}/${deleteId}`
    );
    callProductData();
  };

  // ADD FORM
  const addProductData = async (values) => {
    await axios.post(
      `http://localhost:8000/api/product/${InvId}/${categoryId}`,
      values
    );
    callProductData();
  };

  const onFinish = (values) => {
    addProductData(values);
    setProductAddModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      title: "S.No",

      render: (text, record, index) => `${index + 1}`,
    },

    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",

      render: (text) => <a>{text}</a>,
    },
    {
      title: "Buy Price",
      dataIndex: "buyPrice",
      key: "buyPrice",

      render: (text) => <a>{text}</a>,
    },

    {
      title: "Sell Price",
      dataIndex: "sellPrice",
      key: "sellPrice",

      render: (text) => <a>{text}</a>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",

      render: (text) => <a>{text}</a>,
    },
    {
      title: "Min",
      dataIndex: "min",
      key: "min",

      render: (text) => <a>{text}</a>,
    },

    {
      title: "Action",
      key: "action",

      render: (text, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "blue" }}
            onClick={() => {
              setProductEditModalVisible(true);
              setupdateProductData(record);
            }}
          />
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(record)}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title=" Add Product"
        visible={ProductAddModalVisible}
        onCancel={() => setProductAddModalVisible(false)}
        footer={null}
        width={800}
        height={500}
      >
        <ProductAdd
          onProductFinish={onFinish}
          onProductFinishFailed={onFinishFailed}
          setProductAddModalVisible={setProductAddModalVisible}
        />
      </Modal>

      <Modal
        title="Edit Product"
        visible={ProductEditModalVisible}
        onCancel={() => ProductEditModalVisible(false)}
        footer={null}
        width={800}
        height={500}
      >
        <EditProduct
          onFinishFailed={onFinishFailed}
          setProductEditModalVisible={setProductEditModalVisible}
          updateProductData={updateProductData}
          callProductData={callProductData}
        />
      </Modal>
      <div
        style={{
          backgroundColor: "white",
          marginTop: 50,
          padding: 20,
          Radius: 20,
        }}
      >
        <Button
          type="primary"
          style={{ fontWeight: 800, float: "right", marginBottom: 20 }}
          onClick={() => setProductAddModalVisible(true)}
        >
          <PlusCircleOutlined />
          ADD Products
        </Button>
        <Table columns={columns} dataSource={ProductData} rowKey="_id" />
      </div>
    </>
  );
}

export default Court;
