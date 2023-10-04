import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';
import RecipeAppContext from '../context/RecipeAppContext';
import useFetch from '../hooks/useFetch';
import * as S from '../styles/meals&DrinksStyle';

function Drinks() {
  const recipeContext = useContext(RecipeAppContext);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { initialResults } = useFetch('api/json/v1/1/search.php?s=');
  const { searchResults, drinksByCategories } = recipeContext;
  const navigate = useNavigate();

  const drinks = searchResults?.drinks || [];
  const checkInitialDrinks = initialResults?.drinks || [];
  const drinksByCat = drinksByCategories?.drinks || [];

  useEffect(() => {
    if (drinks.length === 1) {
      const id = drinks[0].idDrink;
      console.log(id);
      navigate(`/drinks/${id}`);
    }
  }, [searchResults]);

  const handleMenu = () => {
    setShowSearchBar((prev) => !prev);
  };

  return (
    <S.Drinks>
      <S.Nav>
        <S.MainNav>
          <Header pageTitle="Drinks" />
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
        {showSearchBar && <SearchBar page="drinks" />}
      </S.Nav>
      <S.RecipeContainer>
        {drinks.length === 0 && drinksByCat.length === 0 && (
          <Recipes drinks={ checkInitialDrinks } />
        )}
        {drinksByCat.length > 0 && (
          <Recipes byCategories={ drinksByCategories } />
        )}
        {drinks.length > 0 && <Recipes drinks={ drinks } />}
      </S.RecipeContainer>
      <Footer />
    </S.Drinks>

  );
}

export default Drinks;
