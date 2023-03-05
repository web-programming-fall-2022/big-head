import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/joy';

type ResultItemProps = {
  title: string;
  url: string;
  status: string;
  imageUrl: string;
  rateCount: number;
  price: string;
};

export default function ResultItem({
  title,
  url,
  status,
  imageUrl,
  rateCount,
  price,
}: ResultItemProps) {
  return (
    <Box
      sx={{
        border: '1px solid #dddddd',
        borderRadius: '8px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        alignItems: 'center',
      }}>
      <img src={imageUrl} alt="image" style={{ width: '80%' }} />
      <Typography level="body1" sx={{ alignSelf: 'flex-start', my: '1rem' }}>
        {title}
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          margin: '8px 0 16px 0',
        }}>
        <Typography level="body2">
          {status === 'marketable' ? `${price} تومان` : 'ناموجود'}
        </Typography>
        <Typography level="body2">{`امتیاز: ${rateCount}`}</Typography>
      </Box>
      <Button onClick={() => window.open(url, '_blank')}>
        رفتن به صفحه‌ی دیجی‌کالای محصول
      </Button>
    </Box>
  );
}
