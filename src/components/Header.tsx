import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';

type HeaderProps = {
  pageTitle: string,
};

function Header({ pageTitle }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <>
      <h1 data-testid="page-title">
        {pageTitle}
      </h1>
      <button
        onClick={ () => navigate('/profile') }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile Icon"
        />
      </button>
    </>
  );
}

export default Header;
