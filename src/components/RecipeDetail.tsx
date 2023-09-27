import { useParams } from 'react-router-dom';
import useRecipeDetails from '../hooks/useRecipeDetails';
import { MealRecipeDetailsType, DrinksRecipeDetailsType } from '../types';

function RecipeDetail() {
  const { id } = useParams();
  const checkID = id as string;
  const { recipeDetail } = useRecipeDetails(checkID);
  const checkMealRecipe = recipeDetail as MealRecipeDetailsType;
  const checkDrinkRecipe = recipeDetail as DrinksRecipeDetailsType;
  const mapedDrinkRecipe = checkDrinkRecipe?.drinks.map((details) => ({
    name: details.strDrink,
    img: details.strDrinkThumb,
    category: details.strCategory,
    instructions: details.strInstructions,
    ingredients: '',
  }));

  return (
    <>
      <h1>Recipe Detail</h1>
      <h2>
        ID da receita
        {' '}
        {id as string}
      </h2>
    </>
  );
}

export default RecipeDetail;
