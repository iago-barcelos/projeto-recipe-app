import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import unFav from '../images/whiteHeartIcon.svg';
import fav from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import {
  convertToDoneRecipe,
  convertToFavorite,
  formatDrinkRecipe,
  formatMealRecipe,
  getFetch,
  saveDoneRecipesLocalStorage,
  saveLocalStorage,
} from '../utils/functions';
import {
  DrinksRecipeDetailsType,
  FavoriteRecipesType,
  FormatedRecipe,
  InProgressTypeTwo,
  MealRecipeDetailsType,
} from '../types';
import * as S from '../styles/inProgress';
import Footer from './Footer';

const RECIPE_TYPES = {
  meal: 'meal',
  cocktail: 'cocktail',
};

function RecipeInProgress() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMeal = window.location.pathname.includes('meals');
  const currentURLhref = window.location.href;
  const formatedURL = currentURLhref.replace(/\/in-progress/i, '');

  const [message, setMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(() => {
    const checkLocalStorage = localStorage.getItem('favoriteRecipes');
    if (checkLocalStorage) {
      const recipes = JSON.parse(checkLocalStorage);
      const favorite = recipes.some((recipe: FavoriteRecipesType) => recipe.id === id);
      return favorite;
    }
    return false;
  });
  const [recipeData, setRecipeData] = useState<FormatedRecipe>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [allBoxesChecked, setAllBoxesChecked] = useState(false);
  const favoriteRecipe = convertToFavorite(recipeData, isMeal);
  const doneRecipe = convertToDoneRecipe(isMeal, recipeData);

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
          if (isMeal) {
            const formatedRecipe: FormatedRecipe = formatMealRecipe(
              response as MealRecipeDetailsType,
            );
            setRecipeData(formatedRecipe);
          }
          const formatedRecipe: FormatedRecipe = formatDrinkRecipe(
            response as DrinksRecipeDetailsType,
          );
          setRecipeData(formatedRecipe);
        }
      } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
      }
    };
    fetchData();

    const checkAllCheckBoxes = () => {
      const allChecked = recipeData[0]?.ingredients?.every((ingredientValue) => {
        return ingredients.includes(ingredientValue);
      });
      setAllBoxesChecked(allChecked);
    };
    checkAllCheckBoxes();
  }, [id, isMeal, ingredients, recipeData]);

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

  const handleShare = async () => {
    await navigator.clipboard.writeText(formatedURL);
    setMessage('Link copied!');
    setTimeout(() => {
      setMessage('');
    }, 1500);
  };

  const handleFavorite = () => {
    saveLocalStorage('favoriteRecipes', favoriteRecipe);
    setIsFavorite((prev: boolean) => !prev);
  };

  const handleEndRecipe = () => {
    saveDoneRecipesLocalStorage(doneRecipe);
    navigate('/done-recipes');
  };

  return (
    <S.InProgressMain>
      <h1>In Progress...</h1>
      <img
        id="recipePhoto"
        data-testid="recipe-photo"
        src={
          recipeData[0]?.img
        }
        alt=""
      />
      <S.BtnContainer>
        <button id="shareBtn" data-testid="share-btn" onClick={ handleShare }>
          <img src={ shareIcon } alt="Share icon" />
          {message}
        </button>

        <button
          id="favorite"
          onClick={ handleFavorite }
        >
          <img
            src={ !isFavorite ? unFav : fav }
            alt="Favorite"
            data-testid="favorite-btn"
          />
        </button>

      </S.BtnContainer>

      <h1 data-testid="recipe-title">
        {recipeData[0]?.name}
      </h1>

      <p data-testid="recipe-category">{recipeData[0]?.category}</p>

      <div>
        <ul>
          {recipeData[0]?.ingredients?.map((ingredientValue, index) => (
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

        <div id="preparation">
          <h3>Preparation:</h3>
          <li data-testid="instructions">{recipeData[0]?.instructions}</li>
        </div>
        <div id="finishRecipeBtn">
          <S.Button
            data-testid="finish-recipe-btn"
            onClick={ handleEndRecipe }
            disabled={ !allBoxesChecked }
          >
            Finish Recipe
          </S.Button>
        </div>
      </div>
      <Footer />
    </S.InProgressMain>
  );
}

export default RecipeInProgress;
