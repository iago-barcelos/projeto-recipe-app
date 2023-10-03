import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { DoneRecipeType } from '../types';
import faShare from '../images/shareIcon.svg';

function DoneRecipes() {
  const INITIAL_DONE_RECIPES: DoneRecipeType[] = JSON.parse(localStorage.getItem('doneRecipes') as string) || [];
  const [message, setMessage] = useState('');
  const [doneRecipes, setDoneRecipes] = useState(INITIAL_DONE_RECIPES || undefined);
  const [shownRecipes, setShownRecipes] = useState(INITIAL_DONE_RECIPES);

  const handleShare = async (type: string, id: string) => {
    const copyText = `http://localhost:3000/${type}s/${id}`;
    await navigator.clipboard.writeText(copyText);
    setMessage('Link copied!');
  };

  const handleFilterClick = (type: string) => {
    const newShownRecipes = doneRecipes.filter((recipe) => (
      recipe.type === type
    ));
    setShownRecipes(newShownRecipes);
  };

  return (
    <div>
      <Header pageTitle="Receitas Feitas" />
      {/* Botões de filtro */}
      <div>
        <button
          onClick={ () => setShownRecipes(doneRecipes) }
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
        {shownRecipes.map((recipe, index) => (
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

            {/* Nationality and Category || IsALcoholicOrNot */}
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

            {/* Done date */}
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            {recipe.tags?.slice(0, 2)?.map((tag, tagIndex) => (
              <span key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
              </span>
            ))}

            { /* Compartilhar */ }
            <button onClick={ () => handleShare(recipe.type, recipe.id) }>
              <img
                src={ faShare }
                alt="Share"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
          </div>
        ))}
        {message !== '' && <span>{message}</span>}
      </div>
    </div>
  );
}

export default DoneRecipes;