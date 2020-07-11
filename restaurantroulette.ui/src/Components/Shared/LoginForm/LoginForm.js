import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginForm.scss';

export default function NormalLoginForm() {
  const onFinish = (values) => {
    firebase.auth().signInWithEmailAndPassword(values.email, values.password);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <div className="loginFormButton">
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
