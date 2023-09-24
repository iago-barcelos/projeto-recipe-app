import { useEffect, useState } from 'react';
import { getFetch } from '../utils/functions';
import beef from '../images/FilterBarIcons/beef.svg';
import chicken from '../images/FilterBarIcons/chicken.svg';
import breakfast from '../images/FilterBarIcons/breakfast.svg';
import goat from '../images/FilterBarIcons/goat.svg';
import allMeals from '../images/FilterBarIcons/allMeals.svg';

type MealsCategoriesType = {
  categories: []
};

type Drinks = {
  drinks: [],
};

type Category = {
  idCategory: string,
  strCategory: string,
};

function FilterBar() {
  const [mealCategories, setMealCategories] = useState<MealsCategoriesType>({
    categories: [],
  });
  const [drinksCategories, setDrinksCategories] = useState<Drinks>({
    drinks: [],
  });
  const mapMealCategories = mealCategories.categories.map((category: Category) => ({
    idCategory: category.idCategory,
    strCategory: category.strCategory,
  }));
  const mapDrinksCategories = drinksCategories.drinks.map((category: Category, i) => (
    {
      idCategory: i,
      strCategory: category.strCategory,
    }
  ));

  useEffect(() => {
    const getCategories = async () => {
      const mealsResult = await getFetch('https://www.themealdb.com/api/json/v1/1/categories.php', '');
      const drinksResult = await getFetch(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
        '',
      );
      setMealCategories(mealsResult);
      setDrinksCategories(drinksResult);
    };
    getCategories();
  }, []);

  return (
    <div>
      <button>
        .
        <img src={ allMeals } alt="All meals" />
      </button>
      <button>
        .
        <img src={ beef } alt="Beef" />
      </button>
      <button>
        .
        <img src={ chicken } alt="Chicken" />
      </button>
      <button>
        .
        <img src={ goat } alt="Goat" />
      </button>
      <button>
        .
        <img src={ breakfast } alt="Breakfast" />
      </button>
    </div>
  );
}

export default FilterBar;
