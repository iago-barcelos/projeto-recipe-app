import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import { getFetch } from '../utils/functions';
import { MealType, CocktailType } from '../types';

type SearchType = 'ingredient' | 'name' | 'first-letter';
type SearchResultsType = {
  meals: MealType[],
  drinks: CocktailType[]
};
type SearchBarProps = {
  page: string,
};
function SearchBar({ page }: SearchBarProps) {
  const [searchType, setSearchType] = useState<SearchType>('ingredient');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResult] = useState<SearchResultsType>(
    { meals: [], drinks: [] },
  );
  const { meals, drinks } = searchResults;
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearchTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value as SearchType);
  };

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const checkSearchValue = (errorMessage: string) => {
    if (!searchValue || searchValue.length > 1) {
      window.alert(errorMessage);
    }
  };

  const handleSearch = async () => {
    const domainURL = page === 'meals' ? 'themealdb' : 'thecocktaildb';
    if (searchType === 'ingredient') {
      checkSearchValue('Please, you must submit a valid ingredient.');
      const endpoint = `https://www.${domainURL}.com/api/json/v1/1/filter.php?i=`;
      const results = await getFetch(endpoint, searchValue);
      setSearchResult({ ...searchResults, [page]: results[page] });
    } else if (searchType === 'name') {
      checkSearchValue('Please, you must submit a valid name.');
      const endpoint = `https://www.${domainURL}.com/api/json/v1/1/search.php?s=`;
      const results = await getFetch(endpoint, searchValue);
      setSearchResult({ ...searchResults, [page]: results[page] });
    } else if (searchType === 'first-letter') {
      checkSearchValue('Your search must have only 1 (one) character');
      const endpoint = `https://www.${domainURL}.com/api/json/v1/1/search.php?f=`;
      const results = await getFetch(endpoint, searchValue);
      setSearchResult({ ...searchResults, [page]: results[page] });
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
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
        onClick={ handleSearchIconClick }
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
          value={ searchValue }
          onChange={ handleSearchValueChange }
        />
      )}
      <label>
        <input
          type="radio"
          name="search-type"
          value="ingredient"
          data-testid="ingredient-search-radio"
          checked={ searchType === 'ingredient' }
          onChange={ handleSearchTypeChange }
        />
        Ingredient
      </label>
      <label>
        <input
          type="radio"
          name="search-type"
          value="name"
          data-testid="name-search-radio"
          checked={ searchType === 'name' }
          onChange={ handleSearchTypeChange }
        />
        Name
      </label>
      <label>
        <input
          type="radio"
          name="search-type"
          value="first-letter"
          data-testid="first-letter-search-radio"
          checked={ searchType === 'first-letter' }
          onChange={ handleSearchTypeChange }
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
