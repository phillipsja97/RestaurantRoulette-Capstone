import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Button,
  PageHeader,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Drawer from '../Drawer/Drawer';
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
          ? <React.Fragment>
              <PageHeader
                ghost={true}
                title="Restaurant Roulette"
                extra={[
                  <Button key="1" type="ghost" icon={<UserOutlined />} onClick={this.showDrawer} />,
                  <Button key="2" type="ghost" onClick={this.logMeOut}>
                    Logout
                  </Button>,
                ]}
              />
              <Drawer visible={visible} onClose={this.onClose} authed={authed}/>
            </React.Fragment>
          : <React.Fragment>
              <PageHeader
                  ghost={true}
                  title="Restaurant Roulette"
                  extra={[
                    <Button key="1" type="ghost" onClick={this.loginClickEvent}>
                      Login
                    </Button>,
                  ]}
              />
            </React.Fragment>
            }
      </div>
    );
  }
}

export default MenuComponent;
