import { useQuery } from '@tanstack/react-query';
import { AuthServiceService } from '../../api';
import useAuthState from '../../modules/auth/state/useAuthState';
import useAlert from '../components/Alert/useAlert';

const useUser = () => {
  const [_, __, logout] = useAuthState();
  const [___, setAlert] = useAlert();
  const { isLoading: userLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: AuthServiceService.authServiceUserInfo,
    onError: error => {
      logout();
      setAlert('لطفا دوباره وارد شوید');
    },
  });
  return { userLoading, user };
};

export default useUser;
