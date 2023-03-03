import { createBrowserRouter, Outlet, RouteObject } from 'react-router-dom';
import LoginPage from '../modules/auth/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const routes: RouteObject[] = [
  {
    element: <Outlet />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/',
            element: <>Home</>,
          },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
        ],
      },
    ],
    errorElement: <>Error</>,
  },
];

const router = createBrowserRouter(routes, {
  basename: '/big-head/',
});

export default router;
