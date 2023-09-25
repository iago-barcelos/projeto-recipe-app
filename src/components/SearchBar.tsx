import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import RecipeAppContext from '../context/RecipeAppContext';
import FilterBar from './FilterBar';
import RecipeCard from './RecipeCard';

type SearchBarProps = {
  page: string,
};

function SearchBar({ page }: SearchBarProps) {
  const recipeContext = useContext(RecipeAppContext);
  const {
    searchResults,
    searchValue,
    handleChange,
    handleSearch,
  } = recipeContext;
  const navigate = useNavigate();

  const { meals, drinks } = searchResults;
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  useEffect(() => {
    if (meals.length === 1) {
      const id = meals[0].idMeal;
      navigate(`/meals/${id}`);
    }
    if (drinks.length === 1) {
      const id = drinks[0].idDrink;
      navigate(`/drinks/${id}`);
    }
  }, [searchResults]);
  console.log(searchResults);
  return (
    <>
      <section>
        <button
          type="button"
          onClick={ () => setIsSearchVisible(!isSearchVisible) }
        >
          <img
            src={ searchIcon }
            alt="Search Icon"
            data-testid="search-top-btn"
          />
        </button>
        {isSearchVisible && (
          <input
            type="text"
            placeholder="Digite sua busca aqui..."
            data-testid="search-input"
            name="searchValue"
            value={ searchValue }
            onChange={ handleChange }
          />
        )}
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
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleSearch(page) }
        >
          Search
        </button>
      </section>
      <FilterBar page={ page } />
      {meals.length > 0 && <RecipeCard meals={ meals } />}
      {drinks.length > 0 && <RecipeCard drinks={ drinks } />}
      <section />
    </>
  );
}

export default SearchBar;
