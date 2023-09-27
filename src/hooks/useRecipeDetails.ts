import { useEffect, useState } from 'react';
import { getFetch } from '../utils/functions';
import { MealRecipeDetailsType, DrinksRecipeDetailsType } from '../types';

const useRecipeDetails = (id: string) => {
  const [recipeDetail, setRecipeDetail] = useState<
  MealRecipeDetailsType | DrinksRecipeDetailsType
  >();

  const checkURL = window.location.pathname;
  const endpoint = checkURL.includes('meals') ? 'themealdb' : 'thecocktaildb';
  useEffect(() => {
    const fetchData = async () => {
      const result = await getFetch(`https://www.${endpoint}.com/api/json/v1/1/lookup.php?i=${id}`, '');
      if (endpoint === 'themealdb') {
        setRecipeDetail({ meals: result.meals } as MealRecipeDetailsType);
      }
      setRecipeDetail({ drinks: result.drinks } as DrinksRecipeDetailsType);
    };
    fetchData();
  }, [endpoint, id]);

  return {
    recipeDetail,
  };
};

export default useRecipeDetails;
