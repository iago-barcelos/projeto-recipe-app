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
  }
`;

export const RecipeContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 95vh;
  justify-content: center; 
  align-items: center;  

  & a {
    text-decoration: none;
    color: #000;
    font-size: 20px;
  } 

  & button {
    border: none;
    background-color: transparent;    
    font-size: 60px;
    color: #000;    
  } 

  & #homeContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & #cardContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  } 
`;

export const RecipeCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  
  
  margin: 8px;
  text-align: center;
  word-wrap: break-word;
  box-shadow: 1px 1px 1px 1px #000;
  width: 130px;
  min-height: 190px;

  & img {
    width: 130px;
    height: 130px;
    border-radius: 5px 5px 0 0;  
    border-bottom: 1px solid #000;
  }

  & #titleContainer {
    display: flex;
    flex-direction: column;         
    justify-content: center;
    min-height: 60px;
    align-items: center;
    font-size: 22px;
    font-weight: bold;
    font-family: 'Oooh Baby', cursive;   
  }
`;

export const SearchBar = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  color: #000;  
  border-radius: 5px;
  margin-top: -10px;
`;

export const SearchInputContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 8px;  
 
  & input {
    width: 230px;
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

  & input {
    margin-right: 10px;
  }

  & label {
    font-size: 18px;
    margin-left: 2px;    
  }
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

  & img {
    width: 45px;
    height: 45px;
  }
`;
