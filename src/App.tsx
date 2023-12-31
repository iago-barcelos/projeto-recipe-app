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
import RecipeDetail from './components/RecipeDetails';
import RecipeAppProvider from './context/RecipeAppProvider';
import RecipeInProgress from './components/RecipeInProgress';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <RecipeAppProvider>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <HomeMeal /> } />
        <Route path="/meals/:id" element={ <RecipeDetail /> } />
        <Route
          path="/meals/:id/in-progress"
          element={ <RecipeInProgress /> }
        />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/drinks/:id" element={ <RecipeDetail /> } />
        <Route
          path="/drinks/:id/in-progress"
          element={ <RecipeInProgress /> }
        />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Routes>
    </RecipeAppProvider>
  );
}

export default App;
