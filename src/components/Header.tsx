import { useNavigate, Link } from 'react-router-dom';
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
      <Link to="/meals">Meals</Link>
      <Link to="/drinks">Drinks</Link>
      <Link to="/done-recipes">Done Recipes</Link>
    </>
  );
}

export default Header;
