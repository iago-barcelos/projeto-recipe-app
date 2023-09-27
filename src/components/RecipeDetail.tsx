import { useParams } from 'react-router-dom';
import useRecipeDetails from '../hooks/useRecipeDetails';

function RecipeDetail() {
  const { id } = useParams();
  const { recipeDetail } = useRecipeDetails(id as string);
  console.log(recipeDetail);
  return (
    <>
      <h1>Recipe Detail</h1>
      <h2>
        ID da receita
        {' '}
        {id as string}
      </h2>
    </>
  );
}

export default RecipeDetail;
