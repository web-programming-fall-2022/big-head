import { Sheet } from '@mui/joy';
import { FC } from 'react';
import Header, { HeaderProps } from '../components/Header';

interface Props extends HeaderProps {
  children: React.ReactNode;
}

const WithHeaderLayout: FC<Props> = (props: Props) => {
  const { type, children, title } = props;
  return (
    <>
      <Header type={type} title={title} />
      <Sheet
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          mt: '64px',
          height: 'calc(100vh - 64px)',

          overflowY: 'auto',
        }}>
        {props.children}
      </Sheet>
    </>
  );
};

export default WithHeaderLayout;
