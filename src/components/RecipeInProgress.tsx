import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFetch, getLocalStorage } from '../utils/functions';
import { InProgressType } from '../types';

type ProgressStateType = {
  [key: string] : {
    [key: string]: boolean[];
  }
};

const RECIPE_TYPES = {
  meal: 'meal',
  cocktail: 'cocktail',
};

function RecipeInProgress() {
  const { id } = useParams();
  const isMeal = window.location.pathname.includes('meals');

  const [recipeData, setRecipeData] = useState<InProgressType | null>(null);
  const [checkBox, setCheckBox] = useState<(boolean | never)[]>(() => {
    const loadLocalStorage = localStorage.getItem('inProgressRecipes');
    if (loadLocalStorage !== null) {
      const parse: ProgressStateType = JSON.parse(loadLocalStorage);
      const check = parse[isMeal ? 'meals' : 'drinks'][id as string];
      return check;
    }
    return [];
  });
  const [inProgressRecipes, setInProgressRecipes,
  ] = useState<ProgressStateType>(getLocalStorage('inProgressRecipes'));

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof id === 'string') {
          const API = isMeal ? RECIPE_TYPES.meal : RECIPE_TYPES.cocktail;
          const endPoint = `https://www.the${API}db.com/api/json/v1/1/lookup.php?i=${id}`;
          const response = await getFetch(endPoint);

          const key = API === RECIPE_TYPES.meal ? 'meals' : 'drinks';
          const recipe = response ? response[key][0] : null;

          setRecipeData({ [key]: recipe });
        }
      } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
        setRecipeData({});
      }
    };
    fetchData();
  }, [id, isMeal]);

  // const handleLocal = () => {
  //   const loadLocalStorage = localStorage.getItem('inProgressRecipes');
  //   if (loadLocalStorage !== null) {
  //     const parse: ProgressStateType = JSON.parse(loadLocalStorage);
  //     const check = parse[isMeal ? 'meals' : 'drinks'][id as string];
  //     return check;
  //   }
  //   return [];
  // };

  // handleLocal();

  const handleCheckBoxChange = (index: number) => {
    const updatedCheckBox = [...checkBox];
    updatedCheckBox[index] = !updatedCheckBox[index];
    setCheckBox(updatedCheckBox);

    const recipeKey = isMeal ? 'meals' : 'drinks';
    const idString = id ? id.toString() : '';

    setInProgressRecipes((prevProgress) => {
      const newProgress = { ...prevProgress };
      newProgress[recipeKey] = {
        ...newProgress[recipeKey],
        [idString]: updatedCheckBox,
      };
      console.log(newProgress);
      return newProgress;
    });
  };

  if (!recipeData) {
    return <p>Carregando ...</p>;
  }

  if (recipeData.error) {
    return <p>Ocorreu um erro ao buscar os dados da receita</p>;
  }

  const recipe = recipeData[isMeal ? 'meals' : 'drinks'];
  const ingredientList = Object.entries(recipe)
    ?.filter(([ingredientKey, ingredientValue]) => (
      ingredientKey.includes('strIngredient')
      && ingredientValue !== ''
      && ingredientValue !== null
    ));

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe?.strMealThumb ? recipe?.strMealThumb : recipe?.strDrinkThumb }
        alt=""
      />

      <h1
        data-testid="recipe-title"
      >
        {recipe?.strMeal || recipe?.strDrink || ''}
      </h1>

      <p
        data-testid="recipe-category"
      >
        {recipe?.strCategory || ''}
      </p>

      <div>
        <ul>
          { ingredientList?.map(([ingredientKey, ingredientValue], index) => (
            <li key={ index }>
              <label
                data-testid={ `${index}-ingredient-step` }
                style={
                  {
                    textDecoration: checkBox[index]
                      ? 'line-through solid rgb(0, 0, 0)'
                      : 'none' }
                }
              >
                <input
                  type="checkbox"
                  checked={ checkBox[index] }
                  onChange={ () => handleCheckBoxChange(index) }
                />
                { ingredientValue }
              </label>
            </li>
          ))}
        </ul>

        <p data-testid="instructions">
          {recipe?.strInstructions || ''}
        </p>

        <button data-testid="finish-recipe-btn">Finalizar</button>
      </div>

      <button data-testid="share-btn">Compartilhar</button>

      <button data-testid="favorite-btn">Favoritar</button>
    </div>
  );
}

export default RecipeInProgress;
