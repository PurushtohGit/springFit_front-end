import { Table, Space, Button, Popconfirm, Modal, Switch } from "antd";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import CategoryAdd from "./CateoryAdd";
import CategoryEdit from "./CategoryEdit";

function Category() {
  const [CategoryAddVisible, setCategoryAddVisible] = useState(false);
  const [EditCategory, setEditCategory] = useState();
  const [CategoryName, setCategoryName] = useState();
  const [CategoryUpdate, setCategoryUpdate] = useState();
  const { branchId, InvId } = useParams();

  const callCategoryData = async () => {
    const InventoryId = InvId;
    const getData = await axios.get(
      `http://localhost:8000/api/categories/${InventoryId}`
    );

    setCategoryName(getData.data);
  };

  useEffect(() => {
    callCategoryData();
  }, []);

  const addCategoryData = async (values) => {
    await axios.post(`http://localhost:8000/api/category/${InvId}`, values);
    callCategoryData();
  };

  const onCategoryDataDelete = async (record) => {
    const Inid = InvId;
    const deleteId = record._id;
    await axios.delete(
      `http://localhost:8000/api/category/${Inid}/${deleteId}`
    );
    callCategoryData();
  };

  const categoryAddOnFinish = (values) => {
    addCategoryData(values);
    setCategoryAddVisible(false);
  };

  const showModal = () => {
    setCategoryAddVisible(true);
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
      render: (_, record) => <Switch defaultChecked />,
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
      <Modal
        title=" Add Category"
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
        title="Edit Category"
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
      <div style={{ backgroundColor: "white", marginTop: 10, padding: 20 }}>
        <Button
          type="primary"
          style={{
            fontWeight: 800,
            float: "right",
            marginBottom: 20,
            marginRight: "150px",
          }}
          onClick={showModal}
        >
          <PlusCircleOutlined />
          ADD CATEGORY
        </Button>
        <Table
          columns={columns}
          dataSource={CategoryName}
          rowKey="_id"
          style={{ width: "80%", display: "block", margin: "0 auto" }}
        />
      </div>
    </>
  );
}

export default Category;
