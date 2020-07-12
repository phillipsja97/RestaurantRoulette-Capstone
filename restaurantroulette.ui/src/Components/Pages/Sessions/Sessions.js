import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider } from 'antd';
import sessionData from '../../../Helpers/Data/sessionData';
import userData from '../../../Helpers/Data/userData';
import authData from '../../../Helpers/Data/authData';
import SessionCard from '../../Shared/SessionCard/SessionCard';
import './Sessions.scss';

export default function Sessions(props) {
  const [authed, setAuthed] = useState(props);
  const [user, setUser] = useState();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    sessionData.getSessionsByUID(authData.getUid())
      .then((result) => {
        setSessions(result);
      })
      .catch((errorFromGetSessions) => console.error(errorFromGetSessions));
  }, [sessions.length]);

  return (
    <div className="sessions">
      <div className="newSessionButton">
        <Link to="/newSession"><Button type="ghost">Start A New Session</Button></Link>
      </div>
      <div className="openSessions">
        <div className="openTitle">
          <h1>Open Sessions</h1>
        </div>
        <div className="openSessionData">
          {sessions.map((session) => <SessionCard key={session.id} session={session} />)}
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
