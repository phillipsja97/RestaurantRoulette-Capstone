import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Divider } from 'antd';
import LoginForm from '../../Shared/LoginForm/LoginForm';
import './Home.scss';

export default function Home(props) {
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
                  <Button ghost>Sign In With Google Email</Button>
                </div>
                <div className="registerButton">
                  <Button ghost>Register For An Account</Button>
                </div>
              </div>
            </div>
          </Card>
         </div>
      </div>
        <div className="bottomHomePage">
        </div>
    </div>
  );
}
