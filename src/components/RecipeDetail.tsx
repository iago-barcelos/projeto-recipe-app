import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRecipeDetails from '../hooks/useRecipeDetails';
import {
  MealRecipeDetailsType,
  DrinksRecipeDetailsType,
  FormatedRecipe,
} from '../types';
import { formatDrinkRecipe, formatMealRecipe } from '../utils/functions';

function RecipeDetail() {
  const { id } = useParams();
  const mealOrDrink = window.location.pathname.includes('meals');

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
  console.log(formatedRecipe);
  return (
    <>
      <h1>Recipe Detail</h1>
      <h2>
        ID da receita
        {' '}
        {id as string}
      </h2>
      {formatedRecipe?.map((detail) => (
        <div key={ detail.id }>
          <h1 data-testid="recipe-title">{detail.name}</h1>
          <h3 data-testid="recipe-category">{detail.category}</h3>
          {detail.alcoholic && <h3>{detail.alcoholic}</h3>}
          <img
            data-testid="recipe-photo"
            key={ detail.id }
            src={ detail.img }
            alt=""
          />
          <p data-testid="instructions">{detail.instructions}</p>
          <section>
            <h4>Ingredients:</h4>
            <ol>
              {detail.ingredients.map((ingredient, i) => (
                <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                  {ingredient}
                </li>
              ))}
            </ol>
            <h4>Measures:</h4>
            <ol>
              {detail.measure.map((measure, i) => (
                <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                  {measure}
                </li>
              ))}
            </ol>

            {/* {detail.video && <video src={detail.video}></video>} */}
          </section>
        </div>
      ))}
    </>
  );
}

export default RecipeDetail;
