import React, { useState, useEffect } from 'react';
import { Menu, Badge, Avatar } from 'antd';
import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import Drawer from '../Drawer/Drawer';
import userData from '../../../Helpers/Data/userData';
import './Menu.scss';
import 'antd/dist/antd.css';

export default function Navbar() {
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

  return (
    <div className="menu">
      <Drawer visible={visible} onClose={onClose} user={user}/>
        <Menu onClick={showDrawer} mode="horizontal" className="menu">
          <MenuFoldOutlined onClick={showDrawer} style={{ fontSize: '32px', color: '#000000' }} className='drawerButton' />
          <Badge count={1} className='avatarButton'>
            <Avatar shape="square" icon={<UserOutlined />} />
          </Badge>
        </Menu>
    </div>
  );
}
