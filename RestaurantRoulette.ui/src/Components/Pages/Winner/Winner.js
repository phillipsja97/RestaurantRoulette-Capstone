/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button, Typography, Rate, List, Card } from 'antd';
import { PhoneTwoTone, EnvironmentTwoTone, ClockCircleTwoTone, DollarCircleTwoTone } from '@ant-design/icons';
import userSessionsData from '../../../Helpers/Data/userSessionsData';
import yelpData from '../../../Helpers/Data/yelpData';
import './Winner.scss';

const { Paragraph, Text } = Typography;

export default function Winner(props) {
  const [allUsersStatus, setAllUsersStatus] = useState([]);
  const [status, setStatus] = useState(false);
  const [winningRestaurant, setWinningRestaurant] = useState([]);
  const [hours, setHours] = useState([]);
  const [location, setLocation] = useState([]);
  const [restaurantStatus, setRestaurantStatus] = useState(false);

  const ifStatusCompleteCallWinner = (statusToCheck) => {
    // const statusId = allUsersStatus.map((userStatus) => userStatus.isSwiped);
    // console.log(statusId);
    const isTrue = (swiped) => swiped === true;
    const result = statusToCheck.every(isTrue);
    return result;
  };

  const getHours = (day) => {
    if (day === 0) {
      return 'Monday';
    } else if (day === 1) {
      return 'Tuesday';
    } else if (day === 2) {
      return 'Wednesday';
    } else if (day === 3) {
      return 'Thursday';
    } else if (day === 4) {
      return 'Friday';
    } else if (day === 5) {
      return 'Saturday';
    } else if (day === 6) {
      return 'Sunday';
    }
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
              setHours(restaurant.hours);
              setLocation(restaurant.location);
            }).then(() => {
              setRestaurantStatus(true);
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
    {(!restaurantStatus)
      ? (winningRestaurant === null) 
        ? <Link to={`/newSession/${Number(props.match.params.userId)}/${Number(props.match.params.newSessionId)}/swipe`}>
          <Button type="ghost">Next 20</Button>
          </Link>
        : <h1>Loading...</h1>
      : <div className="winnerSectionContainer">
        <div className="topSectionContainer">
            <div className="topSectionTitle">
              <h1>And the Winner is: {winningRestaurant.name}!</h1>
            </div>
        </div>
        <div className="bottomContainerForDetails">
          <div className="willThisCenter">
        <div className="bottomSectionContainer">
          <div className="pictureDetailsSection">
                    <Card
                    className="winningPhotoCard"
                    cover={
                      <img
                        alt="example"
                        src={winningRestaurant.image_url}
                        className="winningPhoto"
                      />
                    }>
                    </Card>
                    <Paragraph>
                      <EnvironmentTwoTone className="site-result-demo-error-icon" />
                      {winningRestaurant.location.address1} {winningRestaurant.location.city}, {winningRestaurant.location.zip_code} {winningRestaurant.location.state}
                    </Paragraph>
                    <Paragraph>
                      <PhoneTwoTone className="site-result-demo-error-icon" />
                      {winningRestaurant.display_phone}
                    </Paragraph>
                    <Paragraph>
                      <ClockCircleTwoTone className="site-result-demo-error-icon" />
                      <Rate
                          allowHalf
                          disabled
                          defaultValue={winningRestaurant.rating}
                      />
                    </Paragraph>
                    </div>
                    </div>
                    <div className="hoursOpenDetails">
                      <div className="hoursOpenTitle">
                        <h3>Hours of Operation</h3>
                      </div>
                      <List
                        grid={{
                          gutter: 16,
                          xs: 1,
                          sm: 2,
                          md: 4,
                          lg: 4,
                          xl: 4,
                          xxl: 3,
                        }}
                        dataSource={winningRestaurant.hours[0].open}
                        renderItem={(item) => (
                          <List.Item>
                            <Card className="hoursOpenCard" title={getHours(item.day)}>{`${item.start}-${item.end}`}</Card>
                          </List.Item>
                        )}
                      />,
                      </div>
                    </div>
                  </div>
                </div>
    }
    </React.Fragment>
  );
}
