/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { Card, CardWrapper } from 'react-swipeable-cards';
import MyEndCard from '../../Shared/EndCard/EndCard';
import queryParameterData from '../../../Helpers/Data/queryParameterData';
import acceptableRestaurantsData from '../../../Helpers/Data/acceptableRestaurantsData';
import userSessionsData from '../../../Helpers/Data/userSessionsData';
import yelpData from '../../../Helpers/Data/yelpData';
import './Swipe.scss';

export default function Swipe(props) {
  const [parameters, setParameters] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [noRestaurants, setNoRestaurants] = useState([]);
  const [acceptableRestaurants, setAcceptableRestaurants] = useState([]);
  const [swipeStatus, setSwipeStatus] = useState({});

  const getEndCard = () => {
    return (
      <MyEndCard finishSwipe={finishSwipe} />
    );
  };

  const finishSwipe = () => {
    const restaurantsToAdd = [];
    let length = acceptableRestaurants.length;
    let k = 0;
    while (length > 0) {
      const restaurantsData = {
        sessionId: Number(props.match.params.newSessionId),
        userId: Number(props.match.params.userId),
        restaurantId: acceptableRestaurants[k],
      };
      restaurantsToAdd.push(restaurantsData);
      k++;
      length--;
    }
    acceptableRestaurantsData.addRestaurantsToAcceptableList(restaurantsToAdd)
      .then((result) => {
        setAcceptableRestaurants(result);
      })
      .then(() => {
        const statusToUpdate = {
          sessionId: Number(props.match.params.newSessionId),
          userId: Number(props.match.params.userId),
        };
        userSessionsData.updateSwipeStatus(statusToUpdate)
          .then((result) => {
            setSwipeStatus(result);
          });
      })
      .then(() => {
        props.history.push({
          pathname: `/newSession/${Number(props.match.params.userId)}/${Number(props.match.params.newSessionId)}/winner`,
        });
      })
      .catch((errorFromAddingUsers) => console.error(errorFromAddingUsers));
  };

  const onSwipeLeft = (data) => {
    setNoRestaurants(
      [...noRestaurants, data.id],
    );
  };

  const onSwipeRight = (data) => {
    setAcceptableRestaurants(
      [...acceptableRestaurants, data.id],
    );
  };

  useEffect(() => {
    let queryCity = '';
    let queryName = '';
    queryParameterData.getQueryParametersWithSessionId(Number(props.match.params.newSessionId))
      .then((result) => {
        queryCity = result[0].queryCity;
        queryName = result[0].queryName;
        setParameters(result);
      })
      .then(() => {
        yelpData.getRestaurantsByParams(queryCity, queryName)
          .then((result) => {
            setRestaurants(result.businesses);
          });
      })
      .catch((errorFromGetParameters) => console.error(errorFromGetParameters));
  }, []);

  const renderCards = () => {
    return restaurants.map((d) => {
      return (
        <Card
          className="restaurantCard"
          key={d.id}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          data={d}
        >
            <img src={d.image_url} alt="image of restaurant" className="restaurantPhoto" />
            <div className="title">
              <h1>{d.name}</h1>
            </div>
            {/* <div className="insideCard">
              <h1>Hello</h1>
            </div> */}
        </Card>
      );
    });
  };

  return (
    <div>
    <CardWrapper addEndCard={getEndCard.bind(this)}>
     {renderCards()}
    </CardWrapper>
  </div>
  );
}
