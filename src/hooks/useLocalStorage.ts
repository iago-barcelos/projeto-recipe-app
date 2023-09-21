import { useEffect, useState } from 'react';
import { UserInfoType, CocktailType, MealType } from '../types';

// mudar tipo de initialValue para o tipo de elemento que vai entrar através do envio do form ou retorno da API

const useLocalStorage = (
  key: string,
  initialValue: UserInfoType | CocktailType | MealType | null,
) => {
  const [localStorageInfo, setLocalStorageInfo] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  return [localStorageInfo, setLocalStorageInfo];
};

export default useLocalStorage;
