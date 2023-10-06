import styled from 'styled-components';

export const Button = styled.button`
  background-color: #F57F02;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 28px;
  transition: 0.3s ease;

  &:disabled {
    background-color: lightgray;
    color: darkslategray
  }
`;

export const InProgressMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
  background-color: #F7EFE4;

  & h1 {
    font-family: 'Oooh Baby', cursive;
    font-weight: bolder;
    font-size: 30px;
    margin: 10px 0 25px;
  }

  & #recipePhoto {
    width: 130px;
    height: 130px;
    border: 1px solid #000;
    margin-bottom: 20px;
  }

  & label {
    font-family: 'Oooh Baby', cursive;
    font-weight: bold;   
    font-size: 20px;
    padding-left: 5px;    
  }

  & input {
    margin-right: 10px;
  }

  & #preparation {
    margin: 50px 0 20px;
    width: 100%;
    padding: 10px;
  }

  & #preparation h3 {
    text-align: center;
    font-family: 'Oooh Baby', cursive;
    font-weight: bold;  
    font-size: 30px; 
    margin-bottom: 15px;
  }

  & #preparation p {
    word-spacing: 5px;
    font-family: 'Oooh Baby', cursive;
    font-size: 25px;      
  }

  #finishRecipeBtn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 4rem;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;


  & #favorite {
    background-color: transparent;
    border: none;
  }

  & #favorite img {
    width: 30px;
  }

  & #shareBtn {
    background-color: transparent;
    border: none;
    margin-right: 10px;  
  }

  & #shareBtn img {
    width: 30px;
    height: 30px;  
  }
`;
