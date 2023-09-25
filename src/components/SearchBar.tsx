import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import RecipeAppContext from '../context/RecipeAppContext';
import FilterBar from './FilterBar';
import Recipes from './Recipes';
import { getFetch } from '../utils/functions';
import { CocktailType, MealType, SearchResultsType } from '../types';
import useRecipeCategories from '../hooks/useRecipeCategories';

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
  const { byCategories, categories, getByCategories } = useRecipeCategories(page);
  const navigate = useNavigate();

  const meals = searchResults?.meals || [];
  const drinks = searchResults?.drinks || [];
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [initialRecipes, setInitialRecipes] = useState<SearchResultsType>(
    { meals: [], drinks: [] },
  );

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

  useEffect(() => {
    const fetchData = async (string: string) => {
      const toggle = string === 'meals' ? 'themealdb' : 'thecocktaildb';
      const endpoint = `https://www.${toggle}.com/api/json/v1/1/search.php?s=`;
      const result = await getFetch(endpoint, '');
      setInitialRecipes(result);
    };
    fetchData(page);
  }, [page]);

  console.log(byCategories);
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
      <FilterBar
        page={ page }
        getByCategories={ getByCategories }
        categories={ categories }
      />
      {meals.length === 0 && byCategories.byCategories.length === 0 && (
        <Recipes meals={ initialRecipes.meals } />
      )}
      {drinks.length === 0 && byCategories.byCategories.length === 0 && (
        <Recipes drinks={ initialRecipes.drinks } />
      )}
      {byCategories.byCategories.length > 0 && meals.length === 0 && (
        <Recipes meals={ byCategories.byCategories as MealType[] } />
      )}
      {byCategories.byCategories.length > 0 && meals.length === 0 && (
        <Recipes drinks={ byCategories.byCategories as CocktailType[] } />
      )}
      {meals.length > 0 && (
        <Recipes meals={ meals } />
      )}
      {drinks.length > 0 && <Recipes drinks={ drinks } />}
      <section />
    </>
  );
}

export default SearchBar;
