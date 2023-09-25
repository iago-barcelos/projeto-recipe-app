import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import RecipeAppContext from '../context/RecipeAppContext';
import FilterBar from './FilterBar';

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

  const createMealCard = () => {
    const shownMealsResults = meals.length > 12 ? (
      meals.slice(0, 12)) : meals;
    return shownMealsResults.map(({ strMealThumb, strMeal }, index) => (
      <div data-testid={ `${index}-recipe-card` } key={ index }>
        <img
          data-testid={ `${index}-card-img` }
          src={ strMealThumb }
          alt={ strMeal }
        />
        <span data-testid={ `${index}-card-name` } key={ index }>{strMeal}</span>
      </div>
    ));
  };

  const createDrinkCard = () => {
    const shownDrinksResults = drinks.length > 12 ? (
      drinks.slice(0, 12)) : drinks;
    return shownDrinksResults.map(({ strDrink, strDrinkThumb }, index) => (
      <div data-testid={ `${index}-recipe-card` } key={ index }>
        <img
          data-testid={ `${index}-card-img` }
          src={ strDrinkThumb }
          alt={ strDrink }
        />
        <span data-testid={ `${index}-card-name` } key={ index }>{strDrink}</span>
      </div>
    ));
  };

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
  // console.log(searchResults);
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
      {meals.length > 0 && createMealCard()}
      {drinks.length > 0 && createDrinkCard()}
      <section />
    </>
  );
}

export default SearchBar;
