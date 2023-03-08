import { createBrowserRouter, Outlet, RouteObject } from 'react-router-dom';
import LoginPage from '../modules/auth/LoginPage';
import RegisterPage from '../modules/auth/RegisterPage';
import UserInfoPage from '../modules/auth/UserInfoPage';
import HomePage from '../modules/HomePage';
import CropPage from '../modules/search/SelectPhotoPage';
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
            element: <CropPage />,
          },
          {
            path: '/user-info',
            element: <UserInfoPage />,
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
