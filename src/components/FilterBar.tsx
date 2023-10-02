import { useContext, useState } from 'react';
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

  const [isFilterOn, setIsFilterOn] = useState(false);

  const handleFilterButtonClick = (strCategory: string) => {
    if (isFilterOn) {
      // Mateus Tápias: não consegui colocar esse condicional do page em um ternário
      if (page === 'meals') {
        setMealsByCategories({ meals: [] });
      } else {
        setDrinksByCategories({ drinks: [] });
      }
    } else {
      getByCategories(page, strCategory);
    }
    setIsFilterOn(!isFilterOn);
  };

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
          src={ `../src/images/FilterBarIcons/all-${page === 'meals' ? 'meals' : 'drinks'
          }.svg` }
          alt=""
        />
        All
        {' '}
        {page}
      </button>
      {page === 'meals' ? (
        mealCategories?.map((category, i) => (
          <button
            key={ i }
            data-testid={ `${category.strCategory.includes('/')
              ? 'Other/Unknown'
              : category.strCategory
            }-category-filter` }
            onClick={ () => handleFilterButtonClick(category.strCategory) }
          >
            <img
              src={ `../src/images/FilterBarIcons/${category.strCategory.includes('/')
                ? 'Other'
                : category.strCategory
              }.svg` }
              alt={ category.strCategory }
            />
            {category.strCategory}
          </button>
        ))
      ) : (
        drinkCategories?.map((category, i) => (
          <button
            key={ i }
            data-testid={ `${category.strCategory.includes('/')
              ? 'Other/Unknown'
              : category.strCategory
            }-category-filter` }
            onClick={ () => handleFilterButtonClick(category.strCategory) }
          >
            <img
              src={ `../src/images/FilterBarIcons/${category.strCategory.includes('/')
                ? 'Other'
                : category.strCategory
              }.svg` }
              alt={ category.strCategory }
            />
            {category.strCategory}
          </button>
        ))
      )}
    </>
  );
}

export default FilterBar;
