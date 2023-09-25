import useRecipeCategories from '../hooks/useRecipeCategories';

type FilterBarProps = {
  page: string;
};

function FilterBar({ page }: FilterBarProps) {
  const { getByCategories, categories, byCategories } = useRecipeCategories(page);
  console.log(byCategories);
  return (
    <>
      <button data-testid="All-category-filter">
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
