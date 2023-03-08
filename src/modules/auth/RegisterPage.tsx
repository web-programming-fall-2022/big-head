import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Sheet,
  Typography,
} from '@mui/joy';
import ModeToggle from '../../shared/components/ModeToggle';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useAlert from '../../shared/useAlert';
import { AuthServiceService, v1RegisterRequest } from '../../api';
import useAuthState from './state/useAuthState';
import Auth from './types/Auth';

const RegisterPage = () => {
  const [_, setAlert] = useAlert();
  const [__, setAuthLogin] = useAuthState();
  const navigate = useNavigate();
  const { mutateAsync: register, isLoading } = useMutation({
    mutationFn: async (data: v1RegisterRequest) => {
      return AuthServiceService.authServiceRegister(data);
    },
    onSuccess: data => {
      setAuthLogin(data as Auth);
      setAlert('ثبت‌نام با موفقیت انجام شد');
      navigate('/login');
    },
    onError: (error: any) => {
      setAlert(String(error.message));
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
            borderRadius: '8px',
            boxShadow: '16',
          }}
          variant="outlined">
          <ModeToggle />
          <div>
            <Typography level="h4" component="h1">
              <b>ثبت‌نام</b>
            </Typography>
            <Typography level="body2">برای ادامه ثبت‌نام کنید</Typography>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              register({
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                first_name: formData.get('first_name') as string,
                last_name: formData.get('last_name') as string,
                gender: 'M',
                phone_number: formData.get('phone_number') as string,
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
              <FormLabel>نام</FormLabel>
              <Input name="first_name" type="text" placeholder="بنیامین" />
            </FormControl>
            <FormControl>
              <FormLabel>نام خانوادگی</FormLabel>
              <Input name="last_name" type="text" placeholder="بیضایی" />
            </FormControl>
            <FormControl>
              <FormLabel>شماره تماس</FormLabel>
              <Input
                name="phone_number"
                type="tel"
                placeholder="+989931203930"
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
              ثبت‌نام
            </Button>
          </form>
          <Typography
            endDecorator={<Link to="/login">ورود</Link>}
            fontSize="12px"
            sx={{ alignSelf: 'center' }}>
            حساب کاربری دارید؟
          </Typography>
        </Sheet>
      </Sheet>
    </Sheet>
  );
};

export default RegisterPage;
