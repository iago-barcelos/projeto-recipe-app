import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';
import RecipeAppContext from '../context/RecipeAppContext';
import useFetch from '../hooks/useFetch';

function Drinks() {
  const recipeContext = useContext(RecipeAppContext);
  const { initialResults } = useFetch('api/json/v1/1/search.php?s=');
  const { searchResults, drinksByCategories } = recipeContext;
  const navigate = useNavigate();

  const drinks = initialResults?.drinks || [];
  const drinksByCat = drinksByCategories?.drinks || [];

  useEffect(() => {
    if (drinks.length === 1) {
      const id = drinks[0].idDrink;
      navigate(`/drinks/${id}`);
    }
  }, [searchResults]);
  return (
    <div>
      <Header pageTitle="Drinks" />
      <SearchBar page="drinks" />
      {drinks.length === 0 && drinksByCat.length === 0 && (
        <Recipes drinks={ drinks } />
      )}
      {drinksByCat.length > 0 && (
        <Recipes byCategories={ drinksByCategories } />
      )}
      {drinks.length > 0 && <Recipes drinks={ drinks } />}
      <Footer />
    </div>
  );
}

export default Drinks;
