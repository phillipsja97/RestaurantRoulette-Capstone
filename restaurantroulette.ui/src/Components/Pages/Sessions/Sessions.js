import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default function Sessions(props) {
  return (
    <div className="sessions">
      { (props.authed) ? <h1>authed in sessions</h1> : <h1>not authed in sessions</h1> }
      <Link to={'/swipe'}><Button>Swipe</Button></Link>
       </div>
  );
}
