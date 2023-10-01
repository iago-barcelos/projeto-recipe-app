import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { DoneRecipeType } from '../types';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]);

  useEffect(() => {
    const savedDoneRecipes = localStorage.getItem('doneRecipes');

    if (savedDoneRecipes) {
      const parsedDoneRecipes = JSON.parse(savedDoneRecipes);
      setDoneRecipes(parsedDoneRecipes);
    }
  }, []);

  return (
    <div>
      <Header pageTitle="Done Recipes" />

      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>

      {doneRecipes?.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.nationality} - ${recipe.category}`}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.tags.slice(0, 2)?.map((tag, tagIndex) => (
            <span key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </span>
          ))}
          <button>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src="src/images/shareIcon.svg"
              alt="Compartilhar"
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
