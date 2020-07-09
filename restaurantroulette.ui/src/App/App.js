import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Home from '../Components/Pages/Home/Home';
import Sessions from '../Components/Pages/Sessions/Sessions';
import Swipe from '../Components/Pages/Swipe/Swipe';
import Menu from '../Components/Shared/Menu/Menu';
import { Context, reducer, initialState } from '../Helpers/Store/Store';
import './App.scss';

export default function App() {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <Context.Provider
      value={{
        store,
        dispatch,
      }}>
      <Router>
        <Menu />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sessions" exact component={Sessions} />
            <Route path="/swipe" exact component={Swipe} />
        </Switch>
      </Router>
      </Context.Provider>
    </div>
  );
}
