import { useRecoilState } from 'recoil';
import { OpenAPI } from '../../../api';
import Auth from '../types/Auth';
import AuthAtom from './AuthAtom';

const useAuthState: () => [
  Auth | null,
  (auth: Auth) => void,
  () => void
] = () => {
  const [auth, setAuth] = useRecoilState(AuthAtom);

  const setAuthLogin = (auth: Auth) => {
    localStorage.setItem('auth', JSON.stringify(auth));
    setAuth(auth);
  };

  const setAuthLogout = () => {
    localStorage.removeItem('auth');
    setAuth(null);
  };

  return [auth, setAuthLogin, setAuthLogout];
};

export default useAuthState;
