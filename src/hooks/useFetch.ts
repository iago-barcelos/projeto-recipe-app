import { useState, useEffect } from 'react';
import { CocktailType, MealType, SearchResultsType } from '../types';
import { getFetch } from '../utils/functions';

const useFetch = (endPoint: string) => {
  const [initialResults, setInitialResults] = useState<SearchResultsType>(
    { meals: [], drinks: [] },
  );
  const [recommendedDrinks, setRecommendedDrinks] = useState<CocktailType[]>([]);
  const [recommendedMeals, setRecommendedMeals] = useState<MealType[]>([]);

  const checkURL = window.location.pathname;
  const startPoint = checkURL.includes('meals') ? 'https://www.themealdb.com/' : 'https://www.thecocktaildb.com/';

  const getRecommended = async () => {
    const drinks = await getFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setRecommendedDrinks(drinks.drinks);
    const meals = await getFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setRecommendedMeals(meals.meals);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `${startPoint}${endPoint}`;
      const result = await getFetch(url);
      setInitialResults(result);
    };
    fetchData();
    getRecommended();
  }, []);

  return {
    initialResults,
    recommendedDrinks,
    recommendedMeals,
  };
};

export default useFetch;
