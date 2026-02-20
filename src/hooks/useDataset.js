import { useEffect, useState } from 'react';

export function useDataset(value, key) {
  const [dataset, setDataset] = useState(() => document.documentElement.getAttribute(`data-${key}`));

  useEffect(() => {
    if (!value) return;
    setDataset(() => document.documentElement.setAttribute(`data-${key}`, value));
  }, [value, key, setDataset]);

  return [dataset, setDataset];
}
