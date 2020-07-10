/* eslint-disable no-confusing-arrow */
/* eslint-disable arrow-parens */
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from './Store/Store';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => authed ? (
        <RouteComponent {...routeProps} />
      ) : (
        <Redirect to={'/'} />
      )
    }
    />
  );
};

export default PrivateRoute;
