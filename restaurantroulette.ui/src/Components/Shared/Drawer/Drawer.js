import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Button,
  Card,
} from 'antd';
// import userData from '../../../Helpers/Data/userData';
import 'antd/dist/antd.css';
import './Drawer.scss';

const pic = 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg';

export default function DrawerOption(props) {
  const fullName = `${props.user.firstName} ${props.user.lastName}`;
  const Email = props.user.email;
  const PhoneNumber = props.user.phoneNumber;

  return (
    <>
      <Drawer
        title="Profile"
        width={720}
        onClose={props.onClose}
        visible={props.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={props.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={props.onClose} type="primary">
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
              <p>{Email}</p>
              <p>{PhoneNumber}</p>
            </Card>
          </div>
        </div>
        <div className="buttonContainer">
          <div className="editProfilebutton">
            <Button type="primary" block>
              Primary
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
