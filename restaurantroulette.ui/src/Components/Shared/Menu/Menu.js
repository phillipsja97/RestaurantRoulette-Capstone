import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Menu, Badge, Avatar, Button } from 'antd';
import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import Drawer from '../Drawer/Drawer';
import userData from '../../../Helpers/Data/userData';
import authData from '../../../Helpers/Data/authData';
import './Menu.scss';
import 'antd/dist/antd.css';

class MenuComponent extends React.Component {
  state = {
    visible: false,
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
    firebase.auth().signInWithPopup(provider)
      .then((cred) => {
      // get token from firebase
        cred.user.getIdToken()
          // save the token to the session storage
          .then((token) => sessionStorage.setItem('token', token));
      });
  };

  render() {
    const { visible } = this.state;
    const { authed } = this.props;
    const user = firebase.auth().currentUser;
    return (
      <div className="menu">
        {(authed)
          ? <Menu mode="horizontal" className="menu">
              <Drawer visible={visible} onClose={this.onClose} authed={authed}/>
                <Button type="ghost" onClick={this.logMeOut} className="avatarButton">Logout</Button>
                    <Badge count={1} className='avatarButton'>
                        <Button type="ghost" icon={<UserOutlined />} onClick={this.showDrawer} />
                    </Badge>
                      <p className="avatarButton">Logged In: {user.displayName}</p>
            </Menu>
          : <Menu mode="horizontal" className="menu">
              <Button type="ghost" onClick={this.loginClickEvent} className="avatarButton">Login</Button>
            </Menu>
            }
      </div>
    );
  }
}

export default MenuComponent;
