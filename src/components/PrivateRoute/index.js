import { RouteBase } from 'constants/routeBase';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserLocalStorage } from 'services/localStorageServices';

const PrivateRoute = (props) => {
    const auth = useSelector((state) => state.authReducer.auth);
  const dataUserStorage = getUserLocalStorage();
  const { isLogin } = auth;

  // Render
  if (dataUserStorage.isLogged || isLogin) {
    return <Route {...props} />;
  }

  return <Redirect to={RouteBase.Login} />;
};

export default PrivateRoute;
