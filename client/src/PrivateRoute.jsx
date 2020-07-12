import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authContext } from './contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { store } = useContext(authContext);
  useEffect(() => {
    console.log(store.get.auth);
  });
  return (
    <Route
      {...rest}
      render={props =>
        store.get.auth === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
