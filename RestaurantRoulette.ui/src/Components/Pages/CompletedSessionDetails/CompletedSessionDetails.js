import React, { useState, useEffect } from 'react';
import { Result, Button, Carousel } from 'antd';
import sessionData from '../../../Helpers/Data/sessionData';
import queryParameterData from '../../../Helpers/Data/queryParameterData';
import userSessionsData from '../../../Helpers/Data/userSessionsData';
import yelpData from '../../../Helpers/Data/yelpData';
import WinningRestaurantPhoto from '../../Shared/WinningRestaurantPhoto/WinningRestaurantPhoto';
import './CompletedSessionDetails.scss';

export default function CompletedSessionDetails(props) {
  const [session, setSession] = useState([]);
  const [queryParams, setQueryParams] = useState([]);
  const [users, setUsers] = useState([]);
  const [userStatus, setUserStatus] = useState([]);
  const [winningRestaurant, setWinningRestaurant] = useState([]);

  useEffect(() => {
    const theSessionId = Number(props.match.params.sessionId);
    let winningId = '';
    sessionData.getASession(theSessionId)
      .then((result) => {
        setSession(result);
        winningId = result[0].winningId;
      });
    queryParameterData.getQueryParametersWithSessionId(theSessionId)
      .then((result) => {
        setQueryParams(result);
      });
    sessionData.getAllUsersOnASession(theSessionId)
      .then((result) => {
        setUsers(result);
      });
    userSessionsData.getAllUsersSwipeStatusOnSessionId(theSessionId)
      .then((result) => {
        setUserStatus(result);
      }).then(() => {
        yelpData.getWinningRestaurantDetails(winningId)
          .then((result) => {
            setWinningRestaurant(result);
          });
      })
      .catch((errorFromGetCompleteSession) => console.error(errorFromGetCompleteSession));
  }, [props.match.params.sessionId]);

  return (
    <div className="completeSessionDetails">
      <h1>Completed Sessions</h1>
      <Result
        status="success"
        title={`And the Winner is: ${winningRestaurant.name}!`}
        subTitle={winningRestaurant.display_phone}
        extra={[
          // <div className="carousel">
          // <Carousel autoplay style={{ width: '50%' }}>
          //   <div>
          //     {winningRestaurant.photos.map((restaurant) => <WinningRestaurantPhoto key={restaurant.id} restaurant={restaurant} />)}
          //   </div>
          // </Carousel>
          // </div>,
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      />,
      <h2>{winningRestaurant.name}</h2>
    </div>
  );
}
