import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </CssVarsProvider>
  </React.StrictMode>
);
