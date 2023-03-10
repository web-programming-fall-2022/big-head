import { Button } from '@mui/joy';
import useAuthState from '../../../modules/auth/state/useAuthState';

function LogoutButton() {
  const [_, __, logout] = useAuthState();

  return (
    <Button type="button" variant="plain" color="danger" onClick={logout}>
      خروج
    </Button>
  );
}

export default LogoutButton;
