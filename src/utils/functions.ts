import {
  CocktailType,
  MealType,
  UserInfoType,
  DrinksRecipeDetailsType,
  MealRecipeDetailsType,
  FormatedRecipe,
  InProgressType,
  RecipeData,
  FavoriteRecipesType,
} from '../types';

export const saveLocalStorage = (
  key: string,
  item:
  | UserInfoType
  | FavoriteRecipesType
  | InProgressType
  | RecipeData,
) => {
  const thisKeyExists = localStorage.getItem(key);
  if (thisKeyExists && thisKeyExists !== 'user') {
    const savedRecipesArray = JSON
      .parse(thisKeyExists as string);
    const thisRecipeExists = savedRecipesArray.some(
      (recipe: FavoriteRecipesType | InProgressType) => recipe
        .id === (item as FavoriteRecipesType | InProgressType).id,
    );
    if (thisRecipeExists) {
      return console.log('Essa receita existe no localStorage');
    }
    savedRecipesArray.push(item);
    return localStorage.setItem(key, JSON.stringify(savedRecipesArray));
  }
  const saveItens = localStorage.setItem(key, JSON.stringify([item]));
  return saveItens;
};

export const getLocalStorage = (key: string) => {
  const loadItens = JSON.parse(localStorage.getItem(key) as string);
  return loadItens;
};

export const getFetch = (endpoint: string, searchValue: string = '') => {
  const fetchResult = fetch((endpoint += searchValue))
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
  return fetchResult;
};

export const formatDrinkRecipe = (drinkRecipe: DrinksRecipeDetailsType) => {
  // acha os objetos que tem keys que incluem 'strIngredient'

  const drinkIngredientList = drinkRecipe?.drinks
    .map((recipe) => Object.entries(recipe)
      .filter((tupla) => tupla[0].includes('strIngredient')));

  // mapeia as tuplas filtrando por todas que são truthy na posição 1. No final mostra somente os valores que não incluirem 'str'.

  const formatedDrinkIngrList = drinkIngredientList
    ?.map((tupla) => tupla.filter((ingredientArr) => ingredientArr[1]))
    .join()
    .split(',')
    .filter((word) => !word.includes('str'));

  // o mesmo processo que o de cima, só que tratando os dados de measures

  const drinkMeasureList = drinkRecipe?.drinks
    .map((recipe) => Object.entries(recipe)
      .filter((tupla) => tupla[0].includes('strMeasure')));

  const formatedDrinkMeasureList = drinkMeasureList
    ?.map((tupla) => tupla.filter((measureArr) => measureArr[1]))
    .join()
    .split(',')
    .filter((word) => !word.includes('str'))
    .filter((word) => word !== ' ');

  // cria objeto para mostrar somente as informações necessarias

  const mapedDrinkRecipe = drinkRecipe?.drinks.map((details) => ({
    id: details.idDrink,
    name: details.strDrink,
    nacionality: '',
    alcoholic: details.strAlcoholic,
    img: details.strDrinkThumb,
    category: details.strCategory,
    instructions: details.strInstructions,
    ingredients: formatedDrinkIngrList,
    measure: formatedDrinkMeasureList,
  }));

  return mapedDrinkRecipe;
};

export const formatMealRecipe = (mealRecipe: MealRecipeDetailsType) => {
  // mesmo processo, só que executando para meals

  const mealIngredientList = mealRecipe?.meals
    .map((recipe) => Object.entries(recipe)
      .filter((tupla) => tupla[0].includes('strIngredient')));

  const formatedMealIngrList = mealIngredientList
    ?.map((tupla) => tupla.filter((ingredientArr) => ingredientArr[1]))
    .join()
    .split(',')
    .filter((word) => !word.includes('str'));

  const mealMeasureList = mealRecipe?.meals
    .map((recipe) => Object.entries(recipe)
      .filter((tupla) => tupla[0].includes('strMeasure')));

  const formatedMealMeasureList = mealMeasureList
    ?.map((tupla) => tupla.filter((measureArr) => measureArr[1]))
    .join()
    .split(',')
    .filter((word) => !word.includes('str'))
    .filter((word) => word !== ' ');

  const mapedMealRecipes = mealRecipe?.meals.map((details) => ({
    id: details.idMeal,
    name: details.strMeal,
    nacionality: details.strArea,
    alcoholic: '',
    img: details.strMealThumb,
    category: details.strCategory,
    instructions: details.strInstructions,
    ingredients: formatedMealIngrList,
    measure: formatedMealMeasureList,
    video: details.strYoutube,
  }));

  return mapedMealRecipes;
};

// converte formatedRecipe em favoriteRecipe

export const convertToFavorite = (recipes: FormatedRecipe, type: boolean) => {
  const favoriteRecipe = recipes.map((recipe) => (
    {
      id: recipe.id,
      type: type ? 'meal' : 'drink',
      nationality: recipe.nacionality || '',
      category: recipe.category,
      alcoholicOrNot: recipe.alcoholic || '',
      name: recipe.name,
      image: recipe.img,
    }
  ));
  return favoriteRecipe[0];
};
