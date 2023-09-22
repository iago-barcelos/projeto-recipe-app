import React, { useState, ChangeEvent } from 'react';
import searchIcon from '../images/searchIcon.svg';

type SearchType = 'ingredient' | 'name' | 'first-letter';

function SearchBar() {
  const [searchType, setSearchType] = useState<SearchType>('ingredient');
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  const handleSearchTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value as SearchType);
  };

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    if (searchType === 'ingredient') {
      if (searchValue) {
        // Busca por ingrediente
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`)
          .then((response) => response.json())
          .then((data) => data)
          .catch((error) => {
            console.error('Erro na busca por ingrediente:', error);
          });
      } else {
        window.alert('Please, you must submit a valid ingredient.');
      }
    } else if (searchType === 'name') {
      if (searchValue) {
        // Busca por nome
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
          .then((response) => response.json())
          .then((data) => data)
          .catch((error) => {
            console.error('Erro na busca por nome:', error);
          });
      } else {
        window.alert('Please, you must submit a valid name.');
      }
    } else if (searchType === 'first-letter') {
      if (searchValue.length === 1) {
        // Busca por primeira letra
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`)
          .then((response) => response.json())
          .then((data) => data);
      } else {
        window.alert('Your search must have only 1 (one) character');
      }
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

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
