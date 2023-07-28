import { Button, Form, Input, message, Space } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { handleResetPass } from "../../../login.api";

interface ThirdStepInterface {
  email: string;
  otpCode: string;
  toPrevStep: () => void;
}

export const ThirdStep: React.FC<ThirdStepInterface> = (props) => {
  const { email, otpCode, toPrevStep } = props;
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (values: object | any) => {
    values.otp = otpCode;
    delete values.confirmPassword;

    setLoading(true);
    handleResetPass(values)
      .then((r) => {
        // @ts-ignore
        if (r.data.message) {
          // @ts-ignore
          message.info(r.data.message);
          history.push("/login");
        }
      })
      .catch((error) => {
        if (
          error.response.status === 400 &&
          error.response.data.message === "The token is not valid."
        ) {
          message.error("کد OTP وارد شده صحیح نیست!");
          toPrevStep();
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            type: "email",
            message: "فرمت ایمیل وارد شده صحیح نیست",
          },
        ]}
        initialValue={email}
        className="form-inputs"
        hasFeedback
      >
        <Input disabled={loading} placeholder="پست الکترونیکی" />
      </Form.Item>
      <Form.Item
        name="newPassword"
        rules={[
          { required: true, message: "وارد کردن رمز عبور جدید اجباری است" },
        ]}
        className="form-inputs"
        hasFeedback
      >
        <Input.Password placeholder="رمز عبور جدید" disabled={loading} />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={["newPassword"]}
        hasFeedback
        className="form-inputs"
        rules={[
          {
            required: true,
            message: "رمز عبور را مجددا وارد کنید!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("مقادیر وارد شده یکسان نیستند!"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="تایید رمز عبور" disabled={loading} />
      </Form.Item>

      <Space direction="vertical" className="button-wrapper">
        <Button
          type="primary"
          htmlType="submit"
          className="main-button"
          loading={loading}
        >
          ریست کردن رمز عبور
        </Button>
      </Space>
    </Form>
  );
};
