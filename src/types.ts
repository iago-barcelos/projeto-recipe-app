export type UserInfoType = {
  email: string,
  password?: string,
};

export type CocktailType = {
  drinks: [{
    idDrink: string,
    strDrink: string,
    strDrinkAlternate: null,
    strTags: string,
    strVideo: string,
  }]
};

export type MealType = {
  meals: [{
    idMeal: string,
    strMeal: string,
    strDrinkAlternate: null,
    strCategory: string,
    strArea: string,
  }]
};
