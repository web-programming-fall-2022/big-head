import { useRecoilState } from 'recoil';
import AuthAtom from './atoms/AuthAtom';

const LoginPage = () => {
  const [auth, setAuth] = useRecoilState(AuthAtom);
  return <div>Login</div>;
};

export default LoginPage;
