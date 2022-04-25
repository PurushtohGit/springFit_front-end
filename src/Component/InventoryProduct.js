import { Layout } from "antd";
import { Outlet } from "react-router";
import icon from "../images/spring-fit.png";

import Product from "../Pagess/Products/Products";

function Inven() {
  const { Header, Content } = Layout;
  return (
    <Layout className="site-layout">
      <Header
        className="site-layout-background"
        style={{ padding: 0, height: 90 }}
      >
        <img
          src={icon}
          alt="spring-fit icon"
          style={{
            width: 80,
            height: 80,
            margin: "0 auto",
            display: "block",
          }}
        />
      </Header>
      <Header
        style={{
          marginTop: 30,
          backgroundColor: "#BAB5B5",
          margin: "48px 30px 0",
          borderRadius: 10,
        }}
      >
        <h1>Product Details</h1>
      </Header>
      <Content
        style={{
          margin: "24px 16px 0",
          overflow: "initial",
          height: "100vh",
        }}
      >
        <Product />
      </Content>
    </Layout>
  );
}

export default Inven;
