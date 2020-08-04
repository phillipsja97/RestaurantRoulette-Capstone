/* eslint-disable operator-linebreak */
/* eslint-disable arrow-body-style */
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import {
  Button,
  PageHeader,
  Menu,
  Dropdown,
} from 'antd';
import { UserOutlined, GoogleOutlined } from '@ant-design/icons';
import TitleIcon from '../../../Assets/Title';
import MobileTitleIcon from '../../../Assets/MenuTitleMobile';
import Drawer from '../Drawer/Drawer';
import userData from '../../../Helpers/Data/userData';
import authData from '../../../Helpers/Data/authData';
import './Menu.scss';
import 'antd/dist/antd.css';

const { SubMenu } = Menu;

class MenuComponent extends React.Component {
  state = {
    visible: false,
    user: {},
    openKeys: ['sub1'],
  }

  showDrawer = () => {
    this.setState({ visible: true });
  };

  onClose = () => {
    this.setState({ visible: false });
  };

  logMeOut = (e) => {
    firebase.auth().signOut();
  };

  componentDidMount() {
    const { authed } = this.props;
    if (authed) {
      userData.getUserByFirebaseUID(authData.getUid())
        .then((result) => {
          this.setState({ user: result });
        })
        .catch((errorFromGetUserInMenu) => console.error(errorFromGetUserInMenu));
    }
  }

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
            this.setState({ user: result.data });
          });
      })
      .catch((errorFromMenuComponent) => console.error(errorFromMenuComponent));
  };

  goToAddFriends = () => {
    this.setState({ visible: false });
  }

  mobileMenu = () => {
    const { authed } = this.props;
    const { user } = this.state;
    return <Menu>
            <Link to={`/${user.id}/profile`}>
              <Menu.Item key="0">Edit Profile</Menu.Item>
            </Link>
            <Menu.Divider />
            <Link to={`/${user.id}/addFriends`}>
              <Menu.Item key="1">Add/Manage Followers</Menu.Item>
            </Link>
            <Menu.Divider />
            <Link>
              <Menu.Item key="3" onClick={this.logMeOut}>Logout</Menu.Item>
            </Link>
          </Menu>;
  };

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find((key) => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  desktopRender = () => {
    const { authed } = this.props;
    const { visible } = this.state;
    return <div className="menu">
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
        </div>;
  }

  mobileRender = () => {
    const { authed } = this.props;
    return <React.Fragment>
            <PageHeader
              ghost={true}
              title={<Link to={'/'}><MobileTitleIcon/></Link>}
              extra={[
                (authed)
                  ? <Dropdown overlay={this.mobileMenu} trigger={['click']}>
                      <Button type="ghost"icon={<UserOutlined />}>Profile</Button>
                    </Dropdown>
                  : <Button type="ghost" icon={<GoogleOutlined />} onClick={this.loginClickEvent} className="loginButton">Login</Button>,
              ]}
            />
            </React.Fragment>;
  }

  render() {
    const { visible } = this.state;
    const { authed } = this.props;
    return (
      <Media queries={{
        small: '(min-width: 320px) and (max-width: 767px)',
        medium: '(min-width: 768px) and (max-width: 1024px)',
        large: '(min-width: 1023px)',
      }}>
        {(matches) => (
          <React.Fragment>
                  {matches.small && this.mobileRender()}
                  {matches.medium && this.desktopRender()}
                  {matches.large && this.desktopRender()}
          </React.Fragment>
        )}
      </Media>
    );
  }
}

export default MenuComponent;
