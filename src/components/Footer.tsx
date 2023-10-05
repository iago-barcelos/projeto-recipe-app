import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import * as S from '../styles/footer';

function Footer() {
  return (
    <S.Footer data-testid="footer">
      <Link to="/meals">
        {/* <img
          src={ mealIcon }
          alt="Meals Icon"
          data-testid="meals-bottom-btn"

        /> */}
        <span
          className="material-icons"
          data-testid="meals-bottom-btn"
        >
          restaurant_menu
        </span>
      </Link>
      <Link to="/drinks">
        {/* <img
          src={ drinkIcon }
          alt="Drinks Icon"
          data-testid="drinks-bottom-btn"

        /> */}
        <span
          className="material-icons"
          data-testid="drinks-bottom-btn"
        >
          local_bar
        </span>
      </Link>
    </S.Footer>
  );
}

export default Footer;
