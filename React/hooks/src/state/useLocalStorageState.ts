import {} from 'react';

interface FuncUpdate<T> {
  (prevState?: T): T;
}

interface Options<T> {
  defaultValue?: T | (() => T);
  stringify?: (val: T) => string;
  parse?: (val: string) => T;
}

Storage

function useLocalStorageState<T>(
  key: string,
  options: Options
): [T : () => void];

export default useLocalStorageState;
