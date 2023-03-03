import { useRecoilState } from 'recoil';
import Auth from '../types/Auth';
import AuthAtom from './AuthAtom';

const useAuthState: () => [Auth | null, (auth: Auth) => void] = () => {
  const [auth, setAuth] = useRecoilState(AuthAtom);

  const setAuthState = (auth: Auth) => {
    localStorage.setItem('auth', JSON.stringify(auth));
    setAuth(auth);
  };
  return [auth, setAuthState];
};

export default useAuthState;
