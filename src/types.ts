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
