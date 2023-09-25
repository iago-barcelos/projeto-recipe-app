import { useContext, useEffect, useState } from 'react';
import { getFetch } from '../utils/functions';
import { ByCategoriesType } from '../types';
import RecipeAppContext from '../context/RecipeAppContext';

type FilterBarProps = {
  page: string;
};

function FilterBar({ page }: FilterBarProps) {
  const recipeContext = useContext(RecipeAppContext);
  const { searchResults } = recipeContext;
  const [byCategories, setByCategories] = useState<ByCategoriesType>({
    byCategories: [],
  });
  const [categories, setCategories] = useState([{ strCategory: '' }]);

  const getByCategories2 = async (endpoint: string, category: string) => {
    const filterResult = await getFetch(`https://www.${endpoint}.com/api/json/v1/1/filter.php?c=`, `${category}`);
    setByCategories(filterResult);
  };

  const getByCategories = async (toggle: string) => {
    const endpoint = toggle === 'meals' ? 'themealdb' : 'thecocktaildb';
    const filterResult = await getFetch(`https://www.${endpoint}.com/api/json/v1/1/list.php?c=list`, '');
    const filteredCategories = filterResult[toggle].slice(0, 5);
    if (toggle === 'drinks') {
      filteredCategories[3] = { strCategory: 'Other-Unknown' };
    }
    setCategories(filteredCategories);
  };

  useEffect(() => {
    getByCategories(page);
  }, [page]);

  return (
    <>
      <button data-testid="All-category-filter">
        <img src={ `../src/images/FilterBarIcons/all{${page}}.svg` } alt="" />
        All
        {' '}
        {page}
      </button>
      {categories.map((category, i) => (
        <button key={ i } data-testid={ `${category.strCategory}-category-filter` }>
          <img
            src={ `../src/images/FilterBarIcons/${category.strCategory}.svg` }
            alt={ category.strCategory }
          />
          {category.strCategory}
        </button>
      ))}

    </>
  );
}

export default FilterBar;
