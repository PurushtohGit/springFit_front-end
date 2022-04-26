import { Table, Space, Modal, Button, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteFilled,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import EditForm from "./EditForm";
import AddForm from "./AddForm";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineInventory } from "react-icons/md";
import { Header } from "antd/lib/layout/layout";

function Branch() {
  const [tableData, setTableData] = useState([]);
  const [EditModalVisible, setEditModalVisible] = useState(false);
  const [AddModalVisible, setAddModalVisible] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  let navigate = useNavigate();

  const callData = async () => {
    const CompanyId = "625fa271c7f907883eb2ed07";
    const getData = await axios.get(
      `http://localhost:8000/api/branch/${CompanyId}`
    );

    setTableData(getData.data.branch);
  };

  useEffect(() => {
    callData();
  }, []);

  // Form
  const addData = async (values) => {
    const CompanyId = "625fa271c7f907883eb2ed07";
    await axios.post(`http://localhost:8000/api/branch/${CompanyId}`, values);
    callData();
  };

  const onFinish = (values) => {
    addData(values);
    setAddModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onDelete = async (record) => {
    const deleteId = record._id;
    await axios.delete(`http://localhost:8000/api/branches/${deleteId}`);

    callData();
  };

  // Inventory

  const viewInventory = async (record) => {
    const brId = record._id;
    const inventoryId = await axios.get(
      `http://localhost:8000/api/inventory/${brId}`
    );
    navigate(`${brId}/inventory/${inventoryId.data}/`);
    console.log(brId);
  };

  const columns = [
    {
      title: "S.No",
      width: 80,
      render: (text, record, index) => `${index + 1}`,
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "25%",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "15%",
    },

    {
      title: "Action",
      key: "action",
      width: "15%",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "blue" }}
            onClick={() => {
              setEditModalVisible(true);
              setUpdateData(record);
            }}
          />
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(record)}
          >
            <DeleteFilled style={{ color: "red" }} />
          </Popconfirm>
          <Link to={`/branch/${record._id}/courts`}>
            <EyeOutlined style={{ color: "green" }} />
          </Link>

          <Button
            ghost
            style={{
              borderColor: "#F8B400",
              color: "#F8B400",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => viewInventory(record)}
          >
            <MdOutlineInventory />
            <span style={{ marginLeft: 5 }}>Inventory</span>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Add Branch "
        visible={AddModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
        width={800}
        height={500}
      >
        <AddForm
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          setAddModalVisible={setAddModalVisible}
        />
      </Modal>
      <Modal
        title="Edit Branch "
        visible={EditModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={800}
        height={500}
      >
        <EditForm
          onFinishFailed={onFinishFailed}
          setEditModalVisible={setEditModalVisible}
          updateData={updateData}
          callData={callData}
        />
      </Modal>
      <Header
        style={{
          marginTop: 10,
          backgroundColor: "white",
          // margin: "48px 30px 0",
          borderRadius: 10,
        }}
      >
        <h1>BRANCHES</h1>
      </Header>
      <div style={{ backgroundColor: "white", marginTop: 10, padding: 20 }}>
        <Button
          type="primary"
          style={{ fontWeight: 800, float: "right", marginBottom: 20 }}
          onClick={() => setAddModalVisible(true)}
        >
          <PlusCircleOutlined />
          ADD BRANCH
        </Button>

        <Table rowKey="_id" columns={columns} dataSource={tableData} />
      </div>
    </>
  );
}

export default Branch;
