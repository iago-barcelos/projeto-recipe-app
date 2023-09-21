import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomeMeal from '../pages/HomeMeal';

describe('Componente homeMeal', () => {
  test('Renderiza página com título correto', () => {
    render(
      <BrowserRouter>
        <HomeMeal />
      </BrowserRouter>,
    );

    const pageTitleElement = screen.getByTestId('page-title');
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Meals');
  });

  test('Renderiza ícone de pesquisa', () => {
    render(
      <BrowserRouter>
        <HomeMeal />
      </BrowserRouter>,
    );

    const searchIconElement = screen.getByAltText('Search Icon');
    expect(searchIconElement).toBeInTheDocument();
  });
});
