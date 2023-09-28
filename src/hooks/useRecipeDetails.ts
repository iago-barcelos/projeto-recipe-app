import { useEffect, useState } from 'react';
import { getFetch } from '../utils/functions';
import { MealRecipeDetailsType, DrinksRecipeDetailsType } from '../types';

const useRecipeDetails = (id: string) => {
  const [mealRecipeDetail, setMealRecipeDetail] = useState<MealRecipeDetailsType>();
  const [drinkRecipeDetail, setDrinkRecipeDetail] = useState<DrinksRecipeDetailsType>();

  const checkURL = window.location.pathname;
  const endpoint = checkURL.includes('meals') ? 'themealdb' : 'thecocktaildb';
  useEffect(() => {
    const fetchData = async () => {
      const result = await getFetch(`https://www.${endpoint}.com/api/json/v1/1/lookup.php?i=${id}`, '');
      if (endpoint === 'themealdb') {
        setMealRecipeDetail({ meals: result.meals } as MealRecipeDetailsType);
      }
      setDrinkRecipeDetail({ drinks: result.drinks } as DrinksRecipeDetailsType);
    };
    fetchData();
  }, [endpoint, id]);

  return {
    mealRecipeDetail,
    drinkRecipeDetail,
  };
};

export default useRecipeDetails;
