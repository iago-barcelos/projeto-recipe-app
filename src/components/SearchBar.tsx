import React, { useState, useContext } from 'react';
import RecipeAppContext from '../context/RecipeAppContext';
import FilterBar from './FilterBar';
import * as S from '../styles/meals&Drinks';

type SearchBarProps = {
  page: string,
};

function SearchBar({ page }: SearchBarProps) {
  const recipeContext = useContext(RecipeAppContext);
  const {
    searchValue,
    handleChange,
    handleSearch,
  } = recipeContext;

  return (
    <section>
      <S.SearchBar style={ page === 'drinks' ? { color: '#fff' } : { color: '#000' } }>
        <S.SearchRadioBtnContainer>
          <label>
            <input
              type="radio"
              name="searchType"
              value="ingredient"
              data-testid="ingredient-search-radio"
              onChange={ handleChange }
            />
            Ingredient
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="name"
              data-testid="name-search-radio"
              onChange={ handleChange }
            />
            Name
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="first-letter"
              data-testid="first-letter-search-radio"
              onChange={ handleChange }
            />
            First letter
          </label>
        </S.SearchRadioBtnContainer>
        <S.SearchInputContainer>
          <input
            type="text"
            placeholder="Digite sua busca aqui..."
            data-testid="search-input"
            name="searchValue"
            value={ searchValue }
            onChange={ handleChange }
          />
          <S.Button
            type="button"
            data-testid="exec-search-btn"
            onClick={ () => handleSearch(page) }
          >
            Search
          </S.Button>
        </S.SearchInputContainer>
      </S.SearchBar>
      <FilterBar page={ page } />
    </section>
  );
}

export default SearchBar;
