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

export const fetchById = async (API: string, id: string) => {
  try {
    const response = await fetch(
      `https://www.the${API}db.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados da API');
    }
    const data = await response.json();
    return data;
  } catch {
    console.error('Erro ao buscar os dados da API:', Error);
  }
};

// const data = await fetchById('cocktail', '17222');
// console.log('data');
