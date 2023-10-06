import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import useRecipeDetails from '../hooks/useRecipeDetails';
import unFav from '../images/blackHeartIcon.svg';
import fav from '../images/whiteHeartIcon.svg';
import faShare from '../images/shareIcon.svg';
import {
  DoneRecipeType,
  FavoriteRecipesType,
  InProgressType,
} from '../types';
import {
  convertToFavorite,
  getLocalStorage,
  saveInProgressInLocalStorage,
  saveLocalStorage,
} from '../utils/functions';
import useFetch from '../hooks/useFetch';
import useCounter from '../hooks/useCounter';
import useFormatRecipes from '../hooks/useFormatRecipes';
import * as S from '../styles/recipeDetails';
import Footer from './Footer';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { counter, handleNextCount, handlePreviousCount } = useCounter();
  const mealOrDrink = window.location.pathname.includes('meals');
  const currentURL = window.location.pathname;
  const currentURLhref = window.location.href;
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

  const { mealRecipeDetail, drinkRecipeDetail } = useRecipeDetails(id as string);
  const { formatedRecipe } = useFormatRecipes(
    mealOrDrink,
    mealRecipeDetail,
    drinkRecipeDetail,
  );
  // faz fetch na API para pegar as bebidas e comidas recomendadas e depois lista as 6 primeiras para o carrossel
  const { recommendedDrinks, recommendedMeals } = useFetch('api/json/v1/1/search.php?s=');
  const drinksCarousel = recommendedDrinks && recommendedDrinks.slice(0, 6);
  const mealsCarousel = recommendedMeals && recommendedMeals.slice(0, 6);
  // verifica no localStorage se a receita já foi feita. Caso tenha sido, o botão 'Start Recipe" não deve estar visivel
  const doneRecipe: DoneRecipeType[] = getLocalStorage('doneRecipes');
  const thisRecipeIsDone = doneRecipe?.some((recipe) => recipe.id === id);

  // converte a receita formatada para favoriteRecipesType, cria função que salva no localStorage e leva para /in-progress
  const favoriteRecipe: FavoriteRecipesType = convertToFavorite(
    formatedRecipe,
    mealOrDrink,
  );

  const checkLocalInProgress = () => {
    const recipesInProgress = getLocalStorage('inProgressRecipes') as InProgressType;
    if (recipesInProgress) {
      const { meals, drinks } = recipesInProgress;
      if (meals) {
        const mealId = Object.keys(meals)[0] ? Object.keys(meals)[0] : '';
        return mealId === id;
      }
      if (drinks) {
        const drinkId = Object.keys(drinks)[0] ? Object.keys(drinks)[0] : '';
        return drinkId === id;
      }
      return false;
    }
    return false;
  };
  const isInProgress = checkLocalInProgress();

  // salva a receita com a função saveInProgressInLocalStorage quando clicar no botão 'Start Recipe' e envia o usuário para a pagina /in-progress
  const handleInProgress = () => {
    if (!isInProgress) {
      const type = mealOrDrink ? 'meals' : 'drinks';
      saveInProgressInLocalStorage(type, id as string);
      navigate(`${currentURL}/in-progress`);
    }
    navigate(`${currentURL}/in-progress`);
  };

  // verifica se a receita já está favoritada. Se não estiver, o botão fica com coração branco, se estiver, o coração fica preto
  const handleFavorite = () => {
    saveLocalStorage('favoriteRecipes', favoriteRecipe);
    setIsFavorite((prev: boolean) => !prev);
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(currentURLhref);
    setMessage('Link copied!');
    setTimeout(() => {
      setMessage('');
    }, 1500);
  };
  return (
    <S.RecipeDetailsMain>
      {formatedRecipe?.map((recipe) => (
        <S.RecipeDetailContent key={ recipe.id }>
          <h1 data-testid="recipe-title">{recipe.name}</h1>
          <h3 data-testid="recipe-category">{recipe.category}</h3>
          {recipe.alcoholic !== '' && (
            <h3 data-testid="recipe-category">{recipe.alcoholic}</h3>
          )}
          <img
            id="recipePhoto"
            data-testid="recipe-photo"
            key={ recipe.id }
            src={ recipe.img }
            alt=""
          />
          <div id="btnContainer">
            <button onClick={ () => handleShare() }>
              <img
                src={ faShare }
                alt="Share"
                data-testid="share-btn"
              />
              <p>{message}</p>
            </button>
            <button onClick={ handleFavorite }>
              <img
                src={ isFavorite ? unFav : fav }
                alt="Favorite"
                data-testid="favorite-btn"
              />
            </button>
          </div>
          <S.IngredientsAndMeasures>
            <div id="ingredients">
              <h4>Ingredients:</h4>
              <ol>
                {recipe?.ingredients?.map((ingredient, i) => (
                  <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                    {ingredient}
                  </li>
                ))}
              </ol>
            </div>
            <div id="measures">
              <h4>Measures:</h4>
              <ol>
                {recipe?.measure?.map((measure, i) => (
                  <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                    {measure}
                  </li>
                ))}
              </ol>
            </div>
          </S.IngredientsAndMeasures>
          <div id="preparation">
            <h3>Preparation:</h3>
            <li data-testid="instructions">{recipe.instructions}</li>
          </div>
          {recipe.video && (
            <div>
              <h3>Tutorial:</h3>
              <iframe
                width="560"
                height="315"
                src={ recipe.video.replace('watch?v=', 'embed/') }
                data-testid="video"
                title="YouTube video player"
                frameBorder="0"
              />
            </div>
          )}
        </S.RecipeDetailContent>
      ))}
      {mealOrDrink && (
        <S.RecommendedContent>
          <h3>Recommended:</h3>
          <div id="cardsContainer">
            <button className="material-icons" onClick={ handlePreviousCount }>
              navigate_before
            </button>
            {drinksCarousel?.map((drink, i) => (
              <Link key={ i } to={ `/drinks/${drink.idDrink}` }>
                <S.RecommendedCard
                  data-testid={ `${i}-recommendation-card` }
                  style={ {
                    display:
                    i === counter || i === counter + 1 ? 'flex' : 'none',
                  } }
                >
                  <img src={ drink?.strDrinkThumb } alt={ drink?.strDrink } />
                  <h3 data-testid={ `${i}-recommendation-title` }>
                    {drink?.strDrink}
                  </h3>
                </S.RecommendedCard>
              </Link>
            ))}
            <button className="material-icons" onClick={ handleNextCount }>
              navigate_next
            </button>
          </div>
        </S.RecommendedContent>
      )}
      {!mealOrDrink && (
        <S.RecommendedContent>
          <h3>Recommended:</h3>
          <div id="cardsContainer">
            <button className="material-icons" onClick={ handlePreviousCount }>
              navigate_before
            </button>
            {mealsCarousel?.map((meal, i) => (
              <Link key={ i } to={ `/meals/${meal.idMeal}` }>
                <S.RecommendedCard
                  data-testid={ `${i}-recommendation-card` }
                  style={ {
                    display:
                  i === counter || i === counter + 1 ? 'flex' : 'none',
                  } }
                >
                  <img src={ meal?.strMealThumb } alt={ meal?.strMeal } />
                  <h3 data-testid={ `${i}-recommendation-title` }>{meal?.strMeal}</h3>
                </S.RecommendedCard>
              </Link>
            ))}
            <button className="material-icons" onClick={ handleNextCount }>
              navigate_next
            </button>
          </div>
        </S.RecommendedContent>
      )}
      <S.Button
        style={ {
          position: 'fixed',
          bottom: '10px',
          display: thisRecipeIsDone ? 'none' : 'block',
        } }
        data-testid="start-recipe-btn"
        onClick={ handleInProgress }
      >
        {isInProgress ? 'Continue Recipe' : 'StartRecipe'}
      </S.Button>
      {message !== '' && <span>{message}</span>}
      <Footer />
    </S.RecipeDetailsMain>
  );
}

export default RecipeDetail;
