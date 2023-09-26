import { createContext } from 'react';
import { SearchResultsType } from '../types';

export type RecipeAppContextType = {
  searchResults: SearchResultsType,
  searchValue: string,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleSearch: (page: string) => void,
  mealCategories: { strCategory: string }[],
  drinkCategories: { strCategory: string }[],
  drinksByCategories: { drinks: never[] },
  mealsByCategories: { meals: never[] },
  setDrinksByCategories: React.Dispatch<React.SetStateAction<{
    drinks: never[];
  }>>,
  setMealsByCategories: React.Dispatch<React.SetStateAction<{
    meals: never[];
  }>>,
  getByCategories: (toggle: string, category: string) => Promise<void>,
};

const RecipeAppContext = createContext({} as RecipeAppContextType);

export default RecipeAppContext;
