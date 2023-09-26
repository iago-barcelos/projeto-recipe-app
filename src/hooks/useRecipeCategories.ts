import { useState, useEffect } from 'react';
import { getFetch } from '../utils/functions';

const useRecipeCategories = () => {
  const [mealCategories, setMealCategories] = useState([{ strCategory: '' }]);
  const [drinkCategories, setDrinkCategories] = useState([{ strCategory: '' }]);
  const [drinksByCategories, setDrinksByCategories] = useState({ drinks: [] });
  const [mealsByCategories, setMealsByCategories] = useState({ meals: [] });

  const getCategories = async () => {
    const mealCategoriesResult = await getFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list', '');
    const drinkCategoriesResult = await getFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', '');
    const filteredMealCat = mealCategoriesResult.meals.slice(0, 5);
    const filteredDrinkCat = drinkCategoriesResult.drinks.slice(0, 5);
    setMealCategories(filteredMealCat);
    setDrinkCategories(filteredDrinkCat);
  };

  const getByCategories = async (toggle: string, category: string) => {
    const endpoint = toggle === 'meals' ? 'themealdb' : 'thecocktaildb';
    const filterResult = await getFetch(`https://www.${endpoint}.com/api/json/v1/1/filter.php?c=`, `${category}`);
    setDrinksByCategories(
      toggle === 'drinks' ? { drinks: filterResult.drinks } : { drinks: [] },
    );
    setMealsByCategories(
      toggle === 'meals' ? { meals: filterResult.meals } : { meals: [] },
    );
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    mealCategories,
    drinkCategories,
    drinksByCategories,
    mealsByCategories,
    getByCategories,
    setDrinksByCategories,
    setMealsByCategories,
  };
};

export default useRecipeCategories;
