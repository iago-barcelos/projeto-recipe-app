import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  & h1 {
    font-size: 40px;
    font-family: 'Satisfy', cursive;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,  
    1px 1px 0 #000;   
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center; 
  height: 38vh;  
  padding: 10px;
  border-radius: 5px;
  backdrop-filter: blur(10px);

  & input {
    width: 200px;
    height: 25px;
    border-radius: 5px;
    border: none;
    padding-left: 5px;
  }

  & label {
    font-size: 22px
  }

  & button {
    background-color: #F57F02;
    color: #fff;
    border: none;
    border-radius: 5px;
    width: 100px;
    height: 28px;
  }

  & button:disabled {
    background-color: gray;
    color: #333;
  }

`;

export const HomeMealMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;
