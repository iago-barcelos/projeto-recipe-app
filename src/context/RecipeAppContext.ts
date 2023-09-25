import { createContext } from 'react';
import { SearchResultsType } from '../types';

export type RecipeAppContextType = {
  searchResults: SearchResultsType,
  searchValue: string,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleSearch: (page: string) => void,
};

const RecipeAppContext = createContext({} as RecipeAppContextType);

export default RecipeAppContext;
