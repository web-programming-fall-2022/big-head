import React from 'react';
import { CircularProgress, Grid, Sheet, Typography } from '@mui/joy';
import WithHeaderLayout from '../../shared/layout/WithHeaderLayout';
import { useQuery } from '@tanstack/react-query';
import { FavoriteServiceService, v1GetFavoritesResponse } from '../../api';
import FavoriteItem from './FavoriteItem';

function FavoritesPage() {
  const { data: favorites, isLoading: favoritesLoading } = useQuery(
    ['favorites'],
    () => FavoriteServiceService.favoriteServiceGetFavorites('favorites')
  );

  return (
    <WithHeaderLayout type="title" title="علاقه‌مندی‌ها">
      <Sheet
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          padding: '16px',
        }}>
        {favoritesLoading ? (
          <CircularProgress />
        ) : (
          <>
            <h4>لیست علاقه‌مندی‌ها</h4>
            {(favorites as v1GetFavoritesResponse).products?.length === 0 && (
              <Typography>لیست علاقه‌مندی‌های شما خالی است.</Typography>
            )}
            {favorites !== undefined &&
              (favorites as v1GetFavoritesResponse).products!.length > 0 && (
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}>
                  {(favorites as v1GetFavoritesResponse).products!.map(
                    product => (
                      <FavoriteItem key={product.id} product={product} />
                    )
                  )}
                </Grid>
              )}
          </>
        )}
      </Sheet>
    </WithHeaderLayout>
  );
}

export default FavoritesPage;
