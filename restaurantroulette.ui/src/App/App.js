/* eslint-disable no-confusing-arrow */
/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnect from '../Helpers/Data/connection';
import Home from '../Components/Pages/Home/Home';
import Sessions from '../Components/Pages/Sessions/Sessions';
import Swipe from '../Components/Pages/Swipe/Swipe';
import Menu from '../Components/Shared/Menu/Menu';
import NewSession from '../Components/Pages/NewSession/NewSession';
import Winner from '../Components/Pages/Winner/Winner';
import SessionDetails from '../Components/Pages/SessionDetails/SessionDetails';
import CompletedSessionDetails from '../Components/Pages/CompletedSessionDetails/CompletedSessionDetails';
import AddFriends from '../Components/Pages/AddFriends/AddFriends';
import NoWinner from '../Components/Pages/NoWinner/NoWinner';
import './App.scss';
import 'antd/dist/antd.css';

firebaseConnect();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: RouteComponent, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => authed ? (
        <RouteComponent {...routeProps} />
      ) : (
        <Redirect to={'/auth'} />
      )
    }
    />
  );
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeEventListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeEventListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
          <Menu authed={authed} />
            <Switch>
              <PublicRoute path="/auth" exact component={(props) => <Home {...props} authed={authed} />} authed={authed} />
              <PrivateRoute path="/" exact component={(props) => <Sessions {...props} authed={authed} />} authed={authed} />
              <PrivateRoute path="/:userId/addFriends" exact component={(props) => <AddFriends {...props} authed={authed} />} authed={authed} />
              <PrivateRoute path="/session/:sessionId" exact component={(props) => <SessionDetails {...props} authed={authed} />} authed={authed} />
              <PrivateRoute path="/completedSession/:sessionId" exact component={(props) => <CompletedSessionDetails {...props} authed={authed} />} authed={authed} />
              <PrivateRoute path="/newSession/:userId/:newSessionId" exact component={(props) => <NewSession {...props} authed={authed} />} authed={authed} />
              <PrivateRoute path="/newSession/:userId/:newSessionId/swipe" exact component={(props) => <Swipe {...props} authed={authed} />} authed={authed} />
              <PrivateRoute path="/newSession/:userId/:newSessionId/winner" exact component={(props) => <Winner {...props} authed={authed} />} authed={authed} />
              <PrivateRoute path="/newSession/:userId/:newSessionId/noMatches" exact component={(props) => <NoWinner {...props} authed={authed} />} authed={authed} />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
