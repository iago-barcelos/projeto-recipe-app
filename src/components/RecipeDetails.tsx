import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRecipeDetails from '../hooks/useRecipeDetails';
import unFav from '../images/blackHeartIcon.svg';
import faShare from '../images/shareIcon.svg';
import {
  MealRecipeDetailsType,
  DrinksRecipeDetailsType,
  FormatedRecipe,
  DoneRecipeType,
  InProgressType,
} from '../types';
import { formatDrinkRecipe, formatMealRecipe, getLocalStorage } from '../utils/functions';
import useFetch from '../hooks/useFetch';

function RecipeDetail() {
  const { id } = useParams();
  const mealOrDrink = window.location.pathname.includes('meals');
  const currentURL = window.location.pathname;
  const currentURLhref = window.location.href;
  const [message, setMessage] = useState('');

  // recebe os dados da Api via recipeDetail e depois trata, usando as funções formatMealRecipe e formatDrinkRecipe no useEffect

  const { mealRecipeDetail, drinkRecipeDetail } = useRecipeDetails(id as string);
  const [formatedRecipe, setFormatedRecipe] = useState<FormatedRecipe>([]);

  useEffect(() => {
    if (mealOrDrink && mealRecipeDetail) {
      const recipe = formatMealRecipe(mealRecipeDetail as MealRecipeDetailsType);
      setFormatedRecipe(recipe);
    } else if (!mealOrDrink && drinkRecipeDetail) {
      const recipe = formatDrinkRecipe(drinkRecipeDetail as DrinksRecipeDetailsType);
      setFormatedRecipe(recipe);
    }
  }, [mealRecipeDetail, drinkRecipeDetail, mealOrDrink]);

  // faz fetch na API para pegar as bebidas e comidas recomendadas e depois lista as 6 primeiras para o carrossel

  const { recommendedDrinks, recommendedMeals } = useFetch('api/json/v1/1/search.php?s=');
  const drinksCarousel = recommendedDrinks.slice(0, 6);
  const mealsCarousel = recommendedMeals.slice(0, 6);

  // cria estado de contagem para o indice do carrossel
  const [counter, setCounter] = useState(0);

  const handleNextCount = () => {
    setCounter((count) => (count < 4 ? count + 2 : count - 4));
  };

  const handlePreviousCount = () => {
    setCounter((count) => (count > 0 ? count - 2 : count + 4));
  };

  // verifica no localStorage se a receita já foi feita. Caso tenha sido, o botão 'Start Recipe" não deve estar visivel
  // verifica se a receita está em progresso no localStorage, se estiver, muda o texto para "Continue Recipe"
  const doneRecipe = getLocalStorage('doneRecipes') as DoneRecipeType;
  const thisRecipeIsDone = doneRecipe?.some((recipe) => recipe.id === id);

  const recipesInProgress = getLocalStorage('inProgress') as InProgressType;
  const isMealInProgress = recipesInProgress?.meals?.idMeal === id;
  const isDrinkInProgress = recipesInProgress?.drinks?.idDrink === id;

  console.log(isMealInProgress);

  const handleShare = async () => {
    console.log(currentURLhref);
    await navigator.clipboard.writeText(currentURLhref);
    setMessage('Link copied!');
  };

  return (
    <>
      <h1>Recipe Detail</h1>
      <h2>
        ID da receita
        {' '}
        {id as string}
      </h2>
      {formatedRecipe?.map((recipe) => (
        <div key={ recipe.id }>
          <h1 data-testid="recipe-title">{recipe.name}</h1>
          <h3 data-testid="recipe-category">{recipe.category}</h3>
          {recipe.alcoholic && (
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
          <button>
            <img
              src={ unFav }
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
      <Link to={ `${currentURL}/in-progress` }>
        <button
          style={ {
            position: 'fixed',
            bottom: '0px',
            display: thisRecipeIsDone ? 'none' : 'block',
          } }
          data-testid="start-recipe-btn"
        >
          {isMealInProgress || isDrinkInProgress
            ? 'Continue Recipe'
            : 'Start Recipe'}
        </button>
      </Link>
      {message !== '' && <span>{message}</span>}
    </>
  );
}

export default RecipeDetail;
