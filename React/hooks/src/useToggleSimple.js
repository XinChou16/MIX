import { useCallback, useState } from 'react';

export default function useToggle(left, right) {
  const [flag, setFlag] = useState(left);

  const toggle = useCallback(() => {
    setFlag((val) => (val === left ? right : left));
  }, [left, right]);

  return [flag, toggle];
}
