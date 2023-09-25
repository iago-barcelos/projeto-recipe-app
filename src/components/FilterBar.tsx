import { useState } from 'react';
import { getFetch } from '../utils/functions';
import beef from '../images/FilterBarIcons/beef.svg';
import chicken from '../images/FilterBarIcons/chicken.svg';
import breakfast from '../images/FilterBarIcons/breakfast.svg';
import goat from '../images/FilterBarIcons/goat.svg';
import allMeals from '../images/FilterBarIcons/allMeals.svg';
import dessert from '../images/FilterBarIcons/cake.svg';
import ordinaryDrink from '../images/FilterBarIcons/ordinaryDrink.svg';
import allDrinks from '../images/FilterBarIcons/allDrinks.svg';
import cocktail from '../images/FilterBarIcons/cocktail.svg';
import shake from '../images/FilterBarIcons/shake.svg';
import otherUnknown from '../images/FilterBarIcons/otherUnknown.svg';
import cocoa from '../images/FilterBarIcons/cocoa.svg';
import { ByCategoriesType } from '../types';

type FilterBarProps = {
  page: string;
};

function FilterBar({ page }: FilterBarProps) {
  const [byCategories, setByCategories] = useState<ByCategoriesType>({
    byCategories: [],
  });

  const getByCategories = async (endpoint: string, category: string) => {
    const filterResult = await getFetch(`https://www.${endpoint}.com/api/json/v1/1/filter.php?c=`, `${category}`);
    setByCategories(filterResult);
  };

  return (
    <>
      {page === 'meals' && (
        <div>
          <button
            data-testid="all-meals-category-filter"
            onClick={ () => getByCategories('themealdb', '') }
          >
            <img src={ allMeals } alt="All meals" />
            All meals
          </button>
          <button
            data-testid="Beef-category-filter"
            onClick={ () => getByCategories('themealdb', 'Beef') }
          >
            <img src={ beef } alt="Beef" />
            Beef
          </button>
          <button
            data-testid="Chicken-category-filter"
            onClick={ () => getByCategories('themealdb', 'Chicken') }
          >
            <img src={ chicken } alt="Chicken" />
            Chicken
          </button>
          <button
            data-testid="Goat-category-filter"
            onClick={ () => getByCategories('themealdb', 'Goat') }
          >
            <img src={ goat } alt="Goat" />
            Goat
          </button>
          <button
            data-testid="Breakfast-category-filter"
            onClick={ () => getByCategories('themealdb', 'Breakfast') }
          >
            <img src={ breakfast } alt="Breakfast" />
            Breakfast
          </button>
          <button
            data-testid="Dessert-category-filter"
            onClick={ () => getByCategories('themealdb', 'Dessert') }
          >
            <img src={ dessert } alt="Dessert" />
            Dessert
          </button>
        </div>
      )}
      {page === 'drinks' && (
        <div>
          <button
            data-testid="all-drinks-category-filter"
            onClick={ () => getByCategories('thecocktaildb', 'All') }
          >
            <img src={ allDrinks } alt="All drinks" />
            All drinks
          </button>
          <button
            data-testid="Ordinary Drink-category-filter"
            onClick={ () => getByCategories('thecocktaildb', 'Ordinary_Drink') }
          >
            <img src={ ordinaryDrink } alt="Ordinary Drink" />
            Ordinary Drink
          </button>
          <button
            data-testid="Cocktail-category-filter"
            onClick={ () => getByCategories('thecocktaildb', 'Cocktail') }
          >
            <img src={ cocktail } alt="Cocktail" />
            Cocktail
          </button>
          <button
            data-testid="Shake-category-filter"
            onClick={ () => getByCategories('thecocktaildb', 'Shake') }
          >
            <img src={ shake } alt="Shake" />
            Shake
          </button>
          <button
            data-testid="Other/Unknown-category-filter"
            onClick={ () => getByCategories('thecocktaildb', 'Other / Unknown') }
          >
            <img src={ otherUnknown } alt="Other / Unknown" />
            Other / Unknown
          </button>
          <button
            data-testid="Cocoa-category-filter"
            onClick={ () => getByCategories('thecocktaildb', 'Cocoa') }
          >
            <img src={ cocoa } alt="Cocoa" />
            Cocoa
          </button>
        </div>
      )}
    </>
  );
}

export default FilterBar;
