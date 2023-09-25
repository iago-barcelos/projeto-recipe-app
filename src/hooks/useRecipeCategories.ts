import { useState, useEffect } from 'react';
import { ByCategoriesType } from '../types';
import { getFetch } from '../utils/functions';

const useRecipeCategories = (page: string) => {
  const [categories, setCategories] = useState([{ strCategory: '' }]);
  const [byCategories, setByCategories] = useState<ByCategoriesType>({
    byCategories: [],
  });

  const getCategories = async (toggle: string) => {
    const endpoint = toggle === 'meals' ? 'themealdb' : 'thecocktaildb';
    const filterResult = await getFetch(`https://www.${endpoint}.com/api/json/v1/1/list.php?c=list`, '');
    const filteredCategories = filterResult[toggle].slice(0, 5);
    setCategories(filteredCategories);
  };

  const getByCategories = async (toggle: string, category: string) => {
    const endpoint = toggle === 'meals' ? 'themealdb' : 'thecocktaildb';
    const filterResult = await getFetch(`https://www.${endpoint}.com/api/json/v1/1/filter.php?c=`, `${category}`);
    setByCategories({ byCategories: filterResult[toggle] });
  };

  useEffect(() => {
    getCategories(page);
  }, [page]);

  return {
    categories,
    byCategories,
    getByCategories,
  };
};

export default useRecipeCategories;
