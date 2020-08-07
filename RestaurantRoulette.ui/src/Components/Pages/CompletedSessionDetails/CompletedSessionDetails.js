/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react';
import {
  Descriptions,
  Typography,
  Rate,
  Card,
} from 'antd';
import Media from 'react-media';
import FaceIcon from '@bit/mui-org.material-ui-icons.face';
import Table from '@bit/react-bootstrap.react-bootstrap.table';
import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';
import Chip from '@bit/mui-org.material-ui.chip';
import {
  PhoneTwoTone,
  EnvironmentTwoTone,
  ClockCircleTwoTone,
  StarTwoTone,
  StarOutlined,
} from '@ant-design/icons';
import sessionData from '../../../Helpers/Data/sessionData';
import queryParameterData from '../../../Helpers/Data/queryParameterData';
import userSessionsData from '../../../Helpers/Data/userSessionsData';
import yelpData from '../../../Helpers/Data/yelpData';
import './CompletedSessionDetails.scss';

const { Paragraph } = Typography;

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

  const toStandardTime = (militaryTime) => {
    console.log(militaryTime);
  const newTime = Array.from(militaryTime);
  const hours = `${newTime[0]}${newTime[1]}`;
  const minutes = `${newTime[2]}${newTime[3]}`;
  console.log(hours);
  console.log(minutes);
  console.log(newTime);
    if (hours > 12) {
      return `${hours - 12}:${minutes} PM`;
    }
    else {
        return `${hours}:${minutes} AM`;
    }
  }

  // const toStandardTime = (militaryTime) => {
  //   militaryTime = militaryTime.split(':');
  //   if (militaryTime[0].charAt(0) === 1 && militaryTime[0].charAt(1) > 2) {
  //     return (militaryTime[0] - 12) + ':' + militaryTime[1] + ':' + militaryTime[2] + ' P.M.';
  //   } else {
  //     return militaryTime.join(':') + ' A.M.';
  //   }
  // }



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
                          xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1,
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
                          <StarTwoTone className="site-result-demo-error-icon" />
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
                                <td>{toStandardTime(winningRestaurant.hours[0].open[0].start)}-{toStandardTime(winningRestaurant.hours[0].open[0].end)}</td>
                                <td>{toStandardTime(winningRestaurant.hours[0].open[1].start)}-{toStandardTime(winningRestaurant.hours[0].open[1].end)}</td>
                                <td>{toStandardTime(winningRestaurant.hours[0].open[2].start)}-{toStandardTime(winningRestaurant.hours[0].open[2].end)}</td>
                                <td>{toStandardTime(winningRestaurant.hours[0].open[3].start)}-{toStandardTime(winningRestaurant.hours[0].open[3].end)}</td>
                                <td>{toStandardTime(winningRestaurant.hours[0].open[4].start)}-{toStandardTime(winningRestaurant.hours[0].open[4].end)}</td>
                                <td>{toStandardTime(winningRestaurant.hours[0].open[5].start)}-{toStandardTime(winningRestaurant.hours[0].open[5].end)}</td>
                                <td>{toStandardTime(winningRestaurant.hours[0].open[6].start)}-{toStandardTime(winningRestaurant.hours[0].open[6].end)}</td>
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
                          <StarOutlined className="site-result-demo-error-icon" />
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
