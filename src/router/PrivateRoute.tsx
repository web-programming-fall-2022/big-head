import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import AuthAtom from '../modules/auth/state/AuthAtom';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const [auth] = useRecoilState(AuthAtom);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('auth', auth);
    if (auth) return;

    if (!auth) {
      navigate('/login', { replace: true });
    }
  }, [auth]);

  if (!auth) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default PrivateRoute;
