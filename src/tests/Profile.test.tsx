import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../pages/Profile';

describe('Componente Profile', () => {
  test('Renderiza página com título correto', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>,
    );

    const pageTitleElement = screen.getByTestId('page-title');
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Profile');
  });

  test('Não renderiza ícone de pesquisa', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>,
    );

    const searchIconElement = screen.queryByAltText('Search Icon');
    expect(searchIconElement).toBeNull();
  });
});
