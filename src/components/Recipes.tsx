import { useNavigate } from 'react-router-dom';
import { CocktailType, MealType } from '../types';

type RecipeCardProps = {
  drinks?: CocktailType[],
  meals?: MealType[],
  byCategories?: { [x: string]: never[]; };
};

function Recipes({
  meals = [],
  drinks = [],
  byCategories = { byCategories: [] },
}: RecipeCardProps) {
  const shownMealsResults = meals.length > 12 ? meals.slice(0, 12) : meals;
  const shownDrinksResults = drinks.length > 12 ? drinks.slice(0, 12) : drinks;
  const catMeal = byCategories?.meals || [];
  const catDrink = byCategories?.drinks || [];
  const shownCatMeals = catMeal.length > 12 ? catMeal.slice(0, 12) : catMeal;
  const shownCatDrinks = catDrink.length > 12 ? catDrink.slice(0, 12) : catDrink;

  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    const route = shownMealsResults.length > 0 ? 'meals' : 'drinks';
    navigate(`/${route}/${id}`);
  };

  return (
    <>
      {shownMealsResults.length > 0
        && shownDrinksResults.length === 0
        && shownMealsResults.map(({ idMeal, strMealThumb, strMeal }, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ idMeal }
            role="button"
            tabIndex={ 0 }
            onClick={ () => handleCardClick(idMeal) }
            onKeyDown={ (event) => {
              if (event.key === 'Enter') {
                handleCardClick(idMeal);
              }
            } }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ strMeal }
            />
            <span data-testid={ `${index}-card-name` } key={ index }>
              {strMeal}
            </span>
          </div>
        ))}
      {shownDrinksResults.length > 0
        && shownMealsResults.length === 0
        && shownDrinksResults.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ idDrink }
            role="button"
            tabIndex={ 0 }
            onClick={ () => handleCardClick(idDrink) }
            onKeyDown={ (event) => {
              if (event.key === 'Enter') {
                handleCardClick(idDrink);
              }
            } }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ strDrink }
            />
            <span data-testid={ `${index}-card-name` } key={ index }>
              {strDrink}
            </span>
          </div>
        ))}

      {shownCatMeals.length > 0
        && shownCatDrinks.length === 0
        && shownCatMeals.map(({ strMealThumb, strMeal }, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ strMeal }
            />
            <span data-testid={ `${index}-card-name` } key={ index }>
              {strMeal}
            </span>
          </div>
        ))}
      {shownCatDrinks.length > 0
        && shownCatMeals.length === 0
        && shownCatDrinks.map(({ strDrink, strDrinkThumb }, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ strDrink }
            />
            <span data-testid={ `${index}-card-name` } key={ index }>
              {strDrink}
            </span>
          </div>
        ))}
    </>
  );
}

export default Recipes;
