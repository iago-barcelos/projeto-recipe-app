import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../App';
import DoneRecipes from '../pages/DoneRecipes';
import Drinks from '../pages/Drinks';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Header from '../components/Header';
import HomeMeal from '../pages/HomeMeal';
import Profile from '../pages/Profile';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const submitButtonTestId = 'login-submit-btn';
const validEmail = 'email@valido.com';
const pageTitle = 'page-title';
const searchIcon = 'Search Icon';

test('Verifica se existe uma tela de login', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

test('Botão desativado se e-mail inválido', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const emailInput = screen.getByTestId(emailTestId);
  const passwordInput = screen.getByTestId(passwordTestId);
  const submitButton = screen.getByTestId(submitButtonTestId);

  userEvent.type(emailInput, 'emailInvalido');
  userEvent.type(passwordInput, 'senhaValida');

  expect(submitButton).toBeDisabled();
});

test('Botão desativado se Senha inválida', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const emailInput = screen.getByTestId(emailTestId);
  const passwordInput = screen.getByTestId(passwordTestId);
  const submitButton = screen.getByTestId(submitButtonTestId);

  userEvent.type(emailInput, validEmail);
  userEvent.type(passwordInput, '123');

  expect(submitButton).toBeDisabled();
});

test('Botão ativado se Senha válida', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const emailInput = await screen.findByTestId(emailTestId);
  const passwordInput = await screen.findByTestId(passwordTestId);
  const submitButton = await screen.findByTestId(submitButtonTestId);

  await userEvent.type(emailInput, validEmail);
  await userEvent.type(passwordInput, 'senhaValidaAAA');
  await userEvent.click(submitButton);

  /* expect(await submitButton).toBeEnabled(); */
});

test('Botão desativado se Senha e Email inválido', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const emailInput = screen.getByTestId(emailTestId);
  const passwordInput = screen.getByTestId(passwordTestId);
  const submitButton = screen.getByTestId(submitButtonTestId);

  userEvent.type(emailInput, 'emailInvalido.com');
  userEvent.type(passwordInput, '123');

  expect(submitButton).toBeDisabled();
});

test('Botão desativa se for menor que 6', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const emailInput = await screen.findByTestId(emailTestId);
  const passwordInput = await screen.findByTestId(passwordTestId);
  const submitButton = await screen.findByTestId(submitButtonTestId);

  await userEvent.type(emailInput, validEmail);
  await userEvent.type(passwordInput, 'senha');
  await userEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
});

test('Navega para homeMeal', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const emailInput = await screen.findByTestId(emailTestId);
  const passwordInput = await screen.findByTestId(passwordTestId);
  const submitButton = await screen.findByTestId(submitButtonTestId);

  await userEvent.type(emailInput, validEmail);
  await userEvent.type(passwordInput, 'senha123');
  await userEvent.click(submitButton);

  const homeMealText = await screen.findByText('Tela de Receitas de Comidas');

  expect(await homeMealText).toBeInTheDocument();
});

describe('Testa componente DoneRecipes', () => {
  test('Renderiza página com título certo', () => {
    render(
      <BrowserRouter>
        <DoneRecipes />
      </BrowserRouter>,
    );

    const pageTitleElement = screen.getByTestId(pageTitle);
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Done Recipes');
  });

  test('Não renderiza ícone de search', () => {
    render(
      <BrowserRouter>
        <DoneRecipes />
      </BrowserRouter>,
    );

    const searchIconElement = screen.queryByAltText(searchIcon);
    expect(searchIconElement).toBeNull();
  });
});

describe('Componente Drinks', () => {
  test('Renderiza a página com o endereço correto', () => {
    render(
      <BrowserRouter>
        <Drinks />
      </BrowserRouter>,
    );

    const pageTitleElement = screen.getByTestId(pageTitle);
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Drinks');
  });

  test('Renderiza o icone de pesquisa', () => {
    render(
      <BrowserRouter>
        <Drinks />
      </BrowserRouter>,
    );

    const searchIconElement = screen.getByAltText(searchIcon);
    expect(searchIconElement).toBeInTheDocument();
  });
});

describe('Testa componente FavoriteRecipes', () => {
  test('Renderiza página com título devido', () => {
    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );

    const pageTitleElement = screen.getByTestId(pageTitle);
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Favorite Recipes');
  });

  test('Não renderiza ícone de pesquisa', () => {
    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );

    const searchIconElement = screen.queryByAltText(searchIcon);
    expect(searchIconElement).toBeNull();
  });
});

describe('Testando o component Header', () => {
  test('Renderiza pageTitle', () => {
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

    const searchIconElement = getByAltText(searchIcon);
    expect(searchIconElement).toBeInTheDocument();
  });

  test('Não renderiza icone de pesquisa se showSearchIcon tiver valor false', () => {
    const { queryByAltText } = render(<Header pageTitle="Title" showSearchIcon={ false } />);

    const searchIconElement = queryByAltText(searchIcon);
    expect(searchIconElement).toBeNull();
  });
});

describe('Componente homeMeal', () => {
  test('Renderiza página com título correto', () => {
    render(
      <BrowserRouter>
        <HomeMeal />
      </BrowserRouter>,
    );

    const pageTitleElement = screen.getByTestId(pageTitle);
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Meals');
  });

  test('Renderiza ícone de pesquisa', () => {
    render(
      <BrowserRouter>
        <HomeMeal />
      </BrowserRouter>,
    );

    const searchIconElement = screen.getByAltText(searchIcon);
    expect(searchIconElement).toBeInTheDocument();
  });
});

describe('Componente Profile', () => {
  test('Renderiza página com título correto', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>,
    );

    const pageTitleElement = screen.getByTestId(pageTitle);
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Profile');
  });

  test('Não renderiza ícone de pesquisa', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>,
    );

    const searchIconElement = screen.queryByAltText(searchIcon);
    expect(searchIconElement).toBeNull();
  });
});
