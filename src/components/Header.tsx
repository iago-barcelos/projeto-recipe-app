import { useNavigate } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

type HeaderProps = {
  pageTitle: string,
  showSearchIcon?: boolean
};

function Header({ pageTitle, showSearchIcon = false }: HeaderProps) {
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
      {showSearchIcon
        && <img
          src={ searchIcon }
          alt="Search Icon"
          data-testid="search-top-btn"
        />}
    </>
  );
}

export default Header;
