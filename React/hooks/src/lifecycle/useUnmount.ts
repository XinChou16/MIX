import { useEffect } from 'react';
import useLatest from '../advanced/useLatest';

function useUnmount(fn: () => void) {
  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    []
  );
}

export default useUnmount;
