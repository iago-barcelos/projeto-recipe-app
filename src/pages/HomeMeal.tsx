import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipeAppContext from '../context/RecipeAppContext';
import useFetch from '../hooks/useFetch';
import * as S from '../styles/style';

function HomeMeal() {
  const recipeContext = useContext(RecipeAppContext);
  const navigate = useNavigate();
  const { initialResults } = useFetch('api/json/v1/1/search.php?s=');
  const {
    searchResults,
    mealsByCategories,
  } = recipeContext;

  useEffect(() => {
    if (meals.length === 1) {
      const id = meals[0].idMeal;
      navigate(`/meals/${id}`);
    }
  }, [searchResults]);

  const meals = searchResults?.meals || [];
  const mealsCat = mealsByCategories?.meals || [];
  const checkInitialMeals = initialResults?.meals || [];
  return (
    <S.HomeMealMain>
      <nav>
        <Header pageTitle="Meals" />
        <SearchBar page="meals" />
      </nav>
      <S.RecipeContainer>
        {meals.length === 0 && mealsCat.length === 0 && (
          <Recipes meals={ checkInitialMeals } />
        )}
        {mealsCat.length > 0 && (
          <Recipes byCategories={ mealsByCategories } />
        )}
        {meals.length > 0 && (
          <Recipes meals={ meals } />
        )}
      </S.RecipeContainer>
      <Footer />
    </S.HomeMealMain>
  );
}

export default HomeMeal;
