import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import authAtom from '../modules/auth/state/AuthAtom';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PublicRoute = () => {
  const [auth] = useRecoilState(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/', { replace: true });
    }
  }, [auth]);

  return <Outlet />;
};

export default PublicRoute;
