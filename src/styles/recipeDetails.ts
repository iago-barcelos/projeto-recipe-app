import styled from 'styled-components';

export const Button = styled.button`
  background-color: #F57F02;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 28px;
  transition: 0.3s ease;
`;

export const RecipeDetailsMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: #000;
  background-color: #F7EFE4;

  & h1 {
    font-weight: bolder;
    font-family: 'Oooh Baby', cursive;
    font-size: 35px;
    margin-top: 10px;
  }
`;

export const RecipeDetailContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;  
  font-family: 'Oooh Baby', cursive;

  & h3 {
    font-size: 30px;
    font-weight: bolder;
  }

  & h4 {
    font-size: 25px;
    font-weight: bolder;
  }

  & #recipePhoto {
    width: 130px;
    height: 130px;
    border: 1px solid #000;    
    margin-bottom: 20px;
  }

  & #btnContainer button {    
    border: none;
    background-color: transparent;
    margin: 0 0 5px 5px;
  }

  & #btnContainer button img {
    width: 25px;
    height: 25px;    
  }

  & #ingredients {
    font-size: 23px;
  }

  & #ingredients h4, #measures h4 {
    margin-bottom: 2rem;
  }

  & #measures {   
    margin-left: 10px;
    padding-left: 10px;
    font-size: 23px;
  }

  & #preparation li {
    width: 98%;
    font-size: 28px; 
    word-wrap: break-word;
    font-weight: none;    
  }

  & #preparation {
    margin-bottom: 20px;
  }

  & iframe {
    width: 300px;
    height: 200px;
  }
`;

export const IngredientsAndMeasures = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  transform: translateX(-15px);
  margin-bottom: 2rem;
`;

export const RecommendedContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Oooh Baby', cursive;
  margin-top: 30px;

  & h3 {
    font-size: 28px;
    font-weight: bolder;
    color: #000;
  }

  & #cardsContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  & #cardsContainer button {
    transform: translateY(-75%);
    background-color: transparent;
    border: none;
    color: #F57F02;
    font-size: 45px;
  }

  & a {
    text-decoration: none;
    color: #000;
  }
`;

export const RecommendedCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px 5px 25px 5px;  

  & img {
    width: 130px;
    height: 130px;
    border: 1px solid #000;    
    margin-bottom: 10px;
  }
`;
