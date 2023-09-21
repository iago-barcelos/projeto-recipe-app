import { useEffect, useState } from 'react';

// mudar tipo de initialValue para o tipo de elemento que vai entrar através do envio do form

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
