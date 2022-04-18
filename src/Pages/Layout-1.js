import { Layout } from "antd";
import icon from "../images/spring-fit.png";

import Branch from "../Component/Branch";

function Home() {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout className="site-layout">
      <Header
        className="site-layout-background"
        style={{ padding: 0, height: 90, backgroundColor: "black" }}
      >
        <img
          src={icon}
          alt="spring-fit icon"
          style={{ width: 80, height: 80, alignItems: "center" }}
        />
      </Header>
      <Content
        style={{ margin: "24px 16px 0", overflow: "initial", minHeight: 500 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, textAlign: "center" }}
        >
          <Branch />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default Home;
