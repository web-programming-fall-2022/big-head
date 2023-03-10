import { Box, Button, Typography, Grid } from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FavoriteServiceService, v1Product } from '../../api';
import useAlert from '../../shared/useAlert';

interface Props {
  product: v1Product;
}

function FavoriteItem(props: Props) {
  const { product } = props;
  const { title, imageUrl, price, rate, status, url } = product;
  const [_, setAlert] = useAlert();
  const queryClient = useQueryClient();

  const { mutateAsync: removeFromFavorites, isLoading } = useMutation({
    mutationFn: FavoriteServiceService.favoriteServiceRemoveItemFromFavorites,
    onSuccess: () => {
      setAlert('محصول با موفقیت از لیست علاقه‌مندی‌ها حذف شد!');
      queryClient.invalidateQueries(['favorites']);
    },
  });

  const deleteItemFromFavorites = () => {
    if (!product.id) {
      return;
    }
    removeFromFavorites({ listName: 'favorites', productId: product.id! });
  };
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
      <Button
        sx={{ width: '100%', marginTop: '0.5rem' }}
        color="danger"
        variant="outlined"
        onClick={deleteItemFromFavorites}>
        حذف
      </Button>
    </Box>
  );
}

export default FavoriteItem;
