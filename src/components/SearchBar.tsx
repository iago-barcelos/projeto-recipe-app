import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import { getFetch } from '../utils/functions';
import { SearchResultsType } from '../types';

type SearchBarProps = {
  page: string,
};
type FormDataType = {
  searchValue: string,
  searchType: string,
};

function SearchBar({ page }: SearchBarProps) {
  const navigate = useNavigate();

  const FORM_INITIAL_STATE = {
    searchValue: '',
    searchType: 'ingredient',
  };

  const [formData, setFormData] = useState<FormDataType>(FORM_INITIAL_STATE);
  const { searchValue, searchType } = formData;
  const [searchResults, setSearchResult] = useState<SearchResultsType>(
    { meals: [], drinks: [] },
  );
  const { meals, drinks } = searchResults;
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value: targetValue } } = event;
    setFormData({ ...formData, [name]: targetValue });
  };

  const isSearchValueValid = (errorMessage: string) => {
    if (!searchValue) {
      window.alert(errorMessage);
      return false;
    }
    if (searchType === 'first-letter' && searchValue.length > 1) {
      window.alert(errorMessage);
      return false;
    }
    return true;
  };

  const handleSearchResults = async (endpoint: string, errorMessage: string) => {
    if (!isSearchValueValid(errorMessage)) {
      return;
    }
    const results = await getFetch(endpoint, searchValue);
    if (!results || results[page] === null) {
      window.alert("Sorry, we haven't found any recipes for these filters.");
      return;
    }
    setSearchResult({ ...searchResults, [page]: results[page] });
  };

  const handleSearch = async () => {
    const domainURL = page === 'meals' ? 'themealdb' : 'thecocktaildb';
    if (searchType === 'ingredient') {
      await handleSearchResults(
        `https://www.${domainURL}.com/api/json/v1/1/filter.php?i=`,
        'Please, you must submit a valid ingredient.',
      );
    } else if (searchType === 'name') {
      await handleSearchResults(
        `https://www.${domainURL}.com/api/json/v1/1/search.php?s=`,
        'Please, you must submit a valid name.',
      );
    } else if (searchType === 'first-letter') {
      await handleSearchResults(
        `https://www.${domainURL}.com/api/json/v1/1/search.php?f=`,
        'Your search must have only 1 (one) character',
      );
    }
  };

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

  return (
    <div>
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
        onClick={ handleSearch }
      >
        Search
      </button>
      {meals.length > 0 && createMealCard()}
      {drinks.length > 0 && createDrinkCard()}
    </div>
  );
}

export default SearchBar;
