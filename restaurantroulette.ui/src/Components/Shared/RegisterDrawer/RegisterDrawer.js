import React, { useState } from 'react';
import {
  Drawer,
  Button,
  Form,
  Input,
} from 'antd';
import firebase from 'firebase/app';
import 'firebase/auth';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import userData from '../../../Helpers/Data/userData';
import 'antd/dist/antd.css';
import './RegisterDrawer.scss';

export default function RegisterDrawer(props) {
  const [user, setUser] = useState({});
  const onClose = () => {
    props.setVisible(false);
  };

  const onFinish = (values) => {
    const fullName = values.name;
    const emails = values.email;
    const phone = values.phoneNumber;
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
      .then((theUser) => {
        setUser(theUser);
      }).then(() => {
        const userToAdd = {
          FullName: fullName,
          Email: emails,
          PhoneNumber: phone,
          FirebaseUID: firebase.auth().currentUser.uid,
        };
        userData.SignUpOrSignIn(userToAdd)
          .then((result) => {
            setUser(result);
          });
      })
      .then(() => {
        const current = firebase.auth().currentUser;
        current.updateProfile()
          .then(() => {
            current.displayName = fullName;
          });
      })
      .catch((errorFromSigningUpUser) => console.error(errorFromSigningUpUser));
  };

  return (
    <Drawer
          title="Create a new account"
          width={720}
          onClose={onClose}
          visible={props.visible}
          bodyStyle={{ paddingBottom: 80 }}
    >
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Email' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'What is your name?' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="name"
          placeholder="Name"
        />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        rules={[{ required: true, message: 'What is your phone number?' }]}
      >
        <Input
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          type="phoneNumber"
          placeholder="Phone Number"
        />
      </Form.Item>
      <Form.Item>
        <div className="loginFormButton">
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign Up
          </Button>
        </div>
      </Form.Item>
    </Form>
    </Drawer>
  );
}
