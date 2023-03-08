import { Avatar, CircularProgress, Sheet, Typography } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AuthServiceService, v1UserInfoResponse } from '../../api';
import LogoutButton from '../../shared/components/Header/LogoutButton';
import WithHeaderLayout from '../../shared/layout/WithHeaderLayout';

function UserInfoPage() {
  const { isLoading: userLoading, data: user } = useQuery(
    ['user'],
    AuthServiceService.authServiceUserInfo
  );
  return (
    <WithHeaderLayout type="title" title="پروفایل">
      <Sheet
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          padding: '16px',
        }}>
        {userLoading ? (
          <CircularProgress />
        ) : (
          <>
            <h4>پروفایل</h4>
            <Avatar size="lg" />
            <Typography
              component={'span'}
              sx={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}>
              {(user as v1UserInfoResponse).firstName}{' '}
              {(user as v1UserInfoResponse).lastName}
            </Typography>
            <span>{(user as v1UserInfoResponse).email}</span>
            <span>{(user as v1UserInfoResponse).phoneNumber}</span>
            <LogoutButton />
          </>
        )}
      </Sheet>
    </WithHeaderLayout>
  );
}

export default UserInfoPage;
