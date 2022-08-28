import { useMemo } from 'react';
import useToggle from './useToggle';

interface Actions {
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  set: (vakue: boolean) => void;
}

function useBoolean(defaultValue = false): [boolean, Actions] {
  const [state, { toggle, set }] = useToggle(defaultValue);

  const actions = useMemo(() => {
    const setTrue = () => set(true);
    const setFalse = () => set(false);

    return {
      toggle,
      setTrue,
      setFalse,
      set: (val) => set(!!val),
    };
  }, []);

  return [state, actions];
}

export default useBoolean;
