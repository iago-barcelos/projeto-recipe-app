import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRecipeDetails from '../hooks/useRecipeDetails';
import unFav from '../images/blackHeartIcon.svg';
import fav from '../images/whiteHeartIcon.svg';
import faShare from '../images/shareIcon.svg';
import {
  DoneRecipeType,
  FormatedRecipe,
  FavoriteRecipesType,
} from '../types';
import { convertToFavorite, getLocalStorage, saveLocalStorage } from '../utils/functions';
import useFetch from '../hooks/useFetch';
import useCounter from '../hooks/useCounter';
import useFormatRecipes from '../hooks/useFormatRecipes';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { counter, handleNextCount, handlePreviousCount } = useCounter();
  const mealOrDrink = window.location.pathname.includes('meals');
  const currentURL = window.location.pathname;
  const currentURLhref = window.location.href;
  const [message, setMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  // recebe os dados da Api via useRecipeDetails e depois trata, usando useFormatRecipes

  const { mealRecipeDetail, drinkRecipeDetail } = useRecipeDetails(id as string);
  const { formatedRecipe } = useFormatRecipes(
    mealOrDrink,
    mealRecipeDetail,
    drinkRecipeDetail,
  );

  // faz fetch na API para pegar as bebidas e comidas recomendadas e depois lista as 6 primeiras para o carrossel

  const { recommendedDrinks, recommendedMeals } = useFetch('api/json/v1/1/search.php?s=');
  const drinksCarousel = recommendedDrinks.slice(0, 6);
  const mealsCarousel = recommendedMeals.slice(0, 6);

  // verifica no localStorage se a receita já foi feita. Caso tenha sido, o botão 'Start Recipe" não deve estar visivel

  const doneRecipe = getLocalStorage('doneRecipes') as DoneRecipeType;
  const thisRecipeIsDone = doneRecipe?.some((recipe) => recipe.id === id);

  // salva a receita no localStorage usando a chave 'inProgress' quando clicar no botão 'Start Recipe' e envia o usuário para a pagina /in-progress
  const handleInProgress = () => {
    saveLocalStorage('inProgress', favoriteRecipe);
    navigate(`${currentURL}/in-progress`);
  };

  // converte a receita formatada para favoriteRecipesType, cria função que salva no localStorage e leva para /in-progress

  const favoriteRecipe: FavoriteRecipesType[] = convertToFavorite(
    formatedRecipe,
    mealOrDrink,
  );

  // verifica se a receita está em progresso no localStorage, se estiver, muda o texto do botão para "Continue Recipe"

  const recipesInProgress = getLocalStorage('inProgress') as FormatedRecipe;
  const isRecipeInProgress = recipesInProgress?.some((recipe) => recipe.id === id);

  // verifica se a receita já está favoritada. Se não estiver, o botão fica com coração branco, se estiver, o coração fica preto

  const handleFavorite = () => {
    const searchFavorite: FavoriteRecipesType[] = getLocalStorage('favoriteRecipes');
    if (isFavorite) {
      const newFavorite = searchFavorite.filter((recipe) => recipe.id !== id);
      saveLocalStorage('favoriteRecipes', newFavorite);
      setIsFavorite(false);
    }
    saveLocalStorage('favoriteRecipes', favoriteRecipe);
    setIsFavorite(true);
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(currentURLhref);
    setMessage('Link copied!');
  };

  return (
    <>
      <h1>Recipe Detail</h1>

      {formatedRecipe?.map((recipe) => (
        <div key={ recipe.id }>
          <h1 data-testid="recipe-title">{recipe.name}</h1>
          <h3 data-testid="recipe-category">{recipe.category}</h3>
          {recipe.alcoholic !== '' && (
            <h3 data-testid="recipe-category">{recipe.alcoholic}</h3>
          )}
          {/* Compartilhar */}
          <button onClick={ () => handleShare() }>
            <img
              src={ faShare }
              alt="Share"
              data-testid="share-btn"
            />
          </button>

          {/* Favoritar */}
          <button onClick={ handleFavorite }>
            <img
              src={ isFavorite ? unFav : fav }
              alt="Favorite"
              data-testid="favorite-btn"
            />
          </button>
          <img
            data-testid="recipe-photo"
            key={ recipe.id }
            src={ recipe.img }
            alt=""
          />
          <p data-testid="instructions">{recipe.instructions}</p>
          <section>
            <h4>Ingredients:</h4>
            <ol>
              {recipe.ingredients.map((ingredient, i) => (
                <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                  {ingredient}
                </li>
              ))}
            </ol>
            <h4>Measures:</h4>
            <ol>
              {recipe.measure.map((measure, i) => (
                <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                  {measure}
                </li>
              ))}
            </ol>

            {recipe.video && (
              <iframe
                width="560"
                height="315"
                src={ recipe.video.replace('watch?v=', 'embed/') }
                data-testid="video"
                title="YouTube video player"
                frameBorder="0"
              />
            )}
          </section>
        </div>
      ))}
      {mealOrDrink && (
        <section>
          <button onClick={ handlePreviousCount }>Previous</button>
          <button onClick={ handleNextCount }>Next</button>
          {drinksCarousel.map((drink, i) => (
            <div
              key={ i }
              data-testid={ `${i}-recommendation-card` }
              style={ {
                display:
                  i === counter || i === counter + 1 ? 'inline-block' : 'none',
              } }
            >
              <img src={ drink?.strDrinkThumb } alt={ drink?.strDrink } />
              <h3 data-testid={ `${i}-recommendation-title` }>
                {drink?.strDrink}
              </h3>
            </div>
          ))}
        </section>
      )}
      {!mealOrDrink && (
        <section>
          <button onClick={ handlePreviousCount }>Previous</button>
          <button onClick={ handleNextCount }>Next</button>
          {mealsCarousel.map((meal, i) => (
            <div
              key={ i }
              data-testid={ `${i}-recommendation-card` }
              style={ {
                display:
                  i === counter || i === counter + 1 ? 'inline-block' : 'none',
              } }
            >
              <img src={ meal?.strMealThumb } alt={ meal?.strMeal } />
              <h3 data-testid={ `${i}-recommendation-title` }>{meal?.strMeal}</h3>
            </div>
          ))}
        </section>
      )}
      <button
        style={ {
          position: 'fixed',
          bottom: '0px',
          display: thisRecipeIsDone ? 'none' : 'block',
        } }
        data-testid="start-recipe-btn"
        onClick={ handleInProgress }
      >
        {isRecipeInProgress
          ? 'Continue Recipe'
          : 'Start Recipe'}
      </button>
      {message !== '' && <span>{message}</span>}
    </>
  );
}

export default RecipeDetail;
