import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Drinks from '../pages/Drinks';

describe('Componente Drinks', () => {
  test('Renderiza a página com o endereço correto', () => {
    render(
      <BrowserRouter>
        <Drinks />
      </BrowserRouter>,
    );

    const pageTitleElement = screen.getByTestId('page-title');
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Drinks');
  });

  test('Renderiza o icone de pesquisa', () => {
    render(
      <BrowserRouter>
        <Drinks />
      </BrowserRouter>,
    );

    const searchIconElement = screen.getByAltText('Search Icon');
    expect(searchIconElement).toBeInTheDocument();
  });
});
