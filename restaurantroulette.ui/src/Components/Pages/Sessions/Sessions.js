import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider } from 'antd';
import './Sessions.scss';

export default function Sessions(props) {
  const [authed, setAuthed] = useState(props);
  return (
    <div className="sessions">
      <div className="newSessionButton">
        <Link to="/newSession"><Button type="ghost">Start A New Session</Button></Link>
      </div>
      <div className="openSessions">
        <div className="openTitle">
          <h1>Open Sessions</h1>
        </div>
      </div>
      <div className="previousSessions">
        <div className="previousTitle">
          <h1>Previous Sessions</h1>
        </div>
      </div>
    </div>
  );
}
