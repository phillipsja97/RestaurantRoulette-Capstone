import React, { useEffect, useState } from 'react';
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
    console.log(result);
    return result;
  };

  useEffect(() => {
    const userStatuses = [];
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
        }
      })
      .catch((errorFromGetUsersStatus) => console.error(errorFromGetUsersStatus));
  }, []);

  return (
    <h1>{winningRestaurant.name}</h1>
  );
}
