import styled from 'styled-components';

export const Button = styled.button`
  background-color: #F57F02;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 28px;
  transition: 0.3s ease;
  margin-bottom: 20px;
`;

export const DoneRecipesMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;

  & header {
    margin: 20px;
    justify-content: center;
    align-items: center;

    & button {
      display: none;
    }
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  & button {
    margin-left: 5px;
  }
`;

export const DoneRecipeContainer = styled.section`
  font-size: 22px;

  & img {
    border: 1px solid #000;
    margin-bottom: 10px;
  }

  & a {
    font-family: 'Satisfy', cursive;
    text-decoration: none;
    color: #000;
    font-size: 32px;
  }

  & p {
    font-family: 'Satisfy', cursive;
    font-size: 26px;
  }

  & button {
    background-color: transparent;
    border: none;
    margin-left: 20px;
  }

  & button img {
    border: none;
  }
`;
