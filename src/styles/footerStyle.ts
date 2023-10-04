import styled from 'styled-components';

export const Footer = styled.footer`
  background-color: #161616;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px;

  & a {
    text-decoration: none;
  }

  /* & img {
    width: 30px;
    height: 30px;
  } */

  & span {
    color: #fff;
  }
`;
