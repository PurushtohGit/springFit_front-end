import { Table, Space, Button, Popconfirm, Modal } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AddMemberShip from "./AddMemberShip";
import EditMemberShip from "./EditMemberShip";
function MemberShip() {
  // Add Modal
  const [MemberShipAddVisible, setMemberShipAddVisible] = useState(false);
  const [EditMemberShipModalVisible, setEditMemberShipModalVisible] =
    useState(false);
  const [UpdateMemberShipData, setUpdateMemberShipData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const { id } = useParams();

  const memberShipData = async () => {
    const branchMemShipId = "625fa271c7f907883eb2ed07";
    const getData = await axios.get(
      `http://localhost:8000/api/memberships/${branchMemShipId}`
    );

    setTableData(getData.data);
  };

  useEffect(() => {
    memberShipData();
  }, []);

  const addMemberShipData = async (values) => {
    let body = {
      name: values.name,
      type: values.type,
      duration: values.duration,
      amount: values.amount,
    };
    const branchMemShipId = "625fa271c7f907883eb2ed07";
    await axios.post(
      `http://localhost:8000/api/membership/${branchMemShipId}`,
      body
    );
    memberShipData();
  };

  const memberShipAddOnFinish = (values) => {
    addMemberShipData(values);
    setMemberShipAddVisible(false);
  };

  // Delete
  const onMemShipDataDelete = async (record) => {
    const deleteId = record._id;
    await axios.delete(`http://localhost:8000/api/membership/${deleteId}`);
    memberShipData();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const MemberShipAddShowModal = () => {
    setMemberShipAddVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      render: (text) => <a>{text}</a>,
    },

    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Action",
      key: "action",

      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "blue" }}
            onClick={() => {
              setEditMemberShipModalVisible(true);
              setUpdateMemberShipData(record);
            }}
          />
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onMemShipDataDelete(record)}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
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
        onClick={MemberShipAddShowModal}
      >
        {" "}
        <PlusCircleOutlined />
        ADD MEMBERSHIP
      </Button>
      <Modal
        title="Add Membership"
        visible={MemberShipAddVisible}
        onCancel={() => setMemberShipAddVisible(false)}
        footer={null}
        width={800}
        height={500}
      >
        <AddMemberShip
          onMemberShipFinish={memberShipAddOnFinish}
          onMemberShipFinishFailed={onFinishFailed}
          setMemberShipAddVisible={setMemberShipAddVisible}
        />
      </Modal>

      <Modal
        title="Edit  Membership"
        visible={EditMemberShipModalVisible}
        onCancel={() => setEditMemberShipModalVisible(false)}
        footer={null}
        width={800}
        height={500}
      >
        <EditMemberShip
          onFinishFailed={onFinishFailed}
          setEditMemberShipModalVisible={setEditMemberShipModalVisible}
          UpdateMemberShipData={UpdateMemberShipData}
          memberShipData={memberShipData}
        />
      </Modal>
      <div style={{ backgroundColor: "white", marginTop: 50, padding: 20 }}>
        <Table columns={columns} dataSource={tableData} rowKey="_id" />
      </div>
    </>
  );
}

export default MemberShip;
