import { Button } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { OpenAPI, SearchServiceService, v1SearchRequest } from '../api';
import useAuthState from './auth/state/useAuthState';

function HomePage() {
  const [_, __, setAuthLogout] = useAuthState();
  useQuery({
    queryKey: ['search'],
    queryFn: async () => {
      return SearchServiceService.searchServiceSearch({});
    },
  });
  return (
    <div>
      <Button
        sx={{
          width: '100%',
          maxWidth: 100,
          m: 4,
        }}
        onClick={() => {
          setAuthLogout();
        }}>
        <p>خروج</p>
      </Button>
      <div>خانه</div>
    </div>
  );
}

export default HomePage;
