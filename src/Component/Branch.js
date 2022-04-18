import { Table, Space, Modal, Form, Input, Button } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";

function Branch() {
  const [tableData, setTableData] = useState([]);

  const callData = async () => {
    const CompanyId = "624fbad90490893e8700f802";
    const getData = await axios.get(
      `http://localhost:8000/api/branch/${CompanyId}`
    );

    setTableData(getData.data.branch);
  };

  useEffect(() => {
    callData();
  }, []);

  const [EditModalVisible, setEditModalVisible] = useState(false);

  const EditShowModal = () => {
    setEditModalVisible(true);
  };

  const EditHandleOk = () => {
    setEditModalVisible(false);
  };

  const EditHandleCancel = () => {
    setEditModalVisible(false);
  };

  const [AddModalVisible, setAddModalVisible] = useState(false);

  const AddShowModal = () => {
    setAddModalVisible(true);
  };

  const AddHandleCancel = () => {
    setAddModalVisible(false);
  };

  // Form
  const addData = async (values) => {
    console.log(values);
    const CompanyId = "624fbad90490893e8700f802";
    await axios.post(`http://localhost:8000/api/branch/${CompanyId}`, values);
    callData();
    // setTableData([...tableData, values]);
  };

  const onFinish = (values, e) => {
    addData(values);
    setAddModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined style={{ color: "blue" }} onClick={EditShowModal} />
          <Modal
            title="Basic Modal"
            visible={EditModalVisible}
            onCancel={EditHandleCancel}
            footer={null}
          >
            <Form
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
              onFinish={onFinish}
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
                label="Address"
                name="address"
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
                label="Mobile"
                name="mobile"
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
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
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
                  onClick={AddHandleCancel}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <DeleteOutlined style={{ color: "red" }} />
          <EyeOutlined style={{ color: "green" }} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        style={{ fontWeight: 800, float: "right", marginBottom: 20 }}
        onClick={AddShowModal}
      >
        ADD
      </Button>
      <Modal
        title="Add Branch"
        visible={AddModalVisible}
        onCancel={AddHandleCancel}
        footer={null}
        width={800}
        height={500}
      >
        <Form
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
          onFinish={onFinish}
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
            label="Address"
            name="address"
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
            label="Mobile"
            name="mobile"
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
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
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
              onClick={AddHandleCancel}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={tableData} />
    </>
  );
}

export default Branch;
