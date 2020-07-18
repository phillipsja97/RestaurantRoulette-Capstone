/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { Card, CardWrapper } from 'react-swipeable-cards';
import BitCard from '@bit/farmland-finder.components.card';
import Avatar from '@bit/farmland-finder.components.avatar';
import MyEndCard from '../../Shared/EndCard/EndCard';
import queryParameterData from '../../../Helpers/Data/queryParameterData';
import yelpData from '../../../Helpers/Data/yelpData';
import './Swipe.scss';

export default function Swipe(props) {
  const [parameters, setParameters] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [noRestaurants, setNoRestaurants] = useState([]);
  const [acceptableRestaurants, setAcceptableRestaurants] = useState([]);

  const getEndCard = () => {
    return (
      <MyEndCard finishSwipe={finishSwipe} />
    );
  };

  const finishSwipe = () => {
    console.log(acceptableRestaurants, 'restaurants');
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
