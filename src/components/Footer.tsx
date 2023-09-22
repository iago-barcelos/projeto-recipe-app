import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  const footerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '50px',
  };

  const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
  };

  const iconStyle: React.CSSProperties = {
    width: '30px',
    height: '30px',
  };

  return (
    <footer data-testid="footer" style={ footerStyle }>
      <Link to="/meals" style={ linkStyle }>
        <img
          src={ mealIcon }
          alt="Meals Icon"
          data-testid="meals-bottom-btn"
          style={ iconStyle }
        />
      </Link>
      <Link to="/drinks" style={ linkStyle }>
        <img
          src={ drinkIcon }
          alt="Drinks Icon"
          data-testid="drinks-bottom-btn"
          style={ iconStyle }
        />
      </Link>
    </footer>
  );
}

export default Footer;
