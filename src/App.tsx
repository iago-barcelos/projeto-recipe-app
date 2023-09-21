import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import HomeMeal from './pages/homeMeal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
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
  );
}

export default App;
