import { Box, Button, Typography, Grid } from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FavoriteServiceService, v1Product } from '../../api';
import useAlert from '../../shared/components/Alert/useAlert';

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
        display: 'flex',
        alignItems: 'center',
        height: '143px',
      }}>
      <img
        src={imageUrl}
        alt="image"
        style={{ height: '100px', borderRadius: '8px 8px 0 0' }}
      />
      <Box sx={{ maxWidth: '200px', display: 'flex', flexDirection: 'column' }}>
        <Typography
          level="body1"
          sx={{
            width: '100%',
            my: '0.5rem',
            overflow: 'hidden',
          }}>
          {title}
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
          }}>
          <Typography level="body2">
            {`${
              status === 'marketable' ? `${price} ریال` : 'ناموجود'
            } | امتیاز: ${rate?.rate}`}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', marginRight: '1rem' }}>
        <Button
          size="sm"
          sx={{ width: '100%', fontSize: '12px' }}
          onClick={() => window.open(url, '_blank')}>
          صفحه‌ی دیجی‌کالا
        </Button>
        <Button
          size="sm"
          sx={{ width: '100%', marginTop: '0.5rem', fontSize: '12px' }}
          color="danger"
          variant="outlined"
          onClick={deleteItemFromFavorites}
          loading={isLoading}>
          حذف
        </Button>
      </Box>
    </Box>
  );
}

export default FavoriteItem;
