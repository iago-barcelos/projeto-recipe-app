import { useContext } from 'react';
import RecipeAppContext from '../context/RecipeAppContext';

type FilterBarProps = {
  page: string;
};

function FilterBar({ page }: FilterBarProps) {
  const recipeContext = useContext(RecipeAppContext);
  const {
    mealCategories,
    drinkCategories,
    setDrinksByCategories,
    setMealsByCategories,
    getByCategories,
  } = recipeContext;
  const checkMealCat = mealCategories || [];
  const checkDrinkCat = drinkCategories || [];
  return (
    <>
      <button
        data-testid="All-category-filter"
        onClick={
          page === 'meals'
            ? () => setMealsByCategories({ meals: [] })
            : () => setDrinksByCategories({ drinks: [] })
        }
      >
        <img
          src={ `../src/images/FilterBarIcons/all-${
            page === 'meals' ? 'meals' : 'drinks'
          }.svg` }
          alt=""
        />
        All
        {' '}
        {page}
      </button>
      {page === 'meals'
        && checkMealCat.map((category, i) => (
          <button
            key={ i }
            data-testid={ `${
              category.strCategory.includes('/')
                ? 'Other/Unknown'
                : category.strCategory
            }-category-filter` }
            onClick={ () => getByCategories(page, category.strCategory) }
          >
            <img
              src={ `../src/images/FilterBarIcons/${
                category.strCategory.includes('/')
                  ? 'Other'
                  : category.strCategory
              }.svg` }
              alt={ category.strCategory }
            />
            {category.strCategory}
          </button>
        ))}
      {page === 'drinks'
        && checkDrinkCat.map((category, i) => (
          <button
            key={ i }
            data-testid={ `${
              category.strCategory.includes('/')
                ? 'Other/Unknown'
                : category.strCategory
            }-category-filter` }
            onClick={ () => getByCategories(page, category.strCategory) }
          >
            <img
              src={ `../src/images/FilterBarIcons/${
                category.strCategory.includes('/')
                  ? 'Other'
                  : category.strCategory
              }.svg` }
              alt={ category.strCategory }
            />
            {category.strCategory}
          </button>
        ))}
    </>
  );
}

export default FilterBar;
