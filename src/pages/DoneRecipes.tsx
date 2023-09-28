import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { RecipeType } from '../types'; // Certifique-se de que a tipagem esteja adequada às suas necessidades

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    const savedDoneRecipes = localStorage.getItem('doneRecipes');

    if (savedDoneRecipes) {
      const parsedDoneRecipes = JSON.parse(savedDoneRecipes);
      setDoneRecipes(parsedDoneRecipes);
    }
  }, []);

  return (
    <div>
      <Header pageTitle="Receitas Feitas" />

      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      {doneRecipes.map((recipe, index) => (
        <div key={ index }>
          <img src={ recipe.image } alt={ recipe.name } data-testid={ `${index}-horizontal-image` } />
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button data-testid={ `${index}-horizontal-share-btn` }>Compartilhar</button>

          {recipe.tags.map((tag, tagIndex) => (
            <span key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;