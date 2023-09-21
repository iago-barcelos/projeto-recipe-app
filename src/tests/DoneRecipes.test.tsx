import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DoneRecipes from '../pages/DoneRecipes';

describe('Testa componente DoneRecipes', () => {
  test('Renderiza página com título correto', () => {
    render(
      <BrowserRouter>
        <DoneRecipes />
      </BrowserRouter>,
    );

    const pageTitleElement = screen.getByTestId('page-title');
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Done Recipes');
  });

  test('Não renderiza ícone de pesquisa', () => {
    render(
      <BrowserRouter>
        <DoneRecipes />
      </BrowserRouter>,
    );

    const searchIconElement = screen.queryByAltText('Search Icon');
    expect(searchIconElement).toBeNull();
  });
});
