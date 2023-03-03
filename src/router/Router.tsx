import { createBrowserRouter, Outlet, RouteObject } from 'react-router-dom';
import LoginPage from '../modules/auth/LoginPage';
import RegisterPage from '../modules/auth/RegisterPage';
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
          {
            path: '/register',
            element: <RegisterPage />,
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
