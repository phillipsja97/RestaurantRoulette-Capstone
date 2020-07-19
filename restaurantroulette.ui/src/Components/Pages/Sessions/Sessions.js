import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider } from 'antd';
import EmphasisTag from '@bit/fho-wtag.tofa.emphasis-tag';
import { Tabs } from 'antd';
import sessionData from '../../../Helpers/Data/sessionData';
import userData from '../../../Helpers/Data/userData';
import authData from '../../../Helpers/Data/authData';
import SessionCard from '../../Shared/SessionCard/SessionCard';
import CompletedSessionCard from '../../Shared/CompletedSessionCard/CompletedSessionCard';
import './Sessions.scss';

const { TabPane } = Tabs;

export default function Sessions(props) {
  const [authed, setAuthed] = useState(props);
  const [userId, setUserId] = useState('');
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({});
  const [completedSessions, setCompletedSessions] = useState([]);

  function callback(key) {
    console.log(key);
  }

  useEffect(() => {
    sessionData.getSessionsThatNeedSwipedByUID(authData.getUid())
      .then((result) => {
        setSessions(result);
        const user = result.map((x) => x.userId);
        setUserId(user[0]);
      })
      .then(() => {
        sessionData.getCompletedSessionsByUID(authData.getUid())
          .then((result) => {
            setCompletedSessions(result);
          });
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
          pathname: `/newSession/${userId}/${result.data[0].id}`,
        });
      })
      .catch((errorFromSessions) => console.error(errorFromSessions));
  };

  return (
    <div className="sessions">
      <div className="openSessions">
        <div className="tabListContainer">
          <Tabs onChange={callback} type="card" className="tabList" centered>
            <TabPane tab="Open Sessions" key="1">
              <div className="openSessionData">
                <div className="openSessionTag">
                  <EmphasisTag text="Waiting on others" type='highlight' size='small'/>
                  <EmphasisTag text="You need to Swipe!" type='urgent' size='small'/>
                </div>
                   <div className="openSessionCardContainer">
                    {sessions.map((session) => <SessionCard key={session.sessionId} session={session} />)}
                   </div>
                </div>
            </TabPane>
            <TabPane tab="Previous Sessions" key="2">
                  <div className="openSessionCardContainer">
                    {completedSessions.map((completedSession) => <CompletedSessionCard key={completedSession.sessionId} completedSession={completedSession} />)}
                  </div>
            </TabPane>
            <TabPane tab="Start A New Session" key="3">
              <div className="newSessionButton">
                <Button type="ghost" onClick={createSession}>Start A New Session</Button>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
      {/* <div className="previousSessions">
        <div className="previousTitle">
          <h1>Previous Sessions</h1>
        </div>
      </div> */}
    </div>
  );
}
