import { Alert, Box } from '@mui/joy';
import useAlert from './useAlert';

function BenAlert() {
  const [alertState] = useAlert();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
      <Box
        sx={{
          maxWidth: '400px',
          position: 'fixed',
          opacity: alertState?.show ? 1 : 0,
          bottom: 0,
          right: 0,
          zIndex: 1000,
          p: 2,
          transition: 'opacity 1s ease-in-out',
        }}>
        <Alert>{alertState?.message}</Alert>
      </Box>
    </Box>
  );
}

export default BenAlert;
