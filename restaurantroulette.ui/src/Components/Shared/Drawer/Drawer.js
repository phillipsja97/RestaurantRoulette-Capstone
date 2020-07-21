import React from 'react';
import {
  Drawer,
  Button,
  Card,
} from 'antd';
import firebase from 'firebase/app';
import 'firebase/auth';
import userData from '../../../Helpers/Data/userData';
import authData from '../../../Helpers/Data/authData';
import 'antd/dist/antd.css';
import './Drawer.scss';

export default class DrawerOption extends React.Component {
  state = {
    user: {},
  }

  getUserByUID = () => {
    const { authed } = this.props;
    if (authed) {
      userData.getUserByFirebaseUID(authData.getUid())
        .then((response) => {
          this.setState({ user: response });
        })
        .catch((errorFromDrawerUser) => console.error(errorFromDrawerUser));
    }
  }

  componentDidMount() {
    const { authed } = this.props;
    if (authed) {
      setTimeout(this.getUserByUID, 4000);
    }
  }

  render() {
    const { onClose, visible } = this.props;
    const { user } = this.state;
    const photo = firebase.auth().currentUser.photoURL;
    const blankPhoto = 'https://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg';
    return (
      <>
        <Drawer
          title="Profile"
          width={720}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }} type="ghost">
                Cancel
              </Button>
              <Button onClick={onClose} type="ghost">
                Submit
              </Button>
            </div>
          }
        >
        <div className="profileCard">
          <div className="profileCardContainer">
            <div className="avatarImage">
              {(photo === null)
                ? <img alt="example" src={blankPhoto} className="profilePhoto"/>
                : <img alt="example" src={photo} className="profilePhoto"/>
              }
            </div>
            <div className="descriptionCard">
              <Card title={user.fullName} style={{ width: 300, height: 250 }}>
                <p>{user.email}</p>
                <p>{user.phoneNumber}</p>
              </Card>
            </div>
          </div>
          <div className="buttonContainer">
            <div className="editProfilebutton">
              <Button type="ghost" block>
                Edit Profile
              </Button>
            </div>
            <div className="openSessionButton">
              <Button type="ghost" block>
                Primary
              </Button>
            </div>
          </div>
        </div>
        </Drawer>
      </>
    );
  }
}
