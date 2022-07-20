import { Button, Card, Form, Input, message } from "antd";
import { Rule } from "antd/lib/form";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../requst/user";
import { loginAction } from "../../store/actions/login";
import "./user.scss";

export interface UserInfo {
  mobile: string;
  code: string;
}
const userInfo = {
  mobile: 13811111111,
  code: 246810,
};
function User(p: any) {
  const user: Rule[] = [
    {
      required: true,
      message: "手机号错误",
      pattern: /^[1][35789][0-9]{9}/,
    },
  ];
  const pwd: Rule[] = [
    {
      required: true,
      message: "验证码为246810",
      pattern: /246810/,
    },
  ];
  const submit = ({ mobile, code }: UserInfo) => {
    p.login(login({ mobile, code }));
  };
  const navigate = useNavigate();
  if (localStorage.tokenTime === "2430") {
    message.warning("登录认证过期请重新登录");
    localStorage.removeItem("tokenTime");
  }
  useEffect(() => {
    if (localStorage.token) {
      navigate("/");
    }
  });
  return (
    <>
      <Card className="card" style={{ marginTop: "300px" }}>
        <Form onFinish={submit} className="form">
          <div className="row">
            <Form.Item
              initialValue={userInfo.mobile}
              name="mobile"
              label="Name"
              rules={user}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="row">
            <Form.Item
              initialValue={userInfo.code}
              name="code"
              label="Pawd"
              rules={pwd}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="row">
            <Form.Item className="btnRow">
              <Button htmlType="submit">submit</Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </>
  );
}
export default connect((state) => ({ token: state }), {
  login: loginAction,
})(User);
