import { Avatar, Button, CircularProgress, Sheet, Typography } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthServiceService, v1UserInfoResponse } from '../../api';
import LogoutButton from '../../shared/components/Header/LogoutButton';
import ModeToggle from '../../shared/components/ModeToggle';
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
            <ModeToggle />
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

            <Button
              color="neutral"
              variant="outlined"
              sx={{ margin: '0.5rem 0' }}>
              <Link
                to={'/search-history'}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                  gap: '8px',
                  color: 'inherit',
                }}>
                <span>تاریخچه‌ی جستجوها</span>
              </Link>
            </Button>
            <Button color="neutral" variant="outlined">
              <Link
                to={'/favorites'}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                  gap: '8px',
                  color: 'inherit',
                }}>
                <span>لیست علاقه‌مندی‌ها</span>
              </Link>
            </Button>
            <LogoutButton />
          </>
        )}
      </Sheet>
    </WithHeaderLayout>
  );
}

export default UserInfoPage;
