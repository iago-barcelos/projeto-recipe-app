import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import HomeMeal from './pages/HomeMeal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import useRecipeSearch from './hooks/useRecipeSearch';
import RecipeAppContext from './context/RecipeAppContext';
import useRecipeCategories from './hooks/useRecipeCategories';
import RecipeDetail from './components/RecipeDetail';

function App() {
  const {
    searchResults,
    searchValue,
    handleChange,
    handleSearch,
  } = useRecipeSearch();
  const {
    mealCategories,
    drinkCategories,
    drinksByCategories,
    mealsByCategories,
    setDrinksByCategories,
    setMealsByCategories,
    getByCategories,
  } = useRecipeCategories();

  return (
    <RecipeAppContext.Provider
      value={ {
        searchResults,
        searchValue,
        handleChange,
        handleSearch,
        mealCategories,
        drinkCategories,
        drinksByCategories,
        mealsByCategories,
        setDrinksByCategories,
        setMealsByCategories,
        getByCategories,
      } }
    >
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <HomeMeal /> } />
        <Route path="/meals/:id" element={ <RecipeDetail /> } />
        <Route
          path="/meals/:id/in-progress"
          element={ <HomeMeal /> }
        />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/drinks:id" element={ <RecipeDetail /> } />
        <Route
          path="/drinks/:id/in-progress"
          element={ <HomeMeal /> }
        />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Routes>
    </RecipeAppContext.Provider>
  );
}

export default App;
