import { Form, Input } from "antd";
import React from "react";

interface AttendeeDetailsProps {
  onSubmit: (values: { photoUrl: string; name: string; email: string }) => void;
}

const AttendeeDetails: React.FC<AttendeeDetailsProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: {
    photoUrl: string;
    name: string;
    email: string;
  }) => {
    onSubmit(values);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name={"photoUrl"}
        label="Photo URL"
        rules={[{ required: true, message: "Please enter your photo URL" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"name"}
        label="Full Name"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"email"}
        label="Email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default AttendeeDetails;
