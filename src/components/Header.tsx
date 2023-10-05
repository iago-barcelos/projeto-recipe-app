import { useNavigate } from 'react-router-dom';
import * as S from '../styles/meals&Drinks';

type HeaderProps = {
  pageTitle: string,
};

function Header({ pageTitle }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <S.Header>
      <button
        data-testid="profile-top-btn"
        onClick={ () => navigate('/profile') }
        className="material-icons"
      >
        person
      </button>
      <h1 data-testid="page-title">
        {pageTitle}
      </h1>
    </S.Header>
  );
}

export default Header;
