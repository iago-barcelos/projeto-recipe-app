import React, { useState } from 'react';
import Header from '../components/Header';
import unFav from '../images/blackHeartIcon.svg';
import faShare from '../images/shareIcon.svg';
import { getLocalStorage, saveLocalStorage } from '../utils/functions';
import { FavoriteRecipesType } from '../types';

function FavoriteRecipes() {
  const INITIAL_FAVORITE_RECIPES = getLocalStorage('favoriteRecipes') || [];
  const [message, setMessage] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipesType[]>(
    INITIAL_FAVORITE_RECIPES,
  );
  const [shownRecipes, setShownRecipes] = useState<FavoriteRecipesType[]>(
    INITIAL_FAVORITE_RECIPES,
  );

  const handleShare = async (type: string, id: string) => {
    const copyText = `http://localhost:3000/${type}s/${id}`;
    await navigator.clipboard.writeText(copyText);
    setMessage('Link copied!');
  };

  const handleUnfav = (id: string, recipe: FavoriteRecipesType) => {
    const newFavoriteRecipes = favoriteRecipes.filter((favRecipe) => (
      favRecipe.id !== id
    ));
    setShownRecipes(newFavoriteRecipes);
    setFavoriteRecipes(newFavoriteRecipes);
    saveLocalStorage('favoriteRecipes', recipe);
  };

  const handleFilterClick = (type: string) => {
    const newShownRecipes = favoriteRecipes.filter((recipe) => (
      recipe.type === type
    ));
    setShownRecipes(newShownRecipes);
  };

  return (
    <div>
      <Header pageTitle="Favorite Recipes" />
      <div>
        <button
          onClick={ () => setShownRecipes(favoriteRecipes) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          onClick={ () => handleFilterClick('meal') }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          onClick={ () => handleFilterClick('drink') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>

      <div>
        {shownRecipes?.map((recipe, index) => (
          <div key={ index }>
            { /* Foto da Receita */ }
            <a href={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ `Recipe ${index}` }
                data-testid={ `${index}-horizontal-image` }
                style={ { width: '150px' } }
              />
            </a>

            { /* Nome da Receita */ }
            <a href={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }><p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p></a>

            { /* Categoria e Nacionalidade  */ }
            {recipe.type === 'meal' ? (
              // Nationality and Category
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}`}
              </p>
            ) : (
              // IsAlcoholicOrNot
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </p>
            )}
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}
            </p>

            { /* Compartilhar */ }
            <button onClick={ () => handleShare(recipe.type, recipe.id) }>
              <img
                src={ faShare }
                alt="Share"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>

            { /* Favoritar */ }
            <button
              onClick={ () => handleUnfav(recipe.id, recipe) }
            >
              <img
                src={ unFav }
                alt="Favorite"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>
        ))}
        {message !== '' && <span>{message}</span>}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
