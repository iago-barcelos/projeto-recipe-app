import React, { useContext } from 'react';
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

// ..

function App() {
  const { searchResults } = useRecipeSearch();
  return (
    <RecipeAppContext.Provider value={ { searchResults } }>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <HomeMeal /> } />
        <Route path="/meals/:id-da-receita" element={ <HomeMeal /> } />
        <Route path="/meals/:id-da-receita/in-progress" element={ <HomeMeal /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/drinks:id-da-receita" element={ <Drinks /> } />
        <Route path="/drinks/:id-da-receita/in-progress" element={ <HomeMeal /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Routes>
    </RecipeAppContext.Provider>
  );
}

export default App;
