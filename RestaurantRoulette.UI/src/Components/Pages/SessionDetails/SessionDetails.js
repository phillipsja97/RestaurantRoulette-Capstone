import React, { useEffect, useState } from 'react';
import sessionData from '../../../Helpers/Data/sessionData';
import queryParameterData from '../../../Helpers/Data/queryParameterData';

export default class SessionDetails extends React.Component {
  state = {
    session: [],
    queryParams: [],
    users: [],
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
      })
      .catch((errorFromSessionDetails) => console.error(errorFromSessionDetails));
  }

  render() {
    const stateOfSession = this.state.session.map((x) => x.isSessionComplete);
    return (
      <React.Fragment>
        <h1>Session Details</h1>
        {(stateOfSession === true) ? <h1>Complete</h1> : <h1>Incomplete</h1>}
        {this.state.queryParams.map((x) => <h1>{x.queryName}</h1>)}
        {this.state.users.map((x) => <h1>{x.fullName}</h1>)}
      </React.Fragment>
    );
  }
}
