import { Button, Form, Input, Space } from "antd";
import React from "react";

interface SecondStepInterface {
  email: string;
  toNextStep: () => void;
  setOtpCode: (otpCode: string) => void;
}

export const SecondStep: React.FC<SecondStepInterface> = (props) => {
  const { email, toNextStep, setOtpCode } = props;

  const handleSubmit = (values: { otp: string } | any) => {
    setOtpCode(values.otp);
    toNextStep();
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
        <Input placeholder="پست الکترونیکی" disabled />
      </Form.Item>
      <Form.Item
        name="otp"
        rules={[{ required: true, message: "وارد کردن کد OTP اجباری است" }]}
        className="form-inputs"
        hasFeedback
      >
        <Input type="otp" placeholder="کد OTP" />
      </Form.Item>

      <Space
        // align={"center"}
        direction="vertical"
        className="button-wrapper"
      >
        <Button type="primary" htmlType="submit" className="main-button">
          بعدی
        </Button>
      </Space>
    </Form>
  );
};
