import { useParams } from 'react-router-dom';
import useRecipeDetails from '../hooks/useRecipeDetails';
import { MealRecipeDetailsType, DrinksRecipeDetailsType } from '../types';

function RecipeDetail() {
  const { id } = useParams();
  const checkID = id as string;
  const { recipeDetail } = useRecipeDetails(checkID);
  const checkMealRecipe = recipeDetail as MealRecipeDetailsType;
  const checkDrinkRecipe = recipeDetail as DrinksRecipeDetailsType;
  const drinkIngredientList = checkDrinkRecipe?.drinks
    .map((recipe) => Object.keys(recipe)
      .filter((keyName) => keyName.includes('strIngredient')));
  const drinkMeasureList = checkDrinkRecipe?.drinks
    .map((recipe) => Object.keys(recipe)
      .filter((keyName) => keyName.includes('strMeasure')));
  const mapedDrinkRecipe = checkDrinkRecipe?.drinks.map((details) => ({
    id: details.idDrink,
    name: details.strDrink,
    img: details.strDrinkThumb,
    category: details.strCategory,
    instructions: details.strInstructions,
    ingredients: drinkIngredientList,
    measure: drinkMeasureList,
  }));

  console.log(mapedDrinkRecipe);
  return (
    <>
      <h1>Recipe Detail</h1>
      <h2>
        ID da receita
        {' '}
        {id as string}
      </h2>
      {mapedDrinkRecipe?.map((detail) => (
        <>
          <h1>{detail.name}</h1>
          <h3>{detail.category}</h3>
          <img key={ detail.id } src={ detail.img } alt="" />
          <p>{detail.instructions}</p>
        </>
      ))}
    </>
  );
}

export default RecipeDetail;
