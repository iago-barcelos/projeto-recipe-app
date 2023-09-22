import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import { getFetch } from '../utils/functions';
import { MealType, CocktailType } from '../types';

type SearchType = 'ingredient' | 'name' | 'first-letter';
type SearchBarProps = {
  page: string,
};
function SearchBar({ page }: SearchBarProps) {
  const [searchType, setSearchType] = useState<SearchType>('ingredient');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<MealType | CocktailType>();
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearchTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value as SearchType);
  };

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    if (searchType === 'ingredient') {
      if (!searchValue) {
        window.alert('Please, you must submit a valid ingredient.');
      }
      const endpoint = page === 'Meals' ? 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
      const result = await getFetch(endpoint, searchValue);
      setSearchResult(await result);
    } else if (searchType === 'name') {
      if (!searchValue) {
        window.alert('Please, you must submit a valid name.');
      }
      const endpoint = page === 'Meals' ? 'https://www.themealdb.com/api/json/v1/1/search.php?s=' : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const result = await getFetch(endpoint, searchValue);
      setSearchResult(await result);
    } else if (searchType === 'first-letter') {
      if (searchValue.length !== 1) {
        window.alert('Your search must have only 1 (one) character');
      }
      const endpoint = page === 'Meals' ? 'https://www.themealdb.com/api/json/v1/1/search.php?f=' : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
      const result = await getFetch(endpoint, searchValue);
      setSearchResult(await result);
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  // useEffect(() => {
  //   if (searchResult) {
  //     if ((searchResult as MealType).meals.length === 1) {
  //       const id = (searchResult as MealType).meals[0].idMeal;
  //       navigate(`/meals/${id}`);
  //     }
  //     if ((searchResult as CocktailType).cocktail.length === 1) {
  //       const id = (searchResult as CocktailType).cocktail[0].idDrink;
  //       navigate(`/drinks/${id}`);
  //     }
  //   }
  // }, [searchResult]);

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

    </div>
  );
}

export default SearchBar;
