import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipeAppContext from '../context/RecipeAppContext';
import { SearchResultsType } from '../types';
import { getFetch } from '../utils/functions';

function HomeMeal() {
  const recipeContext = useContext(RecipeAppContext);
  const [initialMeals, setInitialMeals] = useState<SearchResultsType>(
    { meals: [], drinks: [] },
  );
  const {
    searchResults,
    mealsByCategories,
  } = recipeContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (meals.length === 1) {
      const id = meals[0].idMeal;
      navigate(`/meals/${id}`);
    }
  }, [searchResults]);
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const result = await getFetch(endpoint, '');
      setInitialMeals(result);
    };
    fetchData();
  }, []);

  const meals = searchResults?.meals || [];
  const mealsCat = mealsByCategories?.meals || [];
  const checkInitialMeals = initialMeals?.meals || [];

  return (
    <div>
      <Header pageTitle="Meals" />
      <SearchBar page="meals" />
      {meals.length === 0 && mealsCat.length === 0 && (
        <Recipes meals={ checkInitialMeals } />
      )}
      {mealsCat.length > 0 && (
        <Recipes byCategories={ mealsByCategories } />
      )}
      {meals.length > 0 && (
        <Recipes meals={ meals } />
      )}
      <Footer />
    </div>
  );
}

export default HomeMeal;
