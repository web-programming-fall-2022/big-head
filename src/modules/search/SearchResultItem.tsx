import { Box, Button, Typography, Grid } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import { FavoriteServiceService, v1AddItemToFavoritesRequest, v1Product } from '../../api';
import useAlert from '../../shared/useAlert';

interface Props {
  product: v1Product;
}

function ResultItem(props: Props) {
  const { product } = props;
  const { title, imageUrl, price, rate, status, url } = product;
  const [_, setAlert] = useAlert();

  const { mutateAsync: addToFavorites, isLoading } = useMutation({
    mutationFn: async (data: v1AddItemToFavoritesRequest) => {
      return FavoriteServiceService.favoriteServiceAddItemToFavorites(data);
    },
    onSuccess: success => {
      if (success) {
        setAlert('محصول با موفقیت به لیست علاقه‌مندی‌ها اضافه شد!')
      }
    },
  });

  const addItemToFavorites = () => {
    addToFavorites({
      list_name: 'favorites',
      product_id: product.id as number,
    });
  }
  return (
    <Box
      sx={{
        border: '1px solid #dddddd',
        borderRadius: '8px',
        margin: '0.5rem',
        padding: '1rem',
        display: '',
        flexDirection: 'column',
        maxWidth: '300px',
        alignItems: 'center',
      }}>
      <img
        src={imageUrl}
        alt="image"
        style={{ width: '100%', padding: '8px', borderRadius: '8px 8px 0 0' }}
      />
      <Typography
        level="body1"
        sx={{
          alignSelf: 'flex-start',
          my: '1rem',
          height: '72px',
          overflow: 'hidden',
        }}>
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
          {status === 'marketable' ? `${price} ریال` : 'ناموجود'}
        </Typography>
        <Typography level="body2">{`امتیاز: ${rate?.rate}`}</Typography>
      </Box>
      <Button sx={{ width: '100%' }} onClick={() => window.open(url, '_blank')}>
        رفتن به صفحه‌ی دیجی‌کالای محصول
      </Button>
      <Button sx={{ width: '100%', marginTop: '0.5rem' }} variant='outlined' onClick={addItemToFavorites}>
        افزودن به علاقه‌مندی‌ها
      </Button>
    </Box>
  );
}

export default ResultItem;
