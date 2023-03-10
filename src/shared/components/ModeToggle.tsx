import { Button, useColorScheme } from '@mui/joy';
import React from 'react';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      sx={{
        width: '100%',
      }}
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}>
      {mode === 'light' ? 'تم شب' : 'تم روز'}
    </Button>
  );
}

export default ModeToggle;
