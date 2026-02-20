import { useState, useEffect } from 'react';
import { useDataset } from './useDataset';

export function useLocalStorage(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  const [_, setDataset] = useDataset(value, key);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    setDataset(value);
  }, [value, key, setDataset]);

  return [value, setValue];
}
