/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import {
  Button,
  Card,
  Divider,
  Carousel,
  Steps,
} from 'antd';
import firebase from 'firebase/app';
import 'firebase/auth';
import LoginForm from '../../Shared/LoginForm/LoginForm';
import RegisterDrawer from '../../Shared/RegisterDrawer/RegisterDrawer';
import './Home.scss';

const { Step } = Steps;

export default function Home(props) {
  const [current, setCurrent] = useState();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  function onChange(a, b, c) {
  }

  function onChangeSteps(newCurrent) {
    setCurrent(newCurrent);
  }

  const loginClickEvent = (e) => {
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

  return (
    <div className="home">
      <div className="loginPictureForm">
        <div className="loginCardContainer">
          <Card style={{ width: 600, backgroundColor: 'gray' }} className="loginCard">
            <div className="loginCardContent">
              <div className="signInWithGoogle">
                <LoginForm />
              </div>
                <Divider>Or</Divider>
              <div className="loginButtonGroup">
                <div className="googleSignIn">
                  <Button ghost onClick={loginClickEvent}>Sign In With Google Email</Button>
                </div>
                <div className="registerButton">
                  <Button ghost onClick={showDrawer}>Register For An Account</Button>
                </div>
              </div>
            </div>
          </Card>
         </div>
      </div>
        <div className="bottomHomePage">
          <h1 className="howItWorksTitle">Here's how it works</h1>
          <Steps current={current} onChange={onChangeSteps}>
          <Step title="Step 1" description="This is a description." />
          <Step title="Step 2" description="This is a description." />
          <Step title="Step 3" description="This is a description." />
          <Step title="Step 4" description="This is a description." />
        </Steps>
        <Carousel afterChange={onChange}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Carousel>
        </div>
        <RegisterDrawer visible={visible} setVisible={setVisible} />
    </div>
  );
}
