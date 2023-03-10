import { useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

interface Alert {
  message: String | null;
  show: boolean;
}

const AlertAtom = atom<Alert | null>({
  key: 'alertKey',
  default: null,
});

const useAlert: () => [Alert | null, (message: String | null) => void] = () => {
  const [alertState, setAlert] = useRecoilState(AlertAtom);
  let cancelTimeout: NodeJS.Timeout | undefined;
  let dismissTimeout: NodeJS.Timeout | undefined;

  const setAlertState = (message: String | null) => {
    if (message === null) {
      return;
    }

    setAlert({
      message,
      show: true,
    });
    if (cancelTimeout) clearTimeout(cancelTimeout);
    if (dismissTimeout) clearTimeout(dismissTimeout);
    dismissTimeout = setTimeout(() => {
      setAlert({
        message,
        show: false,
      });
    }, 3000);
    cancelTimeout = setTimeout(() => {
      setAlert({
        message: null,
        show: false,
      });
    }, 4000);
  };

  return [alertState, setAlertState];
};

export default useAlert;
