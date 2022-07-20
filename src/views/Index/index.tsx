/* eslint-disable jsx-a11y/alt-text */
import { EditFilled, FileDoneOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Card, message } from "antd";
import { MenuClickEventHandler, MenuInfo } from "rc-menu/lib/interface";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { getChannels } from "../../requst/article";
import { channelsAction } from "../../store/actions/article";
import { loginAction } from "../../store/actions/login";
const { Header, Content, Footer, Sider } = Layout;

const options = [
  { label: "数据展示", key: 1, icon: React.createElement(UserOutlined) },
  { label: "内容管理", key: 2, icon: React.createElement(FileDoneOutlined) },
  { label: "发布文章", key: 3, icon: React.createElement(EditFilled) },
];

interface Props {
  getChannels: Function;
}

const App: React.FC<Props> = (props) => {
  useEffect(() => {
    props.getChannels(getChannels());
  }, []);
  const navigate = useNavigate();

  function click(e: MenuInfo) {
    switch (e.key) {
      case "1":
        navigate("/index/dataShow");
        break;
      case "2":
        navigate("/index/contentAdmin");
        break;
      case "3":
        navigate("/index/submitDoc");
        break;
    }
  }
  return (
    <Layout>
      <Header className="header">
        <img
          style={{ height: "90%" }}
          src={require("../../asset/极客园.jpg")}
        ></img>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              onClick={(e) => click(e)}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={options}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Card
              className="container"
              title={
                <Breadcrumb.Item>{useLocation().pathname}</Breadcrumb.Item>
              }
              bordered={false}
              style={{ width: "100%" }}
            >
              <Outlet></Outlet>
            </Card>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default connect((state) => ({ token: state }), {
  login: loginAction,
  getChannels: channelsAction,
})(App);
