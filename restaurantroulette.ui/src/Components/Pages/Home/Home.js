import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default function Home(props) {
  return (
    <div className="home">
      { (props.authed) ? <h1>authed in home</h1> : <h1>not authed in home</h1> }
      <Link to={'/swipe'}><Button>Swipe</Button></Link>
       </div>
  );
}
