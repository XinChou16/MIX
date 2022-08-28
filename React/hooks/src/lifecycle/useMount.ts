import { useEffect } from 'react';

function useMount(fn: () => void) {
  useEffect(() => {
    fn && fn();
  }, []);
}

export default useMount;
