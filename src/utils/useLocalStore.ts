import React, { useRef } from 'react';

export interface ILocalStore {
  destroy: () => void;
}

export const useLocalStore = <T extends ILocalStore>(creator: () => T) => {
  const store = useRef<T | null>(null);
  if (store.current === null) {
    store.current = creator();
  }

  React.useEffect(() => {
    return () => store.current?.destroy();
  }, []);

  return store.current;
};
