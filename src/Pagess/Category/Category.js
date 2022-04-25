import { Table, Tag, Space, Button, Popconfirm, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Outlet, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import CategoryAdd from "./CateoryAdd";
import CategoryEdit from "./CategoryEdit";

function Category() {
  const [CategoryAddVisible, setCategoryAddVisible] = useState(false);
  const [EditCategory, setEditCategory] = useState();
  const [CategoryName, setCategoryName] = useState();
  const [CategoryUpdate, setCategoryUpdate] = useState();
  const { id } = useParams();

  const callCategoryData = async () => {
    const InventoryId = id;
    const getData = await axios.get(
      `http://localhost:8000/api/categories/${InventoryId}`
    );

    setCategoryName(getData.data);
  };

  useEffect(() => {
    callCategoryData();
  }, []);

  const addCategoryData = async (values) => {
    await axios.post(`http://localhost:8000/api/category/${id}`, values);
    callCategoryData();
  };

  const onCategoryDataDelete = async (record) => {
    const Inid = id;
    const deleteId = record._id;
    await axios.delete(
      `http://localhost:8000/api/category/${Inid}/${deleteId}`
    );
    callCategoryData();
    console.log(deleteId);
  };

  const categoryAddOnFinish = (values) => {
    addCategoryData(values);
    setCategoryAddVisible(false);
  };

  const showModal = () => {
    setCategoryAddVisible(true);
  };

  const handleCancel = () => {
    setCategoryAddVisible(false);
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
      title: "Category Name",
      dataIndex: "name",
      key: "name",

      render: (text) => <a>{text}</a>,
    },

    {
      title: " Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Action",
      key: "action",

      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "blue" }}
            onClick={() => {
              setEditCategory(true);
              setCategoryUpdate(record);
            }}
          />
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onCategoryDataDelete(record)}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
          <Link to={`category/${record._id}/products`}>
            <EyeOutlined style={{ color: "green" }} />
          </Link>
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
        <PlusCircleOutlined />
        ADD CATEGORY
      </Button>
      <Modal
        title=" Category Add"
        visible={CategoryAddVisible}
        onCancel={() => setCategoryAddVisible(false)}
        footer={null}
        width={800}
        height={500}
      >
        <CategoryAdd
          onCategoryFinish={categoryAddOnFinish}
          onCategoryFinishFailed={onFinishFailed}
          setCategoryAddVisible={setCategoryAddVisible}
        />
      </Modal>
      <Modal
        title="Category Edit"
        visible={EditCategory}
        onCancel={() => setEditCategory(false)}
        footer={null}
        width={800}
        height={500}
      >
        <CategoryEdit
          onFinishFailed={onFinishFailed}
          setEditCategory={setEditCategory}
          CategoryUpdate={CategoryUpdate}
          callCategoryData={callCategoryData}
        />
      </Modal>
      <div style={{ backgroundColor: "white", marginTop: 50, padding: 20 }}>
        <Table columns={columns} dataSource={CategoryName} rowKey="_id" />
      </div>
    </>
  );
}

export default Category;
