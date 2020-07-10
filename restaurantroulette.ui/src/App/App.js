/* eslint-disable arrow-body-style */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import firebaseConnect from '../Helpers/Data/connection';
import Home from '../Components/Pages/Home/Home';
import Sessions from '../Components/Pages/Sessions/Sessions';
import Swipe from '../Components/Pages/Swipe/Swipe';
import Menu from '../Components/Shared/Menu/Menu';
import './App.scss';
import 'antd/dist/antd.css';

firebaseConnect();

// const PublicRoute = ({ component: Component, authed, ...rest }) => {
//   const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
//   return <Route {...rest} render={(props) => routeChecker(props)} />;
// };
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
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
              <Route path="/" exact component={(props) => <Home {...props} authed={authed} />} authed={authed} />
              <PrivateRoute path="/sessions" exact component={(props) => <Sessions {...props} authed={authed} />} authed={authed} />
              <PrivateRoute path="/swipe" exact component={Swipe} authed={authed} />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
