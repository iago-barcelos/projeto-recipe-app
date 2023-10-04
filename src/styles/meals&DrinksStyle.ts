import styled from 'styled-components';

export const Button = styled.button`
  background-color: #F57F02;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 28px;
  transition: 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 52%;
  padding: 1rem;
  height: 60px;

  @media (max-width: 1176px) {
    width: 55%
  }

  @media (max-width: 886px) {
    width: 58%
  }

  @media (max-width: 606px) {
    width: 62%
  }

  @media (max-width: 438px) {
    width: 68%
  }

  & h1 {
    margin-top: 10px;
    font-size: 40px;
    font-family: 'Satisfy', cursive;
    text-align: center;   
  } 

  & button {
    background-color: transparent;
    border: none;
    color: #F57F02;
    font-size: 40px;
  }
`;

export const HomeMealMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100%;  
  background-image: url('../src/images/styleImages/homeMealBG.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  width: 100%;
  backdrop-filter: blur(8px);
  box-shadow: 2px 2px 6px 0.5px #000;
`;

export const MainNav = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;  
  padding: 8px;

  & #burgerMenu {       
    font-size: 40px;
    border: none;
    background-color: transparent;

    &:hover {
      cursor: pointer;
      color: #fff;
    }    
  }
`;

export const RecipeContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center; 
  align-items: center;

  & div {
    margin: 8px;
    text-align: center;
  }

  & a {
    text-decoration: none;
    color: #000;
    font-size: 20px;
  }

  & img {
    width: 130px;
    height: 130px;
    border-radius: 5px;  
  }  
`;

export const RecipeCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SearchBar = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;  
  color: #000;  
  border-radius: 5px;
`;

export const SearchInputContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;

  & button {
    background-color: transparent;
    border: none;
    transition: 0.3s ease;
    width: 100px;

    &:hover {
      transform: scale(1.2);
    }
  }

  & input {
    border-radius: 5px;
    border: none;
    padding-left: 8px;
  }
`;

export const SearchRadioBtnContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%;
`;

export const Drinks = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url('../src/images/styleImages/drinksBG.jpg');
  background-position: center;
  background-size: cover;  
`;

export const FilterBar = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  align-items: center;  
`;

export const CategoryBtn = styled.button`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px 20px;
  background-color: transparent;
  border: none;
  transition: 0.3s ease;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  & img {
    width: 45px;
    height: 45px;
  }
`;
