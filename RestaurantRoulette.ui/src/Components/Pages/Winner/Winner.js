import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import userSessionsData from '../../../Helpers/Data/userSessionsData';
import yelpData from '../../../Helpers/Data/yelpData';

export default function Winner(props) {
  const [allUsersStatus, setAllUsersStatus] = useState([]);
  const [status, setStatus] = useState(false);
  const [winningRestaurant, setWinningRestaurant] = useState([]);

  const ifStatusCompleteCallWinner = (statusToCheck) => {
    // const statusId = allUsersStatus.map((userStatus) => userStatus.isSwiped);
    // console.log(statusId);
    const isTrue = (swiped) => swiped === true;
    const result = statusToCheck.every(isTrue);
    return result;
  };

  useEffect(() => {
    userSessionsData.getAllUsersSwipeStatusOnSessionId(Number(props.match.params.newSessionId))
      .then((result) => {
        setAllUsersStatus(result);
        const updatedStatus = result.map((x) => x.isSwiped);
        setStatus(ifStatusCompleteCallWinner(updatedStatus));
        if (ifStatusCompleteCallWinner(updatedStatus)) {
          yelpData.getWinningRestaurant(Number(props.match.params.newSessionId))
            .then((restaurant) => {
              setWinningRestaurant(restaurant);
            });
        } else {
          console.log('did i get here?');
          props.history.push({
            pathname: `/session/${Number(props.match.params.newSessionId)}`,
          });
        }
      })
      .catch((errorFromGetUsersStatus) => console.error(errorFromGetUsersStatus));
  }, [props.match.params.newSessionId]);

  return (
    <React.Fragment>
    {(winningRestaurant === null)
      ? <Link to={`/newSession/${Number(props.match.params.userId)}/${Number(props.match.params.newSessionId)}/swipe`}>
        <Button type="ghost">Next 20</Button>
        </Link>
      : <h1>{winningRestaurant.name}</h1>
    }
    </React.Fragment>
  );
}
