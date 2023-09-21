import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testa componente FavoriteRecipes', () => {
  test('Renderiza página com título correto', () => {
    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );

    const pageTitleElement = screen.getByTestId('page-title');
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Favorite Recipes');
  });

  test('Não renderiza ícone de pesquisa', () => {
    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );

    const searchIconElement = screen.queryByAltText('Search Icon');
    expect(searchIconElement).toBeNull();
  });
});
