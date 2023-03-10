import { Button } from '@mui/joy';
import React from 'react';
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
