import { createBrowserRouter, Outlet, RouteObject } from 'react-router-dom';
import LoginPage from '../modules/auth/LoginPage';
import RegisterPage from '../modules/auth/RegisterPage';
import UserInfoPage from '../modules/auth/UserInfoPage';
import CropPage from '../modules/search/SelectPhotoPage';
import SearchHistoryPage from '../modules/search/SearchHistoryPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import FavoritesPage from '../modules/favorites/FavoritesPage';

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
          {
            path: '/search-history',
            element: <SearchHistoryPage />,
          },
          {
            path: '/favorites',
            element: <FavoritesPage />,
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
