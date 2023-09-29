import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchById } from '../utils/functions';
import { InProgressType } from '../types';

function RecipeInProgress() {
  const [recipeData, setRecipeData] = useState<InProgressType | null>(null);
  const [checkBox, setCheckBox] = useState<(boolean | never)[]>([]);

  const { id } = useParams();

  const isMeal = window.location.pathname.includes('meals');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof id === 'string') {
          const API = isMeal ? 'meal' : 'cocktail';
          const response = await fetchById(API, id);

          const key = API === 'meal' ? 'meals' : 'drinks';
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

  if (!recipeData) {
    return <p>Carregando ...</p>;
  }

  if (recipeData.error) {
    return <p>Ocorreu um erro ao buscar os dados da receita</p>;
  }

  const recipe = recipeData[isMeal ? 'meals' : 'drinks'];

  const ingredientList = Object.entries(recipe)
    .filter((tupla) => (tupla[0]
      .includes('strIngredient')) && (tupla[1] !== '' && tupla[1] !== null));

  const handleCheckBoxChange = (index: number) => {
    const clickCheckBox = [...checkBox];
    clickCheckBox[index] = !clickCheckBox[index];
    setCheckBox(clickCheckBox);
  };

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
          {ingredientList.map(([ingredientKey, ingredientValue], index) => (
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
