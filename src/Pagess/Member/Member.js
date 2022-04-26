import { Table, Tag, Space, Button, Popconfirm, Modal } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AddMember from "./AddMember";
import EditMember from "./EditMember";
import { Link } from "react-router-dom";
function Member() {
  // Add Modal
  const [MemberAddVisible, setMemberAddVisible] = useState(false);
  const [EditMemberModalVisible, setEditMemberModalVisible] = useState(false);
  const [UpdateMemberData, setUpdateMemberData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [MemberViewVisible, setMemberViewVisible] = useState(false);

  const { id } = useParams();

  const memberData = async () => {
    const branchMemId = id;
    const getData = await axios.get(
      `http://localhost:8000/api/member/${branchMemId}`
    );

    setTableData(getData.data.member);
  };

  useEffect(() => {
    memberData();
  }, []);

  const memberAddOnFinish = async (value) => {
    await axios.post(`http://localhost:8000/api/member/${id}`, value);
    memberData();
    setMemberAddVisible(false);
  };

  // Delete
  const onMemDataDelete = async (record) => {
    const deleteId = record._id;
    await axios.delete(`http://localhost:8000/api/members/${deleteId}`);
    memberData();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const MemberAddShowModal = () => {
    setMemberAddVisible(true);
  };

  const columns = [
    {
      title: "RFID",
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
      title: "Booking",
      key: "booking",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`${record._id}/member-details`}>
            <Button onClick={() => setMemberViewVisible(true)}>
              <EyeOutlined style={{ color: "green" }} />
              View
            </Button>
          </Link>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",

      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "blue" }}
            onClick={() => {
              setEditMemberModalVisible(true);
              setUpdateMemberData(record);
            }}
          />
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onMemDataDelete(record)}
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
        onClick={MemberAddShowModal}
      >
        <PlusCircleOutlined />
        ADD MEMBER
      </Button>
      <Modal
        title="Add Member "
        visible={MemberAddVisible}
        onCancel={() => setMemberAddVisible(false)}
        footer={null}
        width={800}
        height={500}
      >
        <AddMember
          onMemberFinish={memberAddOnFinish}
          onMemberFinishFailed={onFinishFailed}
          setMemberAddVisible={setMemberAddVisible}
        />
      </Modal>

      <Modal
        title=" Edit Member "
        visible={EditMemberModalVisible}
        onCancel={() => setEditMemberModalVisible(false)}
        footer={null}
        width={800}
        height={500}
      >
        <EditMember
          onFinishFailed={onFinishFailed}
          setEditMemberModalVisible={setEditMemberModalVisible}
          UpdateMemberData={UpdateMemberData}
          memberData={memberData}
        />
      </Modal>
      <div style={{ backgroundColor: "white", marginTop: 50, padding: 20 }}>
        <Table columns={columns} dataSource={tableData} rowKey="_id" />
      </div>
    </>
  );
}

export default Member;
