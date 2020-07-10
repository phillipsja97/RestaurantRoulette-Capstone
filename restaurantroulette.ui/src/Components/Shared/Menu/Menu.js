import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Menu, Badge, Avatar, Button } from 'antd';
import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import Drawer from '../Drawer/Drawer';
import userData from '../../../Helpers/Data/userData';
import './Menu.scss';
import 'antd/dist/antd.css';

class MenuComponent extends React.Component {
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

  componentDidMount() {
    userData.getUserByUserId()
      .then((response) => {
        this.setState({ user: response });
      })
      .catch((errorFromGetUser) => console.error(errorFromGetUser));
  }

  render() {
    const { user, visible } = this.state;
    const { authed } = this.props;
    return (
      <div className="menu">
        <Drawer user={user} visible={visible} onClose={this.onClose} authed={authed}/>
          <Menu mode="horizontal" className="menu">
            {(authed)
              ? <Button type="ghost" onClick={this.logMeOut} className="avatarButton">Logout</Button>
              : <Button type="ghost" onClick={this.loginClickEvent} className="avatarButton">Login</Button>
            }
            {(authed)
              ? <>
                <Badge count={1} className='avatarButton'>
                    <Button type="ghost" icon={<UserOutlined />} onClick={this.showDrawer} />
                </Badge>
                <p className="avatarButton">Logged In: {user.firstName}{user.lastName}</p>
                </>
              : <Badge></Badge>
            }
          </Menu>
      </div>
    );
  }
}

export default MenuComponent;
