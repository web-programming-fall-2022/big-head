import { atom } from 'recoil';
import Auth from '../types/Auth';

const AuthAtom = atom<Auth | null>({
  key: 'auth',
  // get initial state from local storage to enable user to stay logged in
  default:
    localStorage.getItem('auth') === undefined
      ? null
      : (JSON.parse(localStorage.getItem('auth')!) as Auth),
});

export default AuthAtom;
