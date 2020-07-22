/* eslint-disable no-return-assign */
import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button, Descriptions } from 'antd';
import StatusChip from '@bit/aurora.aurora-ds.status-chip';
import FoodIcon from '../../../Assets/FoodSVG';
import sessionData from '../../../Helpers/Data/sessionData';
import userSessionsData from '../../../Helpers/Data/userSessionsData';
import queryParameterData from '../../../Helpers/Data/queryParameterData';
import './SessionDetails.scss';

export default class SessionDetails extends React.Component {
  state = {
    session: [],
    queryParams: [],
    users: [],
    userStatus: [],
  }

  componentDidMount() {
    const theSessionId = this.props.match.params.sessionId;
    console.log(theSessionId, 'sessionId');
    sessionData.getASession(theSessionId)
      .then((result) => {
        this.setState({ session: result });
      });
    queryParameterData.getQueryParametersWithSessionId(theSessionId)
      .then((result) => {
        this.setState({ queryParams: result });
      });
    sessionData.getAllUsersOnASession(theSessionId)
      .then((result) => {
        this.setState({ users: result });
      });
    userSessionsData.getAllUsersSwipeStatusOnSessionId(theSessionId)
      .then((result) => {
        this.setState({ userStatus: result });
      })
      .catch((errorFromSessionDetails) => console.error(errorFromSessionDetails));
  }

  render() {
    return (
      <React.Fragment className="sessionDetails">
        <Result
          icon={<FoodIcon />}
          title="You have already swiped. Waiting on the rest of your party!"
        />
        <div className="sessionInformationSection">
        <Descriptions
        title="Session Information"
        bordered
        column={
          {
            xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1,
          }
        }
        className="sessionInformationContainer">
          <Descriptions.Item label="Location">{this.state.queryParams.map((query) => query.queryCity)}</Descriptions.Item>
          <Descriptions.Item label="Categories">{this.state.queryParams.map((query) => query.queryName)}</Descriptions.Item>
        </Descriptions>
        </div>
      <div className="userStatusSection">
        <div className="userStatusChipContainer">
          {this.state.userStatus.map((user) => <StatusChip
            title={user.fullName}
            message={(user.isSwiped) ? 'User has already swiped' : 'User still needs to swipe'}
            type={(user.isSwiped) ? 'success' : 'error'}
          />)}
        </div>
      </div>
      <div className="sessionDetailsBackButton">
        <Link to={'/'}>
          <Button type="primary" key="console">
                Head back to Sessions
          </Button>
        </Link>
      </div>
      </React.Fragment>
    );
  }
}
