import { useState } from 'react';
import RecipeAppContext from './RecipeAppContext';
import useRecipeCategories from '../hooks/useRecipeCategories';
import useRecipeSearch from '../hooks/useRecipeSearch';

type RecipeAppProviderProps = {
  children: React.ReactNode;
};

export default function RecipeAppProvider({ children }: RecipeAppProviderProps) {
  const {
    searchResults,
    searchValue,
    handleChange,
    handleSearch,
  } = useRecipeSearch();
  const {
    mealCategories,
    drinkCategories,
    drinksByCategories,
    mealsByCategories,
    setDrinksByCategories,
    setMealsByCategories,
    getByCategories,
  } = useRecipeCategories();

  return (
    <RecipeAppContext.Provider
      value={ {
        searchResults,
        searchValue,
        handleChange,
        handleSearch,
        mealCategories,
        drinkCategories,
        drinksByCategories,
        mealsByCategories,
        setDrinksByCategories,
        setMealsByCategories,
        getByCategories,
      } }
    >
      <div className="recipeAppProvider">
        {children}
      </div>
    </RecipeAppContext.Provider>
  );
}
