import { Layout } from "antd";
import { Outlet } from "react-router";
import icon from "../images/spring-fit.png";
import Category from "../Pagess/Category/Category";
import Items from "../Pagess/Products/Products";

function Inventory() {
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
        <h1>INVENTORY</h1>
      </Header>
      <Content
        style={{
          margin: "24px 16px 0",
          overflow: "initial",
          height: "100vh",
        }}
      >
        <Category />
      </Content>
    </Layout>
  );
}

export default Inventory;
