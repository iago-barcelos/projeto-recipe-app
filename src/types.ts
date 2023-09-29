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

export type DrinksTypes = {
  drinks: [],
};

export type MealsType = {
  meals: [],
};

export type MealRecipeDetailsType = {
  meals: [
    {
      dateModified:null,
      idMeal:string,
      strArea: string
      strCategory:string
      strCreativeCommonsConfirmed: null
      strDrinkAlternate: null
      strImageSource: null
      strIngredient1: string
      strIngredient2: string
      strIngredient3: string
      strIngredient4: string
      strIngredient5: string
      strIngredient6: string
      strIngredient7: string
      strIngredient8: string
      strIngredient9: string
      strIngredient10: string
      strIngredient11: string
      strIngredient12: string
      strIngredient13: string
      strIngredient14: string
      strIngredient15: string
      strIngredient16: string
      strIngredient17: string
      strIngredient18: string
      strIngredient19: string
      strIngredient20: string
      strInstructions: string
      strMeal: string
      strMealThumb: string
      strMeasure1: string
      strMeasure2: string
      strMeasure3: string
      strMeasure4: string
      strMeasure5: string
      strMeasure6: string
      strMeasure7: string
      strMeasure8: string
      strMeasure9: string
      strMeasure10: string
      strMeasure11: string
      strMeasure12: string
      strMeasure13: string
      strMeasure14: string
      strMeasure15: string
      strMeasure16: string
      strMeasure17: string
      strMeasure18: string
      strMeasure19: string
      strMeasure20: string
      strSource: string
      strTags: string
      strYoutube: string
    },
  ]
};

export type FormatedRecipe = {
  id: string;
  name: string;
  alcoholic?: string;
  img: string;
  category: string;
  instructions: string;
  ingredients: string[];
  measure: string[];
  video?: string;
}[];

export type RecipeData = {
  idDrink?: string,
  idMeal?: string,
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

export type DoneRecipeType = [
  {
    id: string,
    type: string,
    nationality: string,
    category: string,
    alcoholicOrNot: string,
    name: string,
    image: string,
    doneDate: string,
    tags: string[],
  },
];
