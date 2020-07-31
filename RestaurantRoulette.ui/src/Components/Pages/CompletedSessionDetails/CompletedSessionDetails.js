/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react';
import { Result, Descriptions, Typography, Rate, List, Card } from 'antd';
import FaceIcon from '@bit/mui-org.material-ui-icons.face';
import Chip from '@bit/mui-org.material-ui.chip';
import { PhoneTwoTone, EnvironmentTwoTone, ClockCircleTwoTone, DollarCircleTwoTone } from '@ant-design/icons';
import StatusChip from '@bit/aurora.aurora-ds.status-chip';
import FoodIcon from '../../../Assets/FoodSVG';
import sessionData from '../../../Helpers/Data/sessionData';
import queryParameterData from '../../../Helpers/Data/queryParameterData';
import userSessionsData from '../../../Helpers/Data/userSessionsData';
import yelpData from '../../../Helpers/Data/yelpData';
import WinningRestaurantPhoto from '../../Shared/WinningRestaurantPhoto/WinningRestaurantPhoto';
import './CompletedSessionDetails.scss';

const { Paragraph, Text } = Typography;

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
      })
      .then(() => {
        queryParameterData.getQueryParametersWithSessionId(theSessionId)
          .then((result) => {
            setQueryParams(result);
          });
      })
      .then(() => {
        sessionData.getAllUsersOnASession(theSessionId)
          .then((result) => {
            setUsers(result);
          });
      })
      .then(() => {
        userSessionsData.getAllUsersSwipeStatusOnSessionId(theSessionId)
          .then((result) => {
            setUserStatus(result);
          });
      })
      .then(() => {
        yelpData.getWinningRestaurantDetails(winningId)
          .then((result) => {
            setWinningRestaurant(result);
          });
      })
      .catch((errorFromGetCompleteSession) => console.error(errorFromGetCompleteSession));
  }, [props.match.params.sessionId]);

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

  const customIcons = {
    1: <DollarCircleTwoTone />,
    2: <div><DollarCircleTwoTone /> <DollarCircleTwoTone /></div>,
    3: <div><DollarCircleTwoTone /> <DollarCircleTwoTone /> <DollarCircleTwoTone /></div>,
    4: <div><DollarCircleTwoTone /> <DollarCircleTwoTone /> <DollarCircleTwoTone /> <DollarCircleTwoTone /></div>,
    5: <div><DollarCircleTwoTone /> <DollarCircleTwoTone /> <DollarCircleTwoTone /> <DollarCircleTwoTone /> <DollarCircleTwoTone /></div>,
  };

  return (
    (winningRestaurant.name !== undefined)
      ? <div className="completeSessionDetails">
        <div className="completeSessionDetailsTopSection">
          <div className="topSectionContainer">
            <div className="topSectionTitle">
              <h1>And the Winner was: {winningRestaurant.name}!</h1>
            </div>
                <div className="extraSection">
                  <div className="descriptionSection">
                  <Descriptions
                  title="Session Details"
                  bordered
                  column={
                    {
                      xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1,
                    }
                  }
                  className="sessionInformationContainer">
                    <Descriptions.Item label="Users On The Session">
                        {users.map((user) => <Chip icon={<FaceIcon />} key={user.id} label={user.fullName} variant="outlined"/>)
                        }</Descriptions.Item>
                        <Descriptions.Item label="Categories">{queryParams.map((user) => user.queryName)}</Descriptions.Item>
                    </Descriptions>
                      </div>
                    </div>
                    </div>
                    </div>
                    <div className="pastSessionDetailsContainer">
                    <div className="pastSessionRestaurantDetails">
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
                    <div className="hoursOpenDetails">
                      <div className="hoursOpenTitle">
                        <h1>Hours of Operation</h1>
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
                        {/* <List
                          itemLayout="horizontal"
                          dataSource={winningRestaurant.hours[0].open}
                          renderItem={(item) => (
                            <List.Item>
                              <List.Item.Meta
                                title={getHours(item.day)}
                                description={`${item.start}-${item.end}`}
                              />
                            </List.Item>
                          )}
                        />, */}
                    </div>
                </div>
        </div>
      : null
  );
}

{/* <Descriptions
                  title="Session Details"
                  bordered
                  column={
                    {
                      xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1,
                    }
                  }
                  className="sessionInformationContainer">
                    <Descriptions.Item label="Yelp"><a href={winningRestaurant.url}>Check out {winningRestaurant.name} Yelp.</a></Descriptions.Item>
                    <Descriptions.Item label="Categories">{winningRestaurant.categories.map((category) => `${category.title} `)}</Descriptions.Item>
                </Descriptions> */}
