import { Avatar, Button, CircularProgress, Sheet, Typography } from '@mui/joy';
import { Link } from 'react-router-dom';
import { v1UserInfoResponse } from '../../api';
import LogoutButton from '../../shared/components/Header/LogoutButton';
import ModeToggle from '../../shared/components/ModeToggle';
import useUser from '../../shared/hooks/useUser';
import WithHeaderLayout from '../../shared/layout/WithHeaderLayout';

function UserInfoPage() {
  const { userLoading, user } = useUser();
  return (
    <WithHeaderLayout type="title" title="پروفایل">
      <Sheet
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Sheet
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            padding: '16px',
            height: '100%',
            maxWidth: '400px',
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
                sx={{ margin: '0.5rem 0', width: '100%' }}>
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
              <Button
                sx={{
                  width: '100%',
                }}
                color="neutral"
                variant="outlined">
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
      </Sheet>
    </WithHeaderLayout>
  );
}

export default UserInfoPage;
