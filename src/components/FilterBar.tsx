import { useContext, useState } from 'react';
import RecipeAppContext from '../context/RecipeAppContext';
import * as S from '../styles/style';

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
    <S.FilterBar>
      <S.CategoryBtn
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
      </S.CategoryBtn>
      {page === 'meals' ? (
        mealCategories?.map((category, i) => (
          <S.CategoryBtn
            key={ i }
            data-testid={ `${category.strCategory?.includes('/')
              ? 'Other/Unknown'
              : category.strCategory
            }-category-filter` }
            onClick={ () => handleFilterButtonClick(category?.strCategory) }
          >
            <img
              src={ `../src/images/FilterBarIcons/${category?.strCategory?.includes('/')
                ? 'Other'
                : category?.strCategory
              }.svg` }
              alt={ category?.strCategory }
            />
            {category?.strCategory}
          </S.CategoryBtn>
        ))
      ) : (
        drinkCategories?.map((category, i) => (
          <S.CategoryBtn
            key={ i }
            data-testid={ `${category?.strCategory?.includes('/')
              ? 'Other/Unknown'
              : category?.strCategory
            }-category-filter` }
            onClick={ () => handleFilterButtonClick(category?.strCategory) }
          >
            <img
              src={ `../src/images/FilterBarIcons/${category?.strCategory?.includes('/')
                ? 'Other'
                : category?.strCategory
              }.svg` }
              alt={ category?.strCategory }
            />
            {category?.strCategory}
          </S.CategoryBtn>
        ))
      )}
    </S.FilterBar>
  );
}

export default FilterBar;
