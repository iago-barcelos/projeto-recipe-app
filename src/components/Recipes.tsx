import { Link } from 'react-router-dom';
import { CocktailType, MealType } from '../types';
import * as S from '../styles/meals&Drinks';
import useCounter from '../hooks/useCounter';

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

  const { handlePreviousRecipes, handleNextRecipes, mainCounter } = useCounter();

  return (
    <section id="homeContent">
      <div id="cardContainer">
        {shownMealsResults.length > 0
          && shownDrinksResults.length === 0
          && shownMealsResults.map(({ idMeal, strMealThumb, strMeal }, index) => (
            <Link key={ idMeal } to={ `/meals/${idMeal}` }>
              <S.RecipeCard
                data-testid={ `${index}-recipe-card` }
                role="button"
                tabIndex={ 0 }
                style={ {
                  display:
                    index < mainCounter && index >= mainCounter - 4
                      ? 'flex'
                      : 'none',
                } }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt={ strMeal }
                />
                <section id="titleContainer">
                  <span data-testid={ `${index}-card-name` } key={ index }>
                    {strMeal}
                  </span>
                </section>
              </S.RecipeCard>
            </Link>
          ))}
        {shownDrinksResults.length > 0
          && shownMealsResults.length === 0
          && shownDrinksResults.map(
            ({ idDrink, strDrink, strDrinkThumb }, index) => (
              <Link key={ idDrink } to={ `/drinks/${idDrink}` }>
                <S.RecipeCard
                  data-testid={ `${index}-recipe-card` }
                  role="button"
                  tabIndex={ 0 }
                  style={ {
                    display:
                      index < mainCounter && index >= mainCounter - 4
                        ? 'flex'
                        : 'none',
                  } }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strDrinkThumb }
                    alt={ strDrink }
                  />
                  <section id="titleContainer">
                    <span data-testid={ `${index}-card-name` } key={ index }>
                      {strDrink}
                    </span>
                  </section>
                </S.RecipeCard>
              </Link>
            ),
          )}

        {shownCatMeals.length > 0
          && shownCatDrinks.length === 0
          && shownCatMeals.map(({ strMealThumb, strMeal }, index) => (
            <S.RecipeCard data-testid={ `${index}-recipe-card` } key={ index }>
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ strMeal }
              />
              <section id="titleContainer">
                <span data-testid={ `${index}-card-name` } key={ index }>
                  {strMeal}
                </span>
              </section>
            </S.RecipeCard>
          ))}
        {shownCatDrinks.length > 0
          && shownCatMeals.length === 0
          && shownCatDrinks.map(({ strDrink, strDrinkThumb }, index) => (
            <S.RecipeCard data-testid={ `${index}-recipe-card` } key={ index }>
              <img
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt={ strDrink }
              />
              <section id="titleContainer">
                <span data-testid={ `${index}-card-name` } key={ index }>
                  {strDrink}
                </span>
              </section>
            </S.RecipeCard>
          ))}
      </div>
      <div>
        <button
          onClick={ () => handlePreviousRecipes() }
          className="material-icons"
        >
          navigate_before
        </button>
        <button
          onClick={
            () => handleNextRecipes()
          }
          className="material-icons"
        >
          navigate_next
        </button>
      </div>
    </section>
  );
}

export default Recipes;
