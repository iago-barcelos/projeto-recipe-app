import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, initialValue: string) => {
  const [localStorageInfo, setLocalStorageInfo] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    // local storage atualizado toda vez que o estado localStorageInfo é atualizado
    localStorage.setItem(key, JSON.stringify(localStorageInfo));
  }, [localStorageInfo]);

  return [localStorageInfo, setLocalStorageInfo];
};

export default useLocalStorage;
