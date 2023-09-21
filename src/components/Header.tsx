import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

type HeaderProps = {
  pageTitle: string,
  showSearchIcon?: boolean
};

function Header({ pageTitle, showSearchIcon = false } : HeaderProps) {
  return (
    <>
      <h1 data-testid="page-title">
        { pageTitle }
      </h1>
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Profile Icon"
      />
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
