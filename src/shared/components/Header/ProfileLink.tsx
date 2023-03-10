import { Avatar, CircularProgress, Sheet } from '@mui/joy';
import { Link } from 'react-router-dom';
import { v1UserInfoResponse } from '../../../api';
import useUser from '../../hooks/useUser';

function ProfileLink() {
  const { userLoading, user } = useUser();

  return (
    <Sheet
      onClick={() => {
        console.log('clicked');
      }}
      sx={{
        display: 'flex',
        width: '15%',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '8px',
        borderRadius: '8px',
        flexDirection: 'row',
        gap: '16px',
        ':hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          cursor: 'pointer',
        },
      }}>
      {userLoading ? (
        <CircularProgress />
      ) : (
        user && (
          <Link
            to={'user-info'}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              gap: '8px',
            }}>
            <Avatar />
            <span>
              {(user as v1UserInfoResponse).firstName}{' '}
              {(user as v1UserInfoResponse).lastName}
            </span>
          </Link>
        )
      )}
    </Sheet>
  );
}

export default ProfileLink;
