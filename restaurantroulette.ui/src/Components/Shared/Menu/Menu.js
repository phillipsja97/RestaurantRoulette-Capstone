import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import {
  Button,
  PageHeader,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import TitleIcon from '../../../Assets/Title';
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
    let displayName = '';
    let email = '';
    let uid = '';
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((cred) => {
        displayName = cred.user.displayName;
        email = cred.user.email;
        uid = cred.user.uid;
        cred.user.getIdToken()
          .then((token) => sessionStorage.setItem('token', token));
      })
      .then(() => {
        const user = {
          fullName: displayName,
          Email: email,
          FirebaseUID: uid,
        };
        userData.SignUpThroughGoogleAuth(user)
          .then((result) => {
            this.setState({ user: result });
          });
      })
      .catch((errorFromMenuComponent) => console.error(errorFromMenuComponent));
  };

  goToAddFriends = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    const { authed } = this.props;
    return (
      <div className="menu">
        {(authed)
          ? <React.Fragment>
              <PageHeader
                ghost={true}
                title={<Link to={'/'}><TitleIcon /></Link>}
                extra={[
                  <Button key="1" type="ghost" icon={<UserOutlined />} onClick={this.showDrawer} />,
                  <Button key="2" type="ghost" onClick={this.logMeOut}>
                    Logout
                  </Button>,
                ]}
              />
              <Drawer visible={visible} onClose={this.onClose} authed={authed} goToAddFriends={this.goToAddFriends}/>
            </React.Fragment>
          : <React.Fragment>
              <PageHeader
                  ghost={true}
                  title={<Link to={'/'}><TitleIcon /></Link>}
                  extra={[
                    <Button key="1" type="ghost" onClick={this.loginClickEvent}>
                      Sign in with Google Email
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
