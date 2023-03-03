import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from '@mui/joy/Button';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { RecoilRoot } from 'recoil';

import { CssBaseline } from '@mui/joy';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
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
