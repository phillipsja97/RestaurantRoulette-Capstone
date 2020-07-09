import React, { useState } from 'react';
import { Menu, Badge, Avatar } from 'antd';
import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import Drawer from '../Drawer/Drawer';
import './Menu.scss';
import 'antd/dist/antd.css';

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="menu">
      <Drawer visible={visible} onClose={onClose}/>
        <Menu onClick={showDrawer} mode="horizontal" className="menu">
          <MenuFoldOutlined onClick={showDrawer} style={{ fontSize: '32px', color: '#000000' }} className='drawerButton' />
          <Badge count={1} className='avatarButton'>
            <Avatar shape="square" icon={<UserOutlined />} />
          </Badge>
        </Menu>
    </div>
  );
}
