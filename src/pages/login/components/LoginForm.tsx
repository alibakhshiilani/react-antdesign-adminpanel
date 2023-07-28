import { useHistory } from "react-router-dom";
import { Button, Form, Input, message, Space, Spin } from "antd";
import React, { useState } from "react";
import { handleLogin } from "../login.api";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (values: { username: string; password: string }) => {
    setLoading(true);
    handleLogin(values)
      .then((response) => {
        // message.success("loginSuccessfully");
        const {
          access_token,
          refresh_token,
          expires_in /* token_type, scope */,
        } = response.data;

        if (access_token) {
          localStorage.setItem("access_token", access_token);
        }

        if (refresh_token) {
          localStorage.setItem("refresh_token", refresh_token);
        }

        if (expires_in) {
          localStorage.setItem("expires_in", expires_in);
        }

        if (window.location.pathname.search("/login") > -1) {
          window.location.pathname = "/";
        } else {
          window.location.reload();
          // TODO: to better, why here?
        }
      })
      .catch((error) => {
        // if (error.response.data && error.response.data.error_description) {
        //   // message.error(error.response.data.error_description);
        //   message.error("incorrect email or password!");
        // }

        message.error("ایمیل یا رمز عبور صحیح نیست");

        localStorage.clear();
        sessionStorage.clear();

        if (window.location.pathname.search("/login") < 0) {
          window.location.pathname = "/login";
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Spin spinning={loading}>
      <Form onFinish={handleSubmit} style={{ marginTop: "10ch" }}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "وارد کردن نام کاربری اجباری است",
            },
          ]}
          hasFeedback
        >
          <Input className="login-form-inputs" placeholder="نام کاربری" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "وارد کردن رمز اجباری است" }]}
          hasFeedback
        >
          <Input.Password
            className="login-form-inputs"
            type="password"
            placeholder="رمز عبور"
          />
        </Form.Item>
        <div>
          <Space
            // align={"center"}
            direction="vertical"
            className="button-wrapper"
          >
            <Button
              disabled={loading}
              type="primary"
              htmlType="submit"
              className="main-button"
            >
              ورود
            </Button>
            <Button
              type="text"
              onClick={() => history.push("/forgot-password")}
              className="secondary-button"
            >
              رمز خود را فراموش کرده اید؟
            </Button>
          </Space>
        </div>
      </Form>
    </Spin>
  );
};
