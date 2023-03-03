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

const RegisterPage = () => {
  const [alert, setAlert] = useAlert();
  const navigate = useNavigate();
  const { mutateAsync: register, isLoading } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return true;
    },
    onSuccess: data => {
      setAlert('ثبت‌نام با موفقیت انجام شد');
      navigate('/login');
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
            <FormControl>
              <FormLabel>تکرار رمز عبور</FormLabel>
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
            fontSize="sm"
            sx={{ alignSelf: 'center' }}>
            حساب کاربری دارید؟
          </Typography>
        </Sheet>
      </Sheet>
    </Sheet>
  );
};

export default RegisterPage;
