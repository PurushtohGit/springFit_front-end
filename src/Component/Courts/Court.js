import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Space, Modal, Button, Popconfirm } from "antd";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import AddCourt from "./AddCourt";

import EditCourt from "./EditCourt";

function Court() {
  const { id } = useParams();
  const [CourtData, setCourtData] = useState([]);
  const [EditCourtModalVisible, setEditCourtModalVisible] = useState(false);
  const [AddModalVisible, setAddModalVisible] = useState(false);
  const [updateCourtData, setUpdateCourtData] = useState([]);

  const callCourtData = async () => {
    const getCourtData = await axios.get(
      `http://localhost:8000/api/courts/${id}`
    );

    setCourtData(getCourtData.data);
  };

  useEffect(() => {
    callCourtData();
  }, []);

  // delete Row
  const onDelete = async (record) => {
    const deleteId = record._id;
    await axios.delete(`http://localhost:8000/api/court/${deleteId}`);
    console.log(record);
    callCourtData();
  };

  // ADD FORM
  const addCourtData = async (values) => {
    let body = {
      name: values.name,
      playersAllowed: {
        onCoaching: values.onCoaching,
        onMembership: values.onMembership,
      },
      branchId: id,
    };
    await axios.post(`http://localhost:8000/api/court`, body);
    callCourtData();
  };

  const onFinish = (values) => {
    addCourtData(values);
    setAddModalVisible(false);
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
      title: "Court Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Players Allowed",
      dataIndex: "playersAllowed",
      children: [
        {
          title: "Coaching",
          // dataIndex: "playersAllowed.onCoaching",
          render: (record) => record.playersAllowed.onCoaching,
          key: "companyAddress",
          width: 200,
        },
        {
          title: "Membership",
          // dataIndex: "playersAllowed.onMembership",
          key: "onMembership",
          render: (record) => record.playersAllowed.onMembership,
        },
      ],
    },

    {
      title: "Action",
      key: "action",
      width: "25%",
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "blue" }}
            onClick={() => {
              setEditCourtModalVisible(true);
              setUpdateCourtData(record);
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
      <Button
        type="primary"
        style={{ fontWeight: 800, float: "right", marginBottom: 20 }}
        onClick={() => setAddModalVisible(true)}
      >
        ADD
      </Button>
      <Modal
        title="Add Branch"
        visible={AddModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
        width={800}
        height={500}
      >
        <AddCourt
          onCourtFinish={onFinish}
          onCourtFinishFailed={onFinishFailed}
          setCourtAddModalVisible={setAddModalVisible}
        />
      </Modal>
      <Modal
        title="Court Edit"
        visible={EditCourtModalVisible}
        onCancel={() => setEditCourtModalVisible(false)}
        footer={null}
        width={800}
        height={500}
      >
        <EditCourt
          onFinishFailed={onFinishFailed}
          setEditCourtModalVisible={setEditCourtModalVisible}
          updateCourtData={updateCourtData}
          callCourtData={callCourtData}
        />
      </Modal>

      <Table columns={columns} dataSource={CourtData} rowKey="_id" />
    </>
  );
}

export default Court;
