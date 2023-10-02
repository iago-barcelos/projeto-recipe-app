import { useState, useEffect } from 'react';
import { MealRecipeDetailsType, DrinksRecipeDetailsType, FormatedRecipe } from '../types';
import { formatMealRecipe, formatDrinkRecipe } from '../utils/functions';

const useFormatRecipes = (
  mealOrDrink: boolean,
  mealRecipe: MealRecipeDetailsType | undefined,
  drinkRecipe: DrinksRecipeDetailsType | undefined,
) => {
  const [formatedRecipe, setFormatedRecipe] = useState<FormatedRecipe>([]);

  useEffect(() => {
    if (mealOrDrink && mealRecipe) {
      const recipe = formatMealRecipe(mealRecipe as MealRecipeDetailsType);
      setFormatedRecipe(recipe);
    } else if (!mealOrDrink && drinkRecipe) {
      const recipe = formatDrinkRecipe(drinkRecipe as DrinksRecipeDetailsType);
      setFormatedRecipe(recipe);
    }
  }, [mealRecipe, drinkRecipe, mealOrDrink]);

  return {
    formatedRecipe,
  };
};

export default useFormatRecipes;
