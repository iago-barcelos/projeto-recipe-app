import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchById } from '../utils/functions';
import { InProgressType } from '../types';

function RecipeInProgress() {
  const [recipeData, setRecipeData] = useState<InProgressType | null>(null);

  const { id } = useParams();

  const isMeal = window.location.pathname.includes('meals');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof id === 'string') {
          const API = isMeal ? 'meal' : 'cocktail';
          const response = await fetchById(API, id);

          const recipe = response ? response[`${API}s`][0] : null;

          setRecipeData({ [API]: recipe });
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
    return <p>Ocorreu um erro ao buscar os dados da receita.</p>;
  }

  const recipe = recipeData[isMeal ? 'meal' : 'cocktail'];

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe?.strMealThumb || recipe?.strDrinkThumb || '' }
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
          <li>
            lista
          </li>
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
