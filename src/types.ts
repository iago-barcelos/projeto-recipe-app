export type UserInfoType = {
  email: string,
  password?: string,
};

export type CocktailType = {
  idDrink: string,
  strDrink: string,
  strDrinkAlternate: null,
  strTags: string,
  strVideo: string,
  strDrinkThumb: string,
};

export type MealType = {
  idMeal: string,
  strMeal: string,
  strDrinkAlternate: null,
  strCategory: string,
  strArea: string,
  strMealThumb: string,
};

export type SearchResultsType = {
  meals: MealType[],
  drinks: CocktailType[]
};

export type FormDataType = {
  searchValue: string,
  searchType: string,
};

export type ByCategoriesType = {
  byCategories: []
};

export type DrinksCategories = {
  drinks: [],
};

export type RecipeData = {
  strMealThumb?: string;
  strDrinkThumb?: string;
  strCategory: string;
  strMeal?: string;
  strDrink?: string;
  strInstructions: string;
  strIngredients: string[];
};

export type InProgressType = {
  [key: string] : RecipeData;
};

// export type InProgressType = {
//   meal: {
//     strMealThumb: string,
//     strCategory: string,
//     strMeal: string,
//     strInstructions: string,
//     strIngredient1: string,
//     strIngredient2: string,
//     strIngredient3: string,
//     strIngredient4: string,
//     strIngredient5: string,
//     strIngredient6: string,
//     strIngredient7: string,
//     strIngredient8: string,
//     strIngredient9: string,
//     strIngredient10: string,
//     strIngredient11: string,
//     strIngredient12: string,
//     strIngredient13: string,
//     strIngredient14: string,
//     strIngredient15: string,
//     strIngredient16: string,
//     strIngredient17: string,
//     strIngredient18: string,
//     strIngredient19: string,
//     strIngredient20: string,
//   },
//   cocktail: {
//     strDrinkThumb: string,
//     strCategory: string,
//     strAlcoholic: string,
//     strDrink: string,
//     strInstructions: string,
//     strIngredient1: string,
//     strIngredient2: string,
//     strIngredient3: string,
//     strIngredient4: string,
//     strIngredient5: string,
//     strIngredient6: string,
//     strIngredient7: string,
//     strIngredient8: string,
//     strIngredient9: string,
//     strIngredient10: string,
//     strIngredient11: string,
//     strIngredient12: string,
//     strIngredient13: string,
//     strIngredient14: string,
//     strIngredient15: string,
//   },
// };
