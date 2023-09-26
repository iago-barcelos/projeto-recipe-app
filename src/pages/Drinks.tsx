import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';
import { getFetch } from '../utils/functions';
import { SearchResultsType } from '../types';
import RecipeAppContext from '../context/RecipeAppContext';

function Drinks() {
  const recipeContext = useContext(RecipeAppContext);
  const [initialDrinks, setInitialDrinks] = useState<SearchResultsType>(
    { meals: [], drinks: [] },
  );
  const { searchResults, drinksByCategories } = recipeContext;
  const navigate = useNavigate();

  const drinks = searchResults?.drinks || [];

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const result = await getFetch(endpoint, '');
      setInitialDrinks(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (drinks.length === 1) {
      const id = drinks[0].idDrink;
      navigate(`/drinks/${id}`);
    }
  }, [searchResults]);
  console.log(drinksByCategories);
  return (
    <div>
      <Header pageTitle="Drinks" />
      <SearchBar page="drinks" />
      {drinks.length === 0 && drinksByCategories.drinks.length === 0 && (
        <Recipes drinks={ initialDrinks.drinks } />
      )}
      {drinksByCategories.drinks.length > 0 && (
        <Recipes byCategories={ drinksByCategories } />
      )}
      {drinks.length > 0 && <Recipes drinks={ drinks } />}
      <Footer />
    </div>
  );
}

export default Drinks;
