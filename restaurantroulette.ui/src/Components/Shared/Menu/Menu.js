import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Menu, Badge, Avatar, Button } from 'antd';
import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import Drawer from '../Drawer/Drawer';
import userData from '../../../Helpers/Data/userData';
import './Menu.scss';
import 'antd/dist/antd.css';

class Navbar extends React.Component {
  state = {
    visible: false,
    user: {},
  }

  showDrawer = () => {
    this.setState({ visible: true });
  };

  onClose = () => {
    this.setState({ visible: false });
  };

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  componentDidMount = () => {
    userData.getUserByUserId()
      .then((response) => {
        this.setState({ user: response });
      })
      .catch((errorFromGetUser) => console.error(errorFromGetUser));
  }

  render() {
    const { visible, user } = this.state;
    return (
      <div className="menu">
        <Drawer visible={visible} onClose={this.onClose} user={user}/>
          <Menu mode="horizontal" className="menu">
            <MenuFoldOutlined onClick={this.showDrawer} style={{ fontSize: '32px', color: '#000000' }} className='drawerButton' />
            <Badge count={1} className='avatarButton'>
              <Avatar shape="square" icon={<UserOutlined />} />
            </Badge>
            <Button onClick={this.loginClickEvent}>Login</Button>
            <Button onClick={this.logMeOut}>Logout</Button>
          </Menu>
      </div>
    );
  }
}

export default Navbar;
