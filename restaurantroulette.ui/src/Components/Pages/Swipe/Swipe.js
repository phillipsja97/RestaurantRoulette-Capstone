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
  const [next20Status, setNext20Status] = useState([]);
  const [restCount, setRestCount] = useState(21);
  const [reset, setReset] = useState([]);

  const getEndCard = () => {
    return (
      <MyEndCard finishSwipe={finishSwipe} next20Status={next20Status} nextTwenty={nextTwenty} acceptableRestaurants={acceptableRestaurants} parameters={parameters} />
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
    if (acceptableRestaurants.length === 0) {
      setNext20Status(true);
    } else {
      acceptableRestaurantsData.addRestaurantsToAcceptableList(restaurantsToAdd)
        .then((result) => {
          setAcceptableRestaurants(result);
        })
        .then(() => {
          const statusToUpdate = {
            sessionId: Number(props.match.params.newSessionId),
            userId: Number(props.match.params.userId),
            isSwiped: true,
          };
          userSessionsData.updateSwipeStatus(statusToUpdate)
            .then((result) => {
              setSwipeStatus(result);
            })
            .then(() => {
              props.history.push({
                pathname: `/newSession/${Number(props.match.params.userId)}/${Number(props.match.params.newSessionId)}/winner`,
              });
            });
        })
        .catch((errorFromAddingUsers) => console.error(errorFromAddingUsers));
    }
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
    let queryCoordinates = '';
    let queryOffsetStatus = false;
    queryParameterData.getQueryParametersWithSessionId(Number(props.match.params.newSessionId))
      .then((result) => {
        if (result[0].queryCity.includes('.')) {
          queryCoordinates = result[0].queryCity;
          queryName = result[0].queryName;
          queryOffsetStatus = result[0].offsetStatus;
          setParameters(result);
        } else {
          queryCity = result[0].queryCity;
          queryName = result[0].queryName;
          queryOffsetStatus = result[0].offsetStatus;
          setParameters(result);
        }
      })
      .then(() => {
        if (!queryOffsetStatus) {
          if (queryCoordinates === '') {
            yelpData.getRestaurantsByParams(queryCity, queryName)
              .then((result) => {
                setRestaurants(result.businesses);
              });
          } else {
            yelpData.getRestaurantsByCoordinatesAndParams(queryCoordinates, queryName)
              .then((result) => {
                setRestaurants(result.businesses);
              });
          }
        } else {
          nextTwenty();
        }
      })
      .catch((errorFromGetParameters) => console.error(errorFromGetParameters));
  }, [props.match.params.newSessionId]);

  const nextTwenty = () => {
    let queryCity = '';
    let queryName = '';
    let queryCoordinates = '';
    let offsetNumber;
    queryParameterData.getQueryParametersWithSessionId(Number(props.match.params.newSessionId))
      .then((result) => {
        if (result[0].queryCity.includes('.')) {
          queryCoordinates = result[0].queryCity;
          queryName = result[0].queryName;
          offsetNumber = result[0].offsetNumber;
          setParameters(result);
        } else {
          queryCity = result[0].queryCity;
          queryName = result[0].queryName;
          offsetNumber = result[0].offsetNumber;
          setParameters(result);
        }
      })
      .then(() => {
        if (queryCoordinates === '') {
          yelpData.getNext20RestaurantsByParams(queryCity, queryName, restCount)
            .then((result) => {
              if (result.businesses.length === 0) {
                const statusToUpdate = {
                  sessionId: Number(props.match.params.newSessionId),
                  userId: Number(props.match.params.userId),
                  isSwiped: false,
                };
                userSessionsData.updateSwipeStatus(statusToUpdate)
                  .then((swipeResult) => {
                    setSwipeStatus(swipeResult);
                  });
                alert('No more restaurants in these categories.');
                setRestCount(restCount - 20);
              } else {
                setRestaurants(result.businesses);
              }
            });
        } else {
          yelpData.getRestaurantsByCoordinatesAndParams(queryCoordinates, queryName)
            .then((result) => {
              if (result.businesses.length === 0) {
                const statusToUpdate = {
                  sessionId: Number(props.match.params.newSessionId),
                  userId: Number(props.match.params.userId),
                  isSwiped: false,
                };
                userSessionsData.updateSwipeStatus(statusToUpdate)
                  .then((swipeResult) => {
                    setSwipeStatus(swipeResult);
                  });
                alert('No more restaurants in these categories.');
                setRestCount(restCount - 20);
              } else {
                setRestaurants(result.businesses);
              }
            });
        }
      })
      .catch((errorFromGetParameters) => console.error(errorFromGetParameters));
    setRestCount(restCount + 20);
    const updatedQuery = {
      OffsetNumber: restCount,
      OffsetStatus: true,
    };
    queryParameterData.updateQueryOffsetNumber(Number(props.match.params.newSessionId), updatedQuery)
      .then((params) => {
        setParameters(params);
      })
      .then(() => {
        userSessionsData.ResetSwipeStatusForAllUsers(Number(props.match.params.newSessionId))
          .then((resetUsers) => {
            setReset(resetUsers);
          });
      })
    ;
  };

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
            <img src={d.image_url} alt="restaurantDish" className="restaurantPhoto" />
            <div className="title">
              <h1>{d.name}</h1>
            </div>
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
