/* eslint-disable no-lonely-if */
import React, { useState } from 'react';
import { Result, Button, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import userSessionsData from '../../../Helpers/Data/userSessionsData';
import queryParameterData from '../../../Helpers/Data/queryParameterData';

export default function NoWinner(props) {
  const [restCount, setRestCount] = useState(21);
  const [localOffsetStatus, setLocalOffsetStatus] = useState(false);
  const [parameters, setParameters] = useState([]);
  const [reset, setReset] = useState([]);

  const restart = () => {
    let newOffsetNumber = 0;
    queryParameterData.getQueryParametersWithSessionId(Number(props.match.params.newSessionId))
      .then((result) => {
        if (result[0].queryCity.includes('.')) {
          if (result[0].offsetStatus) {
            newOffsetNumber = +result[0].offsetNumber + 20;
            console.log(result[0].offsetStatus, 'offsetStatus');
            setRestCount(newOffsetNumber);
            console.log(newOffsetNumber, 'restcount');
          } else {
            newOffsetNumber = 21;
          }
        } else {
          if (result[0].offsetStatus) {
            newOffsetNumber = +result[0].offsetNumber + 20;
            console.log(result[0].offsetStatus, 'offsetStatus');
            setRestCount((state) => state + 20);
            console.log(newOffsetNumber, 'restcount');
          } else {
            newOffsetNumber = 21;
          }
        }
      }).then(() => {
        const updatedQuery = {
          OffsetNumber: newOffsetNumber,
          OffsetStatus: true,
        };
        queryParameterData.updateQueryOffsetNumber(Number(props.match.params.newSessionId), updatedQuery)
          .then((params) => {
            setParameters(params);
          });
      })
      .then(() => {
        userSessionsData.ResetSwipeStatusForAllUsers(Number(props.match.params.newSessionId))
          .then((resetUsers) => {
            setReset(resetUsers);
          })
          .then(() => {
            setLocalOffsetStatus(true);
            props.history.push({
              pathname: `/newSession/${Number(props.match.params.userId)}/${Number(props.match.params.newSessionId)}/swipe`,
              state:
              {
                localOffsetStatusCheck: localOffsetStatus,
                localOffsetNumber: newOffsetNumber,
              },
            });
          });
      })
      .catch((errorFromNoWinner) => console.error(errorFromNoWinner));
  };

  return (
    <Result
      status="error"
      title="Oh no!"
      subTitle="There are no matches between the users. Let's swipe again!"
      extra={[
        <Button type="ghost" onClick={restart} key="buy">Let's Try This Again</Button>,
      ]}
    >
    </Result>
  );
}
