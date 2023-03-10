import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import BenAlert from './shared/components/Alert';

import { CssBaseline, CssVarsProvider, extendTheme } from '@mui/joy';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import React from 'react';

const customTheme = extendTheme({
  fontFamily: {
    body: 'Vazirmatn, Roboto, sans-serif',
  },
});

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <CssVarsProvider theme={customTheme}>
        <CssBaseline />
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <>
              <BenAlert />
              <RouterProvider router={router} />
            </>
          </QueryClientProvider>
        </RecoilRoot>
      </CssVarsProvider>
    </React.StrictMode>
  );
};

export default App;
