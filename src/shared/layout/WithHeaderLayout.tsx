import { Sheet } from '@mui/joy';
import { FC } from 'react';
import Header, { HeaderProps } from '../components/Header';

interface Props extends HeaderProps {
  children: React.ReactNode;
}

const WithHeaderLayout: FC<Props> = (props: Props) => {
  const { type, children, title } = props;
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}>
      <Header type={type} title={title} />
      <Sheet
        sx={{
          flex: 1,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          margin: '64px 0 0',
        }}>
        {props.children}
      </Sheet>
    </Sheet>
  );
};

export default WithHeaderLayout;
