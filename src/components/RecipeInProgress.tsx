import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { convertToFavorite, getFetch, saveLocalStorage } from '../utils/functions';
import { DrinksRecipeDetailsType, MealRecipeDetailsType } from '../types';
import useFormatRecipes from '../hooks/useFormatRecipes';

function RecipeInProgress() {
  const [mealRecipeData, setMealRecipeData] = useState<MealRecipeDetailsType>();
  const [drinkRecipeData, setDrinkRecipeData] = useState<DrinksRecipeDetailsType>();
  const [checkBox, setCheckBox] = useState<(boolean | never)[]>([]);

  const { id } = useParams();

  const isMeal = window.location.pathname.includes('meals');
  const { formatedRecipe } = useFormatRecipes(isMeal, mealRecipeData, drinkRecipeData);

  useEffect(() => {
    const fetchData = async () => {
      const API = isMeal ? 'meal' : 'cocktail';
      const URL = `https://www.the${API}db.com/api/json/v1/1/lookup.php?i=`;
      if (isMeal) {
        const result = await getFetch(URL, id);
        setMealRecipeData(result);
      } else {
        const result = await getFetch(URL, id);
        setDrinkRecipeData(result);
      }
    };
    fetchData();
  }, [id, isMeal]);

  const favoriteRecipe = convertToFavorite(formatedRecipe, isMeal);

  const handleCheckBoxChange = (index: number) => {
    const clickCheckBox = [...checkBox];
    clickCheckBox[index] = !clickCheckBox[index];
    setCheckBox(clickCheckBox);
  };

  return (
    <>
      {formatedRecipe.map((recipe, i) => (
        <div key={ i }>
          <img
            data-testid="recipe-photo"
            src={ recipe.img }
            alt=""
          />

          <h1 data-testid="recipe-title">
            {recipe.name}
          </h1>

          <p data-testid="recipe-category">{recipe?.category || ''}</p>

          <div>
            <ul>
              {recipe.ingredients.map((ingredientValue, index) => (
                <li key={ index }>
                  <label
                    data-testid={ `${index}-ingredient-step` }
                    style={ {
                      textDecoration: checkBox[index]
                        ? 'line-through solid rgb(0, 0, 0)'
                        : 'none',
                    } }
                  >
                    <input
                      type="checkbox"
                      checked={ checkBox[index] }
                      onChange={ () => handleCheckBoxChange(index) }
                    />
                    {ingredientValue}
                  </label>
                </li>
              ))}
            </ul>

            <p data-testid="instructions">{recipe.instructions || ''}</p>

            <button data-testid="finish-recipe-btn">Finalizar</button>
          </div>

          <button data-testid="share-btn">Compartilhar</button>

          <button
            data-testid="favorite-btn"
            onClick={ () => saveLocalStorage('favoriteRecipes', favoriteRecipe) }
          >
            Favoritar
          </button>
        </div>
      ))}

    </>
  );
}

export default RecipeInProgress;
