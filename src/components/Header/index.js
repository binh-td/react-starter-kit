import React from 'react';
import { Link } from 'react-router-dom';
import { RouteBase } from 'constants/routeBase';

const Header = (props) => {
  return (
    <div className="header">
      <Link to={RouteBase.Home}>Home</Link>
      <Link to={RouteBase.Login}>Login</Link>
      <Link to={RouteBase.DashBoard}>Dashboard</Link>
    </div>
  );
};

export default Header;
