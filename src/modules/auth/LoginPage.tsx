import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Sheet,
  Typography,
} from '@mui/joy';
import ModeToggle from '../../shared/components/ModeToggle';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useAuthState from './state/useAuthState';

const LoginPage = () => {
  const [auth, setAuth] = useAuthState();
  const { mutateAsync: login, isLoading } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return {
        token: '1234567890',
      };
    },
    onSuccess: data => {
      setAuth(data);
    },
  });
  return (
    <Sheet
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
        m: 0,
      }}>
      <Sheet
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Sheet
          sx={{
            width: '100%',
            maxWidth: 400,
            my: 4,
            py: 3,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined">
          <ModeToggle />
          <div>
            <Typography level="h4" component="h1">
              <b>خوش آمدید</b>
            </Typography>
            <Typography level="body2">برای ادامه وارد شوید</Typography>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              login({
                email: formData.get('email') as string,
                password: formData.get('password') as string,
              });
            }}>
            <FormControl>
              <FormLabel>ایمیل</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                sx={{ direction: 'ltr' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>رمز عبور</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="password"
                sx={{ direction: 'ltr' }}
              />
            </FormControl>

            <Button
              sx={{ mt: 2, width: '100%' }}
              type="submit"
              loading={isLoading}>
              ورود
            </Button>
          </form>
          <Typography
            endDecorator={<Link to="/register">ثبت‌نام</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}>
            حساب کاربری ندارید؟
          </Typography>
        </Sheet>
      </Sheet>
    </Sheet>
  );
};

export default LoginPage;
