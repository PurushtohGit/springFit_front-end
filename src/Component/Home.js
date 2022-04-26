import { Layout } from "antd";
import icon from "../images/spring-fit.png";

import Branch from "../Pagess/Branch/Branch";

function Home() {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout className="site-layout">
      <Header
        className="site-layout-background"
        style={{ padding: 0, height: 90 }}
      >
        <img
          src={icon}
          alt="spring-fit icon"
          style={{ width: 80, height: 80 }}
        />
      </Header>
      <Content
        style={{
          // margin: "24px 16px 0",
          overflow: "initial",
        }}
      >
        <div className="site-layout-background" style={{ padding: 24 }}>
          <Branch />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2018 SPRING FIT</Footer>
    </Layout>
  );
}

export default Home;
