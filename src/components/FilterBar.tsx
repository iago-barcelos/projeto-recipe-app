import { ByCategoriesType } from '../types';

type FilterBarProps = {
  page: string;
  categories: { strCategory: string }[];
  getByCategories: (toggle: string, category: string) => void;
  setByCategories:React.Dispatch<React.SetStateAction<{
    [x: string]: never[];
  }>>
};

function FilterBar({
  page,
  categories,
  getByCategories,
  setByCategories,
}: FilterBarProps) {
  return (
    <>
      <button
        data-testid="All-category-filter"
        onClick={ () => setByCategories({ [page]: [] }) }
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
      {categories.map((category, i) => (
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
