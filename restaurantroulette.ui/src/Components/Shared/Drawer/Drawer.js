import React, { useState, useEffect } from 'react';
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

const pic = 'https://4xaf73575m-flywheel.netdna-ssl.com/wp-content/uploads/2020/03/Blank-Person.jpg';

export default class DrawerOption extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    userData.getUserByFirebaseUID(authData.getUid())
      .then((response) => {
        this.setState({ user: response });
      })
      .catch((errorFromDrawerUser) => console.error(errorFromDrawerUser));
  }

  render() {
    const { onClose, visible } = this.props;
    const { user } = this.state;
    const fullName = `${user.firstName}${user.lastName}`;
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
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
        <div className="profileCard">
          <div className="profileCardContainer">
            <div className="avatarImage">
              <img alt="example" src={pic} className="profilePhoto"/>
            </div>
            <div className="descriptionCard">
              <Card title={fullName} style={{ width: 300, height: 250 }}>
                <p>{user.email}</p>
                <p>{user.phoneNumber}</p>
              </Card>
            </div>
          </div>
          <div className="buttonContainer">
            <div className="editProfilebutton">
              <Button type="primary" block>
                Edit Profile
              </Button>
            </div>
            <div className="openSessionButton">
              <Button type="primary" block>
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
