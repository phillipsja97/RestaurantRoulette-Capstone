/* eslint-disable prefer-template */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-lonely-if */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { Card, CardWrapper } from 'react-swipeable-cards';
import Media from 'react-media';
import MyEndCard from '../../Shared/EndCard/EndCard';
import queryParameterData from '../../../Helpers/Data/queryParameterData';
import acceptableRestaurantsData from '../../../Helpers/Data/acceptableRestaurantsData';
import userSessionsData from '../../../Helpers/Data/userSessionsData';
import yelpData from '../../../Helpers/Data/yelpData';
import SwipeCard from '../../Shared/SwipeCard/SwipeCard';
// import LoadingScreen from 'public\circleMotion-unscreen.gif';
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
  const [loading, setLoading] = useState(true);

  const getEndCard = () => {
    return (
      <MyEndCard finishSwipe={finishSwipe} next20Status={next20Status} nextTwenty={nextTwenty} acceptableRestaurants={acceptableRestaurants} parameters={parameters} restaurants={restaurants} />
    );
  };

  const finishSwipe = (e) => {
    e.preventDefault();
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
      })
      .then(() => {
        const statusToUpdate = {
          sessionId: Number(props.match.params.newSessionId),
          userId: Number(props.match.params.userId),
          isSwiped: true,
        };
        userSessionsData.updateSwipeStatus(statusToUpdate)
          .then((result) => {
          })
          .then(() => {
            props.history.push({
              pathname: `/newSession/${Number(props.match.params.userId)}/${Number(props.match.params.newSessionId)}/winner`,
            });
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
    let queryCoordinates = '';
    let queryOffsetStatus = false;
    let queryOffsetNumber = 0;
    let overallOffsetNumber = 0;
    queryParameterData.getQueryParametersWithSessionId(Number(props.match.params.newSessionId))
      .then((result) => {
        if (result[0].queryCity.includes('.')) {
          queryCoordinates = result[0].queryCity;
          queryName = result[0].queryName;
          queryOffsetStatus = result[0].offsetStatus;
          queryOffsetNumber = result[0].offsetNumber;
          setParameters(result);
        } else {
          queryCity = result[0].queryCity;
          queryName = result[0].queryName;
          queryOffsetStatus = result[0].offsetStatus;
          queryOffsetNumber = result[0].offsetNumber;
          setParameters(result);
        }
      })
      .then(() => {
        if (queryOffsetStatus === false && props.location.state === undefined) {
          if (queryCoordinates === '') {
            yelpData.getRestaurantsByParams(queryCity, queryName)
              .then((result) => {
                setRestaurants(result.businesses);
                setLoading(false);
              });
          } else {
            yelpData.getRestaurantsByCoordinatesAndParams(queryCoordinates, queryName)
              .then((result) => {
                setRestaurants(result.businesses);
                setLoading(false);
              });
          }
        } else {
          overallOffsetNumber = (props.location.state === undefined) ? queryOffsetNumber : props.location.state.localOffsetNumber;
          if (queryCoordinates === '') {
            yelpData.getNext20RestaurantsByParams(queryCity, queryName, overallOffsetNumber)
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
                  setLoading(false);
                }
              });
          } else {
            yelpData.getNext20RestaurantsByCoordinatesAndParams(queryCoordinates, queryName, overallOffsetNumber)
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
                  setLoading(false);
                }
              });
          }
        }
      })
      .catch((errorFromGetParameters) => console.error(errorFromGetParameters));
  }, [props.match.params.newSessionId]);

  const nextTwenty = () => {
    let queryCity = '';
    let queryName = '';
    let queryCoordinates = '';
    let offsetNumber = 0;
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
                setLoading(false);
              }
            });
        } else {
          yelpData.getNext20RestaurantsByCoordinatesAndParams(queryCoordinates, queryName, restCount)
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
                setLoading(false);
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
      });
  };

  const renderCards = () => {
    return restaurants.map((restaurant) => {
      return (
      <Card
        className="restaurantCard"
        style={{ backgroundColor: '#EAE3EA' }}
        key={restaurant.id}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        data={restaurant}
      >
        <div className="actualCard">
          <SwipeCard key={restaurant.id} restaurant={restaurant} />
        </div>
      </Card>
      );
    });
  };

  const desktopRender = () => {
    return <div className="swipePage">
            {(!loading)
              ? <CardWrapper addEndCard={getEndCard.bind(this)}>
                  {renderCards()}
                </CardWrapper>
              : <div className="swipeLoading">
                  <img src={'https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif'} className="loadingImage" alt="loading" />
                </div>
            }
          </div>;
  };

  const mobileRender = () => {
    return <div className="swipePage">
            {(!loading)
              ? <CardWrapper addEndCard={getEndCard.bind(this)}>
                  {renderCards()}
                </CardWrapper>
              : <div className="mobileSwipeLoading">
                  <img src={'https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif'} className="loadingImage" alt="loading" />
                </div>
            }
    </div>;
  };

  return (
    <Media queries={{
      small: '(min-width: 320px) and (max-width: 767px)',
      medium: '(min-width: 768px) and (max-width: 1024px)',
      large: '(min-width: 1023px)',
    }}>
      {(matches) => (
        <React.Fragment>
                {matches.small && mobileRender()}
                {matches.medium && desktopRender()}
                {matches.large && desktopRender()}
        </React.Fragment>
      )}
    </Media>
  );
}
