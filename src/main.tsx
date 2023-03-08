import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import { CssBaseline, CssVarsProvider, extendTheme } from '@mui/joy';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const customTheme = extendTheme({
  fontFamily: {
    body: 'Vazirmatn, Roboto, sans-serif',
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider theme={customTheme}>
      <CssBaseline />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </RecoilRoot>
    </CssVarsProvider>
  </React.StrictMode>
);
