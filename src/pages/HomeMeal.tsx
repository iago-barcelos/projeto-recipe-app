import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipeAppContext from '../context/RecipeAppContext';
import useFetch from '../hooks/useFetch';
import * as S from '../styles/meals&Drinks';

function HomeMeal() {
  const recipeContext = useContext(RecipeAppContext);
  const isMeal = window.location.pathname.includes('meals');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();
  const { initialResults } = useFetch('api/json/v1/1/search.php?s=');
  const {
    searchResults,
    mealsByCategories,
  } = recipeContext;

  useEffect(() => {
    if (meals.length > 0 || !isMeal) {
      setShowSearchBar((prev) => !prev);
    }
    if (meals.length === 1) {
      const id = meals[0].idMeal;
      navigate(`/meals/${id}`);
    }
  }, [searchResults]);

  const meals = searchResults?.meals || [];
  const mealsCat = mealsByCategories?.meals || [];
  const checkInitialMeals = initialResults?.meals || [];

  const handleMenu = () => {
    setShowSearchBar((prev) => !prev);
  };
  return (
    <S.HomeMealMain>
      <S.Nav>
        <S.MainNav>
          <Header pageTitle="Meals" />
          <S.MenuContainer>
            <button
              id="burgerMenu"
              className="material-icons"
              onClick={ handleMenu }
              style={ showSearchBar ? { color: '#fff' } : { color: '#f57f02' } }
            >
              menu
            </button>
          </S.MenuContainer>
        </S.MainNav>
        {showSearchBar && <SearchBar page="meals" />}
      </S.Nav>
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
