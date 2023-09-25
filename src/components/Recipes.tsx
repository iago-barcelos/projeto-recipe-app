import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getFetch } from '../utils/functions';
import { CocktailType, MealType } from '../types';

function Recipes() {
  const location = useLocation();
  const isMealsRoute = location.pathname === '/meals';
  const isDrinksRoute = location.pathname === '/drinks';

  const [recipesData, setRecipesData] = useState<MealType[] | CocktailType[]>([]);

  const mealEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinkEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = '';

        if (isMealsRoute) {
          endpoint = mealEndPoint;
        } else if (isDrinksRoute) {
          endpoint = drinkEndPoint;
        }

        const result = await getFetch(endpoint, '');
        if (result && result.length > 0) {
          setRecipesData(result.slice(0, 12));
        }
      } catch (error) {
        console.error('Ocorreu um erro ao buscar receitas:', error);
      }
    };

    if (isMealsRoute || isDrinksRoute) {
      fetchData();
    }
  }, [isMealsRoute, isDrinksRoute]);

  return (
    <div>
      {recipesData.map((recipe, index) => (
        <section key={ index } data-testid={ `${index}-recipe-card` }>
          {recipe && (
            <>
              <img
                data-testid={ `${index}-card-img` }
                src={
                  (recipe as MealType)
                    .strMealThumb
                    || (recipe as CocktailType)
                      .strDrinkThumb
                  }
                alt=""
              />
              <p data-testid={ `${index}-card-name` }>
                {(recipe as MealType).strMeal || (recipe as CocktailType).strDrink}
              </p>
            </>
          )}
        </section>
      ))}
    </div>
  );
}

export default Recipes;
