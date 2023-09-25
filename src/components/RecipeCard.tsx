import { CocktailType, MealType } from '../types';

type RecipeCardProps = {
  drinks?: CocktailType[],
  meals?: MealType[],
};

function RecipeCard({ meals = [], drinks = [] }: RecipeCardProps) {
  const shownMealsResults = meals.length > 12 ? (
    meals.slice(0, 12)) : meals;
  const shownDrinksResults = drinks.length > 12 ? (
    drinks.slice(0, 12)) : drinks;
  return (
    <>
      {shownMealsResults.length > 0 && (
        shownMealsResults.map(({ strMealThumb, strMeal }, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ strMeal }
            />
            <span data-testid={ `${index}-card-name` } key={ index }>{strMeal}</span>
          </div>
        ))
      )}
      {shownDrinksResults.length > 0 && (
        shownDrinksResults.map(({ strDrink, strDrinkThumb }, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ strDrink }
            />
            <span data-testid={ `${index}-card-name` } key={ index }>{strDrink}</span>
          </div>
        ))
      )}
    </>
  );
}

export default RecipeCard;
