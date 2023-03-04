import { Alert, Box } from '@mui/joy';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import useAlert from './shared/useAlert';

const App = () => {
  const [alertState] = useAlert();

  return (
    <>
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
            top: 0,
            right: 0,
            zIndex: 1000,
            p: 2,
            transition: 'opacity 1s ease-in-out',
          }}>
          <Alert>{alertState?.message}</Alert>
        </Box>
      </Box>

      <RouterProvider router={router} />
    </>
  );
};

export default App;
