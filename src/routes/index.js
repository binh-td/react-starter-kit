import { lazy } from 'react';
import withErrorBoundary from 'components/HOCs/withErrorBoundary';
import { RouteBase } from 'constants/routeBase';

const HomePage = lazy(() => import('pages/Home'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const Page404 = lazy(() => import('pages/Page404'));

// For secured route
export default [
  { path: RouteBase.Dashboard, name: 'Dashboard', component: withErrorBoundary(Dashboard) },
  { path: RouteBase.Home, exact: true, name: 'Home', component: withErrorBoundary(HomePage) },
  { name: RouteBase.Page404, component: withErrorBoundary(Page404) },
];
