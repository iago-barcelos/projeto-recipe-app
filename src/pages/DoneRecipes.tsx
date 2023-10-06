import React, { useState } from 'react';
import Header from '../components/Header';
import { DoneRecipeType } from '../types';
import faShare from '../images/shareIcon.svg';
import * as S from '../styles/doneRecipes';
import Footer from '../components/Footer';

function DoneRecipes() {
  const INITIAL_DONE_RECIPES: DoneRecipeType[] = JSON.parse(
    localStorage.getItem('doneRecipes') as string,
  ) || [];
  const [message, setMessage] = useState('');
  const [shownRecipes, setShownRecipes] = useState(INITIAL_DONE_RECIPES || undefined);

  const handleShare = async (type: string, id: string) => {
    const copyText = `http://localhost:3000/${type}s/${id}`;
    await navigator.clipboard.writeText(copyText);
    setMessage('Link copied!');
  };

  const handleFilterClick = (type: string) => {
    const newShownRecipes = shownRecipes.filter((recipe) => (
      recipe.type === type
    ));
    setShownRecipes(newShownRecipes);
  };

  return (
    <S.DoneRecipesMain>
      <Header pageTitle="Done Recipes" />
      {/* Botões de filtro */}
      <S.BtnContainer>
        <S.Button
          onClick={ () => setShownRecipes(INITIAL_DONE_RECIPES) }
          data-testid="filter-by-all-btn"
        >
          All
        </S.Button>
        <S.Button
          onClick={ () => handleFilterClick('meal') }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </S.Button>
        <S.Button
          onClick={ () => handleFilterClick('drink') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </S.Button>
      </S.BtnContainer>

      <S.DoneRecipeContainer>
        {shownRecipes.length === 0 && <p>Nothing done yet.</p>}
        {shownRecipes.map((recipe, index) => (
          <div key={ index }>
            {/* Foto da Receita */}
            <a href={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ `Recipe ${index}` }
                data-testid={ `${index}-horizontal-image` }
                style={ { width: '150px' } }
              />
            </a>

            {/* Nome da Receita */}
            <a href={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </a>

            {/* Nationality and Category || IsALcoholicOrNot */}
            {recipe.type === 'meal' ? (
              // Nationality and Category
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}`}
              </p>
            ) : (
              // IsAlcoholicOrNot
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
              </p>
            )}

            {/* Done date */}
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {`Date: ${recipe.doneDate}`}

            </p>
            {recipe.tags?.slice(0, 2)?.map((tag, tagIndex) => (
              <span
                key={ tagIndex }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {`Tags: ${tag}`}
              </span>
            ))}

            {/* Compartilhar */}
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
      </S.DoneRecipeContainer>
      <Footer />
    </S.DoneRecipesMain>
  );
}

export default DoneRecipes;
