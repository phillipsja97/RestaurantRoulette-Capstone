/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react';
import {
  Descriptions,
  Typography,
  Rate,
  Card,
} from 'antd';
import FaceIcon from '@bit/mui-org.material-ui-icons.face';
import Table from '@bit/react-bootstrap.react-bootstrap.table';
import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';
import Chip from '@bit/mui-org.material-ui.chip';
import {
  PhoneTwoTone,
  EnvironmentTwoTone,
  ClockCircleTwoTone,
  DollarCircleTwoTone,
} from '@ant-design/icons';
import sessionData from '../../../Helpers/Data/sessionData';
import queryParameterData from '../../../Helpers/Data/queryParameterData';
import userSessionsData from '../../../Helpers/Data/userSessionsData';
import yelpData from '../../../Helpers/Data/yelpData';
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
      : null
  );
}
