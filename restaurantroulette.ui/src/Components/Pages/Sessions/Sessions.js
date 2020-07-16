import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider } from 'antd';
import EmphasisTag from '@bit/fho-wtag.tofa.emphasis-tag';
import sessionData from '../../../Helpers/Data/sessionData';
import userData from '../../../Helpers/Data/userData';
import authData from '../../../Helpers/Data/authData';
import SessionCard from '../../Shared/SessionCard/SessionCard';
import './Sessions.scss';

export default function Sessions(props) {
  const [authed, setAuthed] = useState(props);
  const [userId, setUserId] = useState('');
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({});

  useEffect(() => {
    sessionData.getSessionsThatNeedSwipedByUID(authData.getUid())
      .then((result) => {
        setSessions(result);
        const user = result.map((x) => x.userId);
        setUserId(user[0]);
      })
      .catch((errorFromGetSessions) => console.error(errorFromGetSessions));
  }, [sessions.length]);

  const createSession = () => {
    const createdSession = {
      OwnerId: userId,
      isSessionComplete: false,
    };
    sessionData.createNewSession(createdSession)
      .then((result) => {
        console.log(result.data[0].id, 'result');
        props.history.push({
          pathname: `/newSession/${result.data[0].id}`,
          state: { session: newSession },
        });
      })
      .catch((errorFromSessions) => console.error(errorFromSessions));
  };

  return (
    <div className="sessions">
      <div className="newSessionButton">
        <Button type="ghost" onClick={createSession}>Start A New Session</Button>
      </div>
      <div className="openSessions">
        <div className="openTitle">
          <h1>Open Sessions</h1>
        </div>
        <div className="openSessionTag">
          <EmphasisTag text="Waiting on others" type='highlight' size='small'/>
          <EmphasisTag text="You need to Swipe!" type='urgent' size='small'/>
        </div>
        <div className="openSessionData">
          {sessions.map((session) => <SessionCard key={session.sessionId} session={session} />)}
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
