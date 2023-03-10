import { Button, Sheet, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import ProfileLink from './ProfileLink';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export interface HeaderProps {
  type?: 'profile' | 'title';
  title?: string;
}

function Header(props: HeaderProps) {
  const { type = 'profile', title } = props;
  const navigate = useNavigate();

  if (type === 'profile') {
    return (
      <Sheet
        sx={{
          zIndex: 1,
          position: 'fixed',
          width: '100%',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.24)',
        }}>
        <ProfileLink />

        <LogoutButton />
      </Sheet>
    );
  } else {
    return (
      <Sheet
        sx={{
          zIndex: 1,
          position: 'fixed',
          width: '100%',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: '16px',
          padding: '0 16px',
          boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.24)',
        }}>
        <Button onClick={() => navigate(-1)} variant="soft">
          <ArrowForwardIcon></ArrowForwardIcon>
        </Button>

        <Typography level="h5" component="h1">
          <b>{title || 'بزرگ کله'}</b>
        </Typography>
      </Sheet>
    );
  }
}

export default Header;
