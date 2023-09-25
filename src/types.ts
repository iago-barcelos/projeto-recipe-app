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
