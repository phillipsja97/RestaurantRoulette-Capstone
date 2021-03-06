/* eslint-disable arrow-body-style */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-const-assign */
import React, { useState } from 'react';
import { Steps, Button } from 'antd';
import QueryParams from '../../Shared/QueryParams/QueryParams';
import LocationParam from '../../Shared/LocationParam/LocationParam';
import AddFriendsParam from '../../Shared/AddFriendsParam/AddFriendsParam';
import queryParamaterData from '../../../Helpers/Data/queryParameterData';
import userSessionsData from '../../../Helpers/Data/userSessionsData';
import './NewSession.scss';

const { Step } = Steps;

export default function NewSession(props) {
  const [current, setCurrent] = useState(0);
  const [queryParams, setQueryParams] = useState([]);
  const [location, setLocation] = useState('');
  const [mapping, setMapping] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [usersData, setUsersData] = useState([]);
  const foodParams = [];
  const [friends, setFriends] = useState([]);

  const steps = [
    {
      title: 'Add Location',
      content: <LocationParam onChange={(value) => setLocation(value)}
                              latitude={latitude}
                              longitude={longitude}
                              mapping={mapping}
                              setLatitude={setLatitude}
                              setLongitude={setLongitude}
                              setMapping={setMapping}
                              />,
    },
    {
      title: 'Add Categories',
      content: <QueryParams onChange={(value) => foodParams.push(value)} />,
    },
    {
      title: 'Add Friends',
      content: <AddFriendsParam onChange={(value) => setFriends(value)} />,
    },
  ];

  const next = () => {
    setCurrent((prevCurrent) => prevCurrent + 1);
    if (current === 0) {
      if (mapping) {
        const locationCoordinates = `${latitude},${longitude}`;
        setLocation(locationCoordinates);
        const queryToCreate = {
          sessionId: Number(props.match.params.newSessionId),
          queryCity: locationCoordinates,
          queryName: 'toBeUpdated',
          offsetStatus: false,
          offsetNumber: 21,
        };
        queryParamaterData.addQueryLocationToSession(queryToCreate)
          .then((result) => {
            setQueryParams(result);
          })
          .catch((errorFromNewParams) => console.error(errorFromNewParams));
      } else {
        const queryToCreate = {
          sessionId: Number(props.match.params.newSessionId),
          queryCity: location,
          queryName: 'toBeUpdated',
          offsetStatus: false,
          offsetNumber: 21,
        };
        queryParamaterData.addQueryLocationToSession(queryToCreate)
          .then((result) => {
            setQueryParams(result);
          })
          .catch((errorFromNewParams) => console.error(errorFromNewParams));
      }
    } else {
      const query = foodParams[foodParams.length - 1];
      const updatedQuery = {
        queryName: query,
      };
      queryParamaterData.updateQueryNames(Number(props.match.params.newSessionId), updatedQuery)
        .then((result) => {
          setQueryParams(result);
        })
        .catch((errorFromUpdateParams) => console.error(errorFromUpdateParams));
    }
  };

  const done = () => {
    const addFriends = [];
    const owner = {
      sessionId: Number(props.match.params.newSessionId),
      userId: Number(props.match.params.userId),
      isSwiped: false,
    };
    addFriends.push(owner);
    let length = friends.length;
    let k = 0;
    while (length > 0) {
      const friendToAdd = {
        sessionId: Number(props.match.params.newSessionId),
        userId: Number(friends[k]),
        isSwiped: false,
      };
      addFriends.push(friendToAdd);
      k++;
      length--;
    }
    userSessionsData.addUsersToSession(addFriends)
      .then((result) => {
        setUsersData(result);
      })
      .catch((errorFromAddingUsers) => console.error(errorFromAddingUsers));
    props.history.push({
      pathname: `/newSession/${Number(props.match.params.userId)}/${Number(props.match.params.newSessionId)}/swipe`,
      state: mapping,
    });
  };

  const desktopRender = () => {
    return <div className="newSession">
      <div className="newSessionTitle">
        <h1>Let's get Started!</h1>
      </div>
      <Steps current={current} className="stepsContainer" size="small">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} className="stepsContent" />
        ))}
      </Steps>
      <div className="steps-content">
        {steps[current].content}
      </div>
      <div className="steps-action">
         {current < steps.length - 1 && (
          <Button type="ghost" block className="nextButtonSession" onClick={() => next()}>
            Next Section
          </Button>
         )}
        {current === steps.length - 1 && (
          <Button type="ghost" block className="nextButtonSession" onClick={() => done()}>
            Done
          </Button>
        )}
      </div>
    </div>;
  };

  const mobileRender = () => {
    return <div className="newSession">
    <div className="newSessionTitle">
      <h1>Let's get Started!</h1>
    </div>
    <Steps current={current} className="stepsContainer" size="small">
      {steps.map((item) => (
        <Step key={item.title} title={item.title} className="stepsContent" />
      ))}
    </Steps>
    <div className="steps-content">
      {steps[current].content}
    </div>
    <div className="steps-action">
       {current < steps.length - 1 && (
        <Button type="ghost" block className="nextMobileButtonSession" onClick={() => next()}>
          Next Section
        </Button>
       )}
      {current === steps.length - 1 && (
        <Button type="ghost" block className="nextButtonSession" onClick={() => done()}>
          Done
        </Button>
      )}
    </div>
  </div>;
  };

  return (
    <div className="newSession">
      <div className="newSessionTitle">
        <h1>Let's get Started!</h1>
      </div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} className="stepsContent" />
        ))}
      </Steps>
      <div className="steps-content">
        {steps[current].content}
      </div>
      <div className="steps-action">
         {current < steps.length - 1 && (
          <Button type="ghost" block className="nextButtonSession" onClick={() => next()}>
            Next Section
          </Button>
         )}
        {current === steps.length - 1 && (
          <Button type="ghost" block className="nextButtonSession" onClick={() => done()}>
            Done
          </Button>
        )}
      </div>
    </div>
  );
}
