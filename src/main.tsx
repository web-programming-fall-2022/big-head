import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from '@mui/joy/Button';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { CssBaseline } from '@mui/joy';
const customTheme = extendTheme({
  fontFamily: {
    body: 'Vazirmatn, Roboto, sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider theme={customTheme}>
      <CssBaseline />
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </CssVarsProvider>
  </React.StrictMode>
);
