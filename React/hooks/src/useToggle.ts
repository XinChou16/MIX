import { useState, useMemo } from 'react';

interface Actions<T> {
  toggle: () => void;
  set: (val: T) => void;
  setLeft: () => void;
  setRight: () => void;
}

function useToggle<T = boolean>(): [boolean, Actions<T>];

function useToggle<T>(defaultValue: T): [T, Actions<T>];

function useToggle<T, U>(
  defaultValue: T,
  reverseValue: U
): [T | U, Actions<T | U>];

function useToggle<D, R>(
  defaultValue: D = false as unknown as D,
  reverseValue?: R
) {
  const [state, setState] = useState<D | R>(defaultValue);

  const actions = useMemo(() => {
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R;

    const set = (val: D | R) => setState(val);
    const toggle = () => setState(s => (s === defaultValue ? reverseValueOrigin : defaultValue));
    const setLeft = () => setState(defaultValue);
    const setRight = () => setState(reverseValueOrigin);

    return { set, toggle, setLeft, setRight };
  }, []);

  return [state, actions];
}

export default useToggle;
