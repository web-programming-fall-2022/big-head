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

  const setAlertState = (message: String | null) => {
    if (message === null) {
      return;
    }
    setAlert({
      message,
      show: true,
    });
    setTimeout(() => {
      setAlert({
        message,
        show: false,
      });
    }, 3000);
    setTimeout(() => {
      setAlert({
        message: null,
        show: false,
      });
    }, 4000);
  };

  return [alertState, setAlertState];
};

export default useAlert;
