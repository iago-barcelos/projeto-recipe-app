import { useEffect, useState } from 'react';
import { getFetch } from '../utils/functions';

const useRecipeDetails = (id: string) => {
  const [recipeDetail, setRecipeDetail] = useState();

  const checkURL = window.location.pathname;
  const endpoint = checkURL.includes('meals') ? 'themealdb' : 'thecocktaildb';
  useEffect(() => {
    const fetchData = async () => {
      const result = await getFetch(`https://www.${endpoint}.com/api/json/v1/1/lookup.php?i=${id}`, '');
      setRecipeDetail(result);
    };
    fetchData();
  }, [endpoint, id]);

  return {
    recipeDetail,
  };
};

export default useRecipeDetails;
