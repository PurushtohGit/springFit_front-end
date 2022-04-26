import React from "react";
import { Table, Space, Modal, Button, Popconfirm } from "antd";

function CourtBooking() {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Type",
      dataIndex: "member",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />;
    </>
  );
}

export default CourtBooking;
