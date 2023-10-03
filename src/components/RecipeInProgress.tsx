import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFetch, saveDoneRecipesLocalStorage } from '../utils/functions';
import { InProgressType, InProgressTypeTwo } from '../types';

const RECIPE_TYPES = {
  meal: 'meal',
  cocktail: 'cocktail',
};

function RecipeInProgress() {
  const { id } = useParams();
  const isMeal = window.location.pathname.includes('meals');
  const currentURLhref = window.location.href;

  const [message, setMessage] = useState('Compartilhar');
  const [recipeData, setRecipeData] = useState<InProgressType | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    const isInLocal = localStorage.getItem('inProgressRecipes');
    if (isInLocal) {
      const loadLocal = JSON.parse(isInLocal);
      setIngredients(loadLocal[isMeal ? 'meals' : 'drinks'][id as string]);
    } else {
      const initialInProgress = {
        [isMeal ? 'meals' : 'drinks']: {
          [id as string]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(initialInProgress));
    }
  }, []);

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

  const manipulateInProgress = (checkIngredient: string) => {
    const isInLocal = localStorage.getItem('inProgressRecipes');
    const load: InProgressTypeTwo = JSON.parse(isInLocal as string);
    if (ingredients.includes(checkIngredient)) {
      const filteredItens = ingredients
        .filter((ingredient) => ingredient !== checkIngredient);
      setIngredients(filteredItens);
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...load,
        [isMeal ? 'meals' : 'drinks']: {
          [id as string]: filteredItens,
        },
      }));
    } else {
      setIngredients([...ingredients, checkIngredient]);
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...load,
        [isMeal ? 'meals' : 'drinks']: {
          [id as string]: [...ingredients, checkIngredient],
        },
      }));
    }
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

  const handleShare = async () => {
    await navigator.clipboard.writeText(currentURLhref);
    setMessage('Link copied!');
    setTimeout(() => {
      setMessage('Compartilhar');
    }, 1500);
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={
          recipe?.strMealThumb ? recipe?.strMealThumb : recipe?.strDrinkThumb
        }
        alt=""
      />

      <h1 data-testid="recipe-title">
        {recipe?.strMeal || recipe?.strDrink || ''}
      </h1>

      <p data-testid="recipe-category">{recipe?.strCategory || ''}</p>

      <div>
        <ul>
          {ingredientList?.map(([ingredientKey, ingredientValue], index) => (
            <li key={ index }>
              <label
                data-testid={ `${index}-ingredient-step` }
                style={ {
                  textDecoration: ingredients.includes(
                    ingredientValue as string,
                  )
                    ? 'line-through solid rgb(0, 0, 0)'
                    : 'none',
                } }
              >
                <input
                  type="checkbox"
                  checked={ ingredients.includes(ingredientValue as string) }
                  onChange={ () => manipulateInProgress(ingredientValue as string) }
                />
                {ingredientValue}
              </label>
            </li>
          ))}
        </ul>

        <p data-testid="instructions">{recipe?.strInstructions || ''}</p>

        <button
          data-testid="finish-recipe-btn"

        >
          Finalizar
        </button>
      </div>

      <button data-testid="share-btn" onClick={ handleShare }>
        {message}
      </button>

      <button data-testid="favorite-btn">Favoritar</button>
    </div>
  );
}

export default RecipeInProgress;
