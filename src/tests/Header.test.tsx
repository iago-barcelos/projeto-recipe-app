import React from 'react';
import { render } from '@testing-library/react';
import Header from '../components/Header';

describe('Testando o component Header', () => {
  test('Renderiza pageTitle', () => {
    const pageTitle = 'Page Title';
    const { getByText } = render(<Header pageTitle={ pageTitle } />);

    const pageTitleElement = getByText(pageTitle);
    expect(pageTitleElement).toBeInTheDocument();
  });

  test('Renderiza icone de profile', () => {
    const { getByAltText } = render(<Header pageTitle="Title" />);

    const profileIconElement = getByAltText('Profile Icon');
    expect(profileIconElement).toBeInTheDocument();
  });

  test('Renderiza icone de pesquisa se showSearchIcon tiver valor true', () => {
    const { getByAltText } = render(<Header pageTitle="Title" showSearchIcon />);

    const searchIconElement = getByAltText('Search Icon');
    expect(searchIconElement).toBeInTheDocument();
  });

  test('Não renderiza icone de pesquisa se showSearchIcon tiver valor false', () => {
    const { queryByAltText } = render(<Header pageTitle="Title" showSearchIcon={ false } />);

    const searchIconElement = queryByAltText('Search Icon');
    expect(searchIconElement).toBeNull();
  });
});
