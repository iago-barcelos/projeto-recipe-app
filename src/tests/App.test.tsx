import React from 'react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import DoneRecipes from '../pages/DoneRecipes';
import Drinks from '../pages/Drinks';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Header from '../components/Header';
import HomeMeal from '../pages/HomeMeal';
import Profile from '../pages/Profile';
import SearchBar from '../components/SearchBar';
import { renderWithRouter } from './helpers/renderWIth';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const submitButtonTestId = 'login-submit-btn';
const pageTitleTestId = 'page-title';
const profileTopBtnTestId = 'profile-top-btn';
const searchTopBtnTestId = 'search-top-btn';
const searchInputTestId = 'search-input';
const validEmail = 'email@valido.com';
const profileIcon = 'Profile Icon';
const searchIcon = 'Search Icon';

// Mateus Tápias: Criei um renderWithRouter() para facilitar a legibilidade do código

test('Verifica se existe uma tela de login', () => {
  const { getByText } = renderWithRouter(<App />);

  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

test('Botão desativado se e-mail inválido', () => {
  const { getByTestId } = renderWithRouter(<App />);

  const emailInput = getByTestId(emailTestId);
  const passwordInput = getByTestId(passwordTestId);
  const submitButton = getByTestId(submitButtonTestId);

  userEvent.type(emailInput, 'emailInvalido');
  userEvent.type(passwordInput, 'senhaValida');

  expect(submitButton).toBeDisabled();
});

test('Botão desativado se Senha inválida', () => {
  const { getByTestId } = renderWithRouter(<App />);

  const emailInput = getByTestId(emailTestId);
  const passwordInput = getByTestId(passwordTestId);
  const submitButton = getByTestId(submitButtonTestId);

  userEvent.type(emailInput, validEmail);
  userEvent.type(passwordInput, '123');

  expect(submitButton).toBeDisabled();
});

test('Botão ativado se Senha válida', async () => {
  const { findByTestId } = renderWithRouter(<App />);

  const emailInput = await findByTestId(emailTestId);
  const passwordInput = await findByTestId(passwordTestId);
  const submitButton = await findByTestId(submitButtonTestId);

  await userEvent.type(emailInput, validEmail);
  await userEvent.type(passwordInput, 'senhaValidaAAA');
  await userEvent.click(submitButton);

  /* expect(await submitButton).toBeEnabled(); */
});

test('Botão desativado se Senha e Email inválido', () => {
  const { getByTestId } = renderWithRouter(<App />);

  const emailInput = getByTestId(emailTestId);
  const passwordInput = getByTestId(passwordTestId);
  const submitButton = getByTestId(submitButtonTestId);

  userEvent.type(emailInput, 'emailInvalido.com');
  userEvent.type(passwordInput, '123');

  expect(submitButton).toBeDisabled();
});

test('Botão desativa se for menor que 6', async () => {
  const { findByTestId } = renderWithRouter(<App />);

  const emailInput = await findByTestId(emailTestId);
  const passwordInput = await findByTestId(passwordTestId);
  const submitButton = await findByTestId(submitButtonTestId);

  await userEvent.type(emailInput, validEmail);
  await userEvent.type(passwordInput, 'senha');
  await userEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
});

test('Navega para homeMeal', async () => {
  const { findByTestId, getByRole } = renderWithRouter(<App />);

  const emailInput = await findByTestId(emailTestId);
  const passwordInput = await findByTestId(passwordTestId);
  const submitButton = await findByTestId(submitButtonTestId);

  await userEvent.type(emailInput, validEmail);
  await userEvent.type(passwordInput, 'senha123');
  await userEvent.click(submitButton);

  const homeMealText = await getByRole('heading', { name: /meals/i });

  expect(await homeMealText).toBeInTheDocument();
});

describe('Testa componente DoneRecipes', () => {
  test('Renderiza página com título certo', () => {
    const { getByTestId } = renderWithRouter(<DoneRecipes />);

    const pageTitleElement = getByTestId(pageTitleTestId);
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Done Recipes');
  });

  test('Não renderiza ícone de search', () => {
    const { queryByAltText } = renderWithRouter(<DoneRecipes />);

    const searchIconElement = queryByAltText(searchIcon);
    expect(searchIconElement).toBeNull();
  });
});

describe('Componente Drinks', () => {
  test('Renderiza a página com o endereço correto', () => {
    const { getByTestId } = renderWithRouter(<Drinks />);

    const pageTitleElement = getByTestId(pageTitleTestId);
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Drinks');
  });

  test('Renderiza o icone de pesquisa', () => {
    const { getByAltText } = renderWithRouter(<Drinks />);

    const searchIconElement = getByAltText(searchIcon);
    expect(searchIconElement).toBeInTheDocument();
  });
});

describe('Testa componente FavoriteRecipes', () => {
  test('Renderiza página com título devido', () => {
    const { getByTestId } = renderWithRouter(<FavoriteRecipes />);

    const pageTitleElement = getByTestId(pageTitleTestId);
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Favorite Recipes');
  });

  test('Não renderiza ícone de pesquisa', () => {
    const { queryByAltText } = renderWithRouter(<FavoriteRecipes />);

    const searchIconElement = queryByAltText(searchIcon);
    expect(searchIconElement).toBeNull();
  });
});

describe('Testando o component Header', () => {
  test('Renderiza pageTitle', () => {
    const { getByTestId } = renderWithRouter(<Header pageTitle="Test Title" />);

    const pageTitleElement = getByTestId(pageTitleTestId);
    expect(pageTitleElement).toBeInTheDocument();
  });

  test('Renderiza icone de profile', () => {
    const { getByAltText } = renderWithRouter(<Header pageTitle="Test Title" />);

    const profileIconElement = getByAltText(profileIcon);
    expect(profileIconElement).toBeInTheDocument();
  });

  test('Renderiza icone de pesquisa se showSearchIcon tiver valor true', () => {
    const { getByAltText } = renderWithRouter(<HomeMeal />);

    const searchIconElement = getByAltText(searchIcon);
    expect(searchIconElement).toBeInTheDocument();
  });

  test('Não renderiza icone de pesquisa se showSearchIcon tiver valor false', () => {
    const { queryByAltText } = renderWithRouter(<Header pageTitle="Test Title" />);

    const searchIconElement = queryByAltText(searchIcon);
    expect(searchIconElement).toBeNull();
  });

  test('Navega para "/profile" ao clicar no ícone de perfil', async () => {
    const { getByTestId } = renderWithRouter(<Header pageTitle="Test Title" />);

    const profileIconElement = getByTestId(profileTopBtnTestId);

    await userEvent.click(profileIconElement);

    expect(global.window.location.pathname).toBe('/profile');
    // const pageTitle = getByTestId(pageTitleTestId);
    // expect(pageTitle.innerHTML).toBe("Profile")
  });

  test('Renderiza o componente SearchBar ao clicar no ícone de pesquisa', async () => {
    const { queryByTestId, getByTestId } = renderWithRouter(<HomeMeal />);

    expect(queryByTestId(searchInputTestId)).toBeNull();

    const searchIconElement = getByTestId(searchTopBtnTestId);

    await userEvent.click(searchIconElement);

    expect(queryByTestId(searchInputTestId)).toBeInTheDocument();
  });
});

describe('Componente homeMeal', () => {
  test('Renderiza página com título correto', () => {
    const { getByTestId } = renderWithRouter(<HomeMeal />);

    const pageTitleElement = getByTestId(pageTitleTestId);
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Meals');
  });

  test('Renderiza ícone de pesquisa', () => {
    const { getByAltText } = renderWithRouter(<HomeMeal />);

    const searchIconElement = getByAltText(searchIcon);
    expect(searchIconElement).toBeInTheDocument();
  });
});

test('Renderiza a página HomeMeal com os radio buttons corretos', () => {
  const { getByTestId } = renderWithRouter(<HomeMeal />);
  const ingredientRadio = getByTestId('ingredient-search-radio');
  const nameRadio = getByTestId('name-search-radio');
  const firstLetterRadio = getByTestId('first-letter-search-radio');

  expect(ingredientRadio).toBeInTheDocument();
  expect(nameRadio).toBeInTheDocument();
  expect(firstLetterRadio).toBeInTheDocument();
});

test('Renderiza a página HomeMeal com o botão de busca', () => {
  const { getByTestId } = renderWithRouter(<HomeMeal />);
  const execSearchButton = getByTestId('exec-search-btn');
  expect(execSearchButton).toBeInTheDocument();
});

describe('Componente Profile', () => {
  test('Renderiza página com título correto', () => {
    const { getByTestId } = renderWithRouter(<Profile />);

    const pageTitleElement = getByTestId(pageTitleTestId);
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Profile');
  });

  test('Não renderiza ícone de pesquisa', () => {
    const { queryByAltText } = renderWithRouter(<Profile />);

    const searchIconElement = queryByAltText(searchIcon);
    expect(searchIconElement).toBeNull();
  });
});

describe('Testes do SearchBar', () => {
  test('Renderiza o componente SearchBar com os radio buttons corretos', () => {
    const { getByTestId } = renderWithRouter(<HomeMeal />);
    const ingredientRadio = getByTestId('ingredient-search-radio');
    const nameRadio = getByTestId('name-search-radio');
    const firstLetterRadio = getByTestId('first-letter-search-radio');

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });

  test('Renderiza o componente SearchBar com o botão de busca', () => {
    const { getByTestId } = renderWithRouter(<HomeMeal />);
    const execSearchButton = getByTestId('exec-search-btn');
    expect(execSearchButton).toBeInTheDocument();
  });

  test('Testa para ver se é possivel digitar no input de busca', async () => {
    const { getByRole } = renderWithRouter(<HomeMeal />);

    const screenSearchIcon = getByRole('img', { name: /search icon/i });
    await userEvent.click(screenSearchIcon);

    const searchInput = getByRole('textbox');
    await userEvent.type(searchInput, 'apple');
  });

  test('Testa para ver se é possivel clicar nos radio buttons', async () => {
    const { getByText } = renderWithRouter(<HomeMeal />);

    const ingredientsRadioButton = getByText(/ingredient/i);
    await userEvent.click(ingredientsRadioButton);

    const nameRadioButton = getByText(/name/i);
    await userEvent.click(nameRadioButton);

    const firstLetterRadioButton = getByText(/first letter/i);
    await userEvent.click(firstLetterRadioButton);
  });

  test('Testa para ver se é possivel clicar nos radio buttons', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const { getByText, getByRole } = renderWithRouter(<HomeMeal />);

    const firstLetterRadioButton = getByText(/first letter/i);
    await userEvent.click(firstLetterRadioButton);

    const screenSearchIcon = getByRole('img', { name: /search icon/i });
    await userEvent.click(screenSearchIcon);

    const searchInput = getByRole('textbox');
    await userEvent.type(searchInput, 'aa');

    const searchBTN = getByText(/Search/i);
    await userEvent.click(searchBTN);
    expect(alertSpy).toHaveBeenCalled();
  });

  test('Testa se o fetch é feito quando o botão de busca é click*', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue({} as Response);
    const { getByText, getByRole } = renderWithRouter(<HomeMeal />);

    const screenSearchIcon = getByRole('img', { name: /search icon/i });
    await userEvent.click(screenSearchIcon);

    const searchInput = getByRole('textbox');
    await userEvent.type(searchInput, 'aa');

    const searchBTN = getByText(/Search/i);
    await userEvent.click(searchBTN);

    expect(mockFetch).toHaveBeenCalled();
  });

  test('Testa se aparece um erro ao procurar um ingrediente sem digitar nada*', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const { getByText } = renderWithRouter(<HomeMeal />);

    const searchBTN = getByText(/Search/i);
    await userEvent.click(searchBTN);

    expect(alertSpy).toHaveBeenCalled();
  });
});
