import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRecipeDetails from '../hooks/useRecipeDetails';
import {
  MealRecipeDetailsType,
  DrinksRecipeDetailsType,
  FormatedRecipe,
} from '../types';
import { formatDrinkRecipe, formatMealRecipe } from '../utils/functions';
import useFetch from '../hooks/useFetch';

function RecipeDetail() {
  const { id } = useParams();
  const mealOrDrink = window.location.pathname.includes('meals');
  const { recommendedDrinks, recommendedMeals } = useFetch('api/json/v1/1/search.php?s=');
  const drinksCarousel = recommendedDrinks.slice(0, 6);
  const mealsCarousel = recommendedMeals.slice(0, 6);

  // recebe os dados da Api via recipeDetail e depois trata, usando as funções formatMealRecipe e formatDrinkRecipe no useEffect
  const { mealRecipeDetail, drinkRecipeDetail } = useRecipeDetails(id as string);
  const [formatedRecipe, setFormatedRecipe] = useState<FormatedRecipe>([]);

  useEffect(() => {
    if (mealOrDrink) {
      const recipe = formatMealRecipe(mealRecipeDetail as MealRecipeDetailsType);
      setFormatedRecipe(recipe);
    } else {
      const recipe = formatDrinkRecipe(drinkRecipeDetail as DrinksRecipeDetailsType);
      setFormatedRecipe(recipe);
    }
  }, [mealRecipeDetail, drinkRecipeDetail, mealOrDrink]);

  return (
    <>
      <h1>Recipe Detail</h1>
      <h2>
        ID da receita
        {' '}
        {id as string}
      </h2>
      {formatedRecipe?.map((recipe) => (
        <div key={ recipe.id }>
          <h1 data-testid="recipe-title">{recipe.name}</h1>
          <h3 data-testid="recipe-category">{recipe.category}</h3>
          {recipe.alcoholic && <h3 data-testid="recipe-category">{recipe.alcoholic}</h3>}
          <img
            data-testid="recipe-photo"
            key={ recipe.id }
            src={ recipe.img }
            alt=""
          />
          <p data-testid="instructions">{recipe.instructions}</p>
          <section>
            <h4>Ingredients:</h4>
            <ol>
              {recipe.ingredients.map((ingredient, i) => (
                <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                  {ingredient}
                </li>
              ))}
            </ol>
            <h4>Measures:</h4>
            <ol>
              {recipe.measure.map((measure, i) => (
                <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                  {measure}
                </li>
              ))}
            </ol>

            {recipe.video && (
              <iframe
                width="560"
                height="315"
                src={ recipe.video.replace('watch?v=', 'embed/') }
                data-testid="video"
                title="YouTube video player"
                frameBorder="0"
              />
            )}
          </section>
        </div>
      ))}
    </>
  );
}

export default RecipeDetail;
