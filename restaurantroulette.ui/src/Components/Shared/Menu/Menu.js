import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { Menu, Badge, Avatar, Button } from 'antd';
import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import Drawer from '../Drawer/Drawer';
import userData from '../../../Helpers/Data/userData';
import './Menu.scss';
import 'antd/dist/antd.css';

export default function Navbar(props) {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({});

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    userData.getUserByUserId()
      .then((response) => {
        setUser(response);
      })
      .catch((errorFromGetUser) => console.error(errorFromGetUser));
  }, []);

  const logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  const loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <div className="menu">
      <Drawer visible={visible} onClose={onClose} user={user}/>
        <Menu mode="horizontal" className="menu">
          <MenuFoldOutlined onClick={showDrawer} style={{ fontSize: '32px', color: '#000000' }} className='drawerButton' />
          <Badge count={1} className='avatarButton'>
            <Avatar shape="square" icon={<UserOutlined />} />
          </Badge>
          <Button onClick={loginClickEvent}>Login</Button>
          <Button onClick={logMeOut}>Logout</Button>
        </Menu>
    </div>
  );
}
