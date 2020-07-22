import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import EmphasisTag from '@bit/fho-wtag.tofa.emphasis-tag';
import sessionData from '../../../Helpers/Data/sessionData';
import authData from '../../../Helpers/Data/authData';
import SessionCard from '../../Shared/SessionCard/SessionCard';
import CompletedSessionCard from '../../Shared/CompletedSessionCard/CompletedSessionCard';
import NewSessionButton from '../../Shared/NewSessionButton/NewSessionButton';
import './Sessions.scss';

const { TabPane } = Tabs;

export default function Sessions(props) {
  const [userId, setUserId] = useState('');
  const [sessions, setSessions] = useState([]);
  const [completedSessions, setCompletedSessions] = useState([]);

  function callback(key) {
  }

  useEffect(() => {
    sessionData.getSessionsThatNeedSwipedByUID(authData.getUid())
      .then((result) => {
        if (result.includes('No swiped sessions for that user yet.') || result.length === 0) {
          setSessions(null);
        } else {
          setSessions(result);
          const user = result.map((x) => x.userId);
          setUserId(user[0]);
        }
      })
      .then(() => {
        sessionData.getCompletedSessionsByUID(authData.getUid())
          .then((result) => {
            if (result.includes('No swiped sessions for that user yet.') || result.length === 0) {
              setCompletedSessions(null);
            } else {
              setCompletedSessions(result);
              const user = result.map((x) => x.userId);
              setUserId(user[0]);
            }
          });
      })
      .catch((errorFromGetSessions) => console.error(errorFromGetSessions));
  }, []);

  const createSession = () => {
    const createdSession = {
      OwnerId: userId,
      isSessionComplete: false,
    };
    sessionData.createNewSession(createdSession)
      .then((result) => {
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
                    {(sessions === null) ? <h1>You don't have any open sessions currently.</h1>
                      : sessions.map((session) => <SessionCard key={session.sessionId} session={session} />)}
                   </div>
                </div>
            </TabPane>
            <TabPane tab="Previous Sessions" key="2">
                  <div className="openSessionCardContainer">
                  {(completedSessions === null) ? <h1>You don't have any open sessions currently.</h1>
                    : completedSessions.map((completedSession) => <CompletedSessionCard key={completedSession.sessionId} completedSession={completedSession} />)}
                  </div>
            </TabPane>
            <TabPane tab="Start A New Session" key="3">
              <div className="newSessionButton">
                <NewSessionButton createSession={createSession} />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
