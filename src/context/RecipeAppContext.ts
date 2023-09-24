import { createContext } from 'react';
import { SearchResultsType } from '../types';

export type RecipeAppContextType = {
  searchResults: SearchResultsType,
};

const RecipeAppContext = createContext({} as RecipeAppContextType);

export default RecipeAppContext;
