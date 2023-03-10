import { Button, Sheet, Typography } from '@mui/joy';
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../../shared/components/Header/LogoutButton';

const ErrorPage = () => {
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
      <Typography
        sx={{
          fontSize: '10rem',
          fontWeight: 'bold',
          margin: '0',
        }}>
        404
      </Typography>
      <Typography
        sx={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          margin: '1rem',
          textAlign: 'center',
        }}>
        متاسفانه مشکلی پیش آمده است. دوباره تلاش کنید.
      </Typography>
      <Link to={'/'}>
        <Button>بازگشت به صفحه‌ی اصلی</Button>
      </Link>
      <LogoutButton />
    </Sheet>
  );
};

export default ErrorPage;
