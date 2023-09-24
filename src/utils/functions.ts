import { CocktailType, MealType, UserInfoType } from '../types';

export const saveLocalStorage = (
  key: string,
  item: UserInfoType | MealType | CocktailType,
) => {
  const saveItens = localStorage.setItem(key, JSON.stringify(item));
  return saveItens;
};

// export const getLocalStorage = (key: string) => {
//   const loadItens = JSON.parse(localStorage.getItem(key) as string);
//   return loadItens;
// };

export const getFetch = (endpoint: string, searchValue: string) => {
  const fetchResult = fetch(endpoint += searchValue)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
  return fetchResult;
};