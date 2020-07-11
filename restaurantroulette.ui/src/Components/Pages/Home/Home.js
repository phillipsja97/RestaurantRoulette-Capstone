import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Divider } from 'antd';
import './Home.scss';



export default function Home(props) {
  return (
    <div className="home">
      <div className="loginPictureForm">
        <div className="loginCardContainer">
          <Card style={{ width: 600, backgroundColor: 'gray' }} className="loginCard">
            <div className="loginCardContent">
              <div className="signInWithGoogle">
                <Button ghost>Sign In With Google Account</Button>
              </div>
                <Divider>Or</Divider>
              <div className="registerForAccount">
                <Button ghost>Register For An Account</Button>
              </div>
            </div>
          </Card>
         </div>
      </div>
      { (props.authed) ? <h1>authed in home</h1> : <h1>not authed in home</h1> }
      <Link to={'/swipe'}><Button>Swipe</Button></Link>
       </div>
  );
}
