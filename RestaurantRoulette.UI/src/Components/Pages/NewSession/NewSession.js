import React, { useState } from 'react';
import { Steps, Button, message } from 'antd';
import QueryParams from '../../Shared/QueryParams/QueryParams';
import LocationParam from '../../Shared/LocationParam/LocationParam';
import AddFriendsParam from '../../Shared/AddFriendsParam/AddFriendsParam';
import queryParamaterData from '../../../Helpers/Data/queryParameterData';
import './NewSession.scss';

const { Step } = Steps;

export default function NewSession(props) {
  const [current, setCurrent] = useState(0);
  const [queryParams, setQueryParams] = useState([]);
  const [location, setLocation] = useState('');
  const foodParams = [];
  const friendsToAdd = [];

  const steps = [
    {
      content: <LocationParam onChange={(value) => setLocation(value)} />,
    },
    {
      content: <QueryParams onChange={(value) => foodParams.push(value)} />,
    },
    {
      content: <AddFriendsParam onChange={(value) => friendsToAdd.push(value)} />,
    },
  ];

  const next = () => {
    setCurrent((prevCurrent) => prevCurrent + 1);
    if (current === 0) {
      const queryToCreate = {
        sessionId: Number(props.match.params.newSessionId),
        queryCity: location,
        queryName: 'toBeUpdated',
      };
      queryParamaterData.addQueryLocationToSession(queryToCreate)
        .then((result) => {
          setQueryParams(result);
        })
        .catch((errorFromNewParams) => console.error(errorFromNewParams));
    } else {
      console.log(current, 'current');
      const query = foodParams[foodParams.length - 1];
      console.log(query);
    }
  };

  const prev = () => {
    setCurrent((prevCurrent) => prevCurrent - 1);
  };

  const done = () => {
    console.log(friendsToAdd, 'friendstoAdd');
  };

  return (
    <div className="newSession">
      <div className="newSessionTitle">
        <h1>Let's get Started!</h1>
      </div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">
        {steps[current].content}
      </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => done()}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
}
// }
