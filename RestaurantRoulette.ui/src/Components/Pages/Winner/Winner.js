/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Rate,
  Descriptions,
  Card,
} from 'antd';
import {
  PhoneTwoTone,
  EnvironmentTwoTone,
  ClockCircleTwoTone,
} from '@ant-design/icons';
import Media from 'react-media';
import FaceIcon from '@bit/mui-org.material-ui-icons.face';
import Chip from '@bit/mui-org.material-ui.chip';
import Table from '@bit/react-bootstrap.react-bootstrap.table';
import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';
import userSessionsData from '../../../Helpers/Data/userSessionsData';
import yelpData from '../../../Helpers/Data/yelpData';
import sessionData from '../../../Helpers/Data/sessionData';
import queryParameterData from '../../../Helpers/Data/queryParameterData';
import './Winner.scss';

const { Paragraph, Text } = Typography;

export default function Winner(props) {
  const [allUsersStatus, setAllUsersStatus] = useState([]);
  const [newRestCount, setNewRestCount] = useState(0);
  const [status, setStatus] = useState(false);
  const [winningRestaurant, setWinningRestaurant] = useState([]);
  const [hours, setHours] = useState([]);
  const [location, setLocation] = useState([]);
  const [restaurantStatus, setRestaurantStatus] = useState(false);
  const [queryParams, setQueryParams] = useState([]);
  const [users, setUsers] = useState([]);

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
              if (typeof restaurant === 'string') {
                setNewRestCount(newRestCount + props.location.state);
                props.history.push({
                  pathname: `/newSession/${Number(props.match.params.userId)}/${Number(props.match.params.newSessionId)}/noMatches`,
                });
              } else {
                setWinningRestaurant(restaurant);
                setLocation(restaurant.location);
                setHours(restaurant.hours);
                setNewRestCount(props.location.state);
              }
            }).then(() => {
              setRestaurantStatus(true);
            })
            .then(() => {
              queryParameterData.getQueryParametersWithSessionId(Number(props.match.params.newSessionId))
                .then((params) => {
                  setQueryParams(params);
                });
            })
            .then(() => {
              sessionData.getAllUsersOnASession(Number(props.match.params.newSessionId))
                .then((userData) => {
                  setUsers(userData);
                });
            });
        } else {
          props.history.push({
            pathname: `/session/${Number(props.match.params.newSessionId)}`,
          });
        }
      })
      .catch((errorFromGetUsersStatus) => console.error(errorFromGetUsersStatus));
  }, [props.match.params.newSessionId]);

  const desktopRender = () => {
    return (winningRestaurant.name !== undefined)
      ? <div className="completeSessionDetails">
            <div className="completeSessionDetailsTopSection">
              <div className="topSectionContainer">
              <div className="topSectionTitle">
                  <div className="topSectionActualTitle">
                    <Typography variant="h1">And the Winner was:</Typography>
                  </div>
                  <div className="topSectionTitleName">
                    <h1 className="actualTitle">{winningRestaurant.name}</h1>
                  </div>
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
                            <h3>Hours of Operation</h3>
                          </div>
                          <ReactBootstrapStyle />
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                                <th>Sunday</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{winningRestaurant.hours[0].open[0].start}-{winningRestaurant.hours[0].open[0].end}</td>
                                <td>{winningRestaurant.hours[0].open[1].start}-{winningRestaurant.hours[0].open[1].end}</td>
                                <td>{winningRestaurant.hours[0].open[2].start}-{winningRestaurant.hours[0].open[2].end}</td>
                                <td>{winningRestaurant.hours[0].open[3].start}-{winningRestaurant.hours[0].open[3].end}</td>
                                <td>{winningRestaurant.hours[0].open[4].start}-{winningRestaurant.hours[0].open[4].end}</td>
                                <td>{winningRestaurant.hours[0].open[5].start}-{winningRestaurant.hours[0].open[5].end}</td>
                                <td>{winningRestaurant.hours[0].open[6].start}-{winningRestaurant.hours[0].open[6].end}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                    </div>
            </div>
      : null;
  };

  const mobileRender = () => {
    return (winningRestaurant.name !== undefined)
      ? <div className="completeSessionDetails">
            <div className="completeSessionDetailsTopSection">
              <div className="topSectionContainer">
                <div className="topSectionTitle">
                  <div className="topSectionActualTitle">
                    <Typography variant="h1">And the Winner was:</Typography>
                  </div>
                  <div className="topSectionTitleName">
                    <h1 className="actualTitle">{winningRestaurant.name}</h1>
                  </div>
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
                        <div className="pastSessionMobileDetailsContainer">
                        <div className="pastSessionMobileRestaurantDetails">
                          <div className="winningPhotoContainer">
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
                          </div>
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
                            <h3>Hours of Operation</h3>
                          </div>
                          <ReactBootstrapStyle />
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Day</th>
                                <th>Hours Open</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Monday</td>
                                <td>{winningRestaurant.hours[0].open[0].start}-{winningRestaurant.hours[0].open[0].end}</td>
                              </tr>
                              <tr>
                                <td>Tuesday</td>
                                <td>{winningRestaurant.hours[0].open[0].start}-{winningRestaurant.hours[0].open[0].end}</td>
                              </tr>
                              <tr>
                                <td>Wednesday</td>
                                <td>{winningRestaurant.hours[0].open[0].start}-{winningRestaurant.hours[0].open[0].end}</td>
                              </tr>
                              <tr>
                                <td>Thursday</td>
                                <td>{winningRestaurant.hours[0].open[0].start}-{winningRestaurant.hours[0].open[0].end}</td>
                              </tr>
                              <tr>
                                <td>Friday</td>
                                <td>{winningRestaurant.hours[0].open[0].start}-{winningRestaurant.hours[0].open[0].end}</td>
                              </tr>
                              <tr>
                                <td>Saturday</td>
                                <td>{winningRestaurant.hours[0].open[0].start}-{winningRestaurant.hours[0].open[0].end}</td>
                              </tr>
                              <tr>
                                <td>Sunday</td>
                                <td>{winningRestaurant.hours[0].open[0].start}-{winningRestaurant.hours[0].open[0].end}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                    </div>
            </div>
      : null;
  };

  return (
    <Media queries={{
      small: '(min-width: 320px) and (max-width: 767px)',
      medium: '(min-width: 768px) and (max-width: 1024px)',
      large: '(min-width: 1025px)',
    }}>
      {(matches) => (
        <React.Fragment>
                {matches.small && mobileRender()}
                {matches.medium && mobileRender()}
                {matches.large && desktopRender()}
        </React.Fragment>
      )}
    </Media>
  );
}
