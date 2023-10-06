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

export const ProfileMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: #000;
  background-color: #F7EFE4;

  & header {
    justify-content: center;
    margin-bottom: 10%;
    margin-top: -30%;

    & button {
      display: none;
    }
  }  
`;

export const BtnContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & button {
    margin: 5px;        
  }
`;

export const ProfileInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & #imgContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    max-width: 180px;
    max-height: 180px;
    margin-bottom: 20px;
  }

  & #editImg {
    background-color: green;
    margin-left: 10px;    
  }

  & input {
    width: 200px;
  }

  & #imgContainer img {
    max-width: 180px;
    max-height: 180px;
    border: 1px solid #000;
    padding: 2px;
  }

  & p {
    font-size: 20px;    
  }
`;
