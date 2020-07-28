/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import {
  Button,
  Card,
  Divider,
  Steps,
} from 'antd';
import firebase from 'firebase/app';
import 'firebase/auth';
import LoginForm from '../../Shared/LoginForm/LoginForm';
import RegisterDrawer from '../../Shared/RegisterDrawer/RegisterDrawer';
import userData from '../../../Helpers/Data/userData';
import './Home.scss';

export default function Home(props) {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({});

  const showDrawer = () => {
    setVisible(true);
  };

  const loginClickEvent = (e) => {
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
          // save the token to the session storage
          .then((token) => sessionStorage.setItem('token', token));
      })
      .then(() => {
        const newUser = {
          fullName: displayName,
          Email: email,
          FirebaseUID: uid,
        };
        userData.SignUpThroughGoogleAuth(newUser)
          .then((result) => {
            setUser(result);
          });
      })
      .catch((errorFromMenuComponent) => console.error(errorFromMenuComponent));
  };

  return (
    <div className="home">
      <div className="loginPictureForm">
        <div className="loginCardContainer">
          <Card style={{ width: 600, backgroundColor: '#ddf5f8' }} className="loginCard">
            <div className="loginCardContent">
            <Divider>Sign in</Divider>
              <div className="signInWithGoogle">
                <LoginForm />
              </div>
                <Divider>Or Sign Up</Divider>
              <div className="loginButtonGroup">
                <div className="googleSignIn">
                  <Button type="ghost" onClick={loginClickEvent}>Sign In With Google Email</Button>
                </div>
                <div className="registerButton">
                  <Button type="ghost" onClick={showDrawer}>Register For An Account</Button>
                </div>
              </div>
            </div>
          </Card>
         </div>
      </div>
      <RegisterDrawer visible={visible} setVisible={setVisible} />
    </div>
  );
}
