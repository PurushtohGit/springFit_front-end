import { Button } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import React from "react";

function MemberDetail() {
  return (
    <>
      <Header
        style={{
          marginTop: 10,
          backgroundColor: "white",
          margin: "48px 30px 0",
          borderRadius: 10,
        }}
      >
        <h1>MEMBER DETAILS</h1>
      </Header>
    </>
  );
}

export default MemberDetail;
