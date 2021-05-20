import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SecureRoute from 'routes/SecureRoute';
import PrivateRoute from 'components/PrivateRoute';
import { RouteBase } from 'constants/routeBase';
import { checkAuth } from 'redux/modules/auth';
import LoginPage from 'pages/Login';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  //! Render
  return (
    <Router>
      <Switch>
        <Route path={RouteBase.Login} exact component={LoginPage} />
        <PrivateRoute path="/" component={SecureRoute} />
      </Switch>
    </Router>
  );
};

export default App;
