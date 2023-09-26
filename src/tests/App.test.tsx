import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, within } from '@testing-library/dom';
import { vi } from 'vitest';

import App from '../App';
import DoneRecipes from '../pages/DoneRecipes';
import Drinks from '../pages/Drinks';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Header from '../components/Header';
import HomeMeal from '../pages/HomeMeal';
import Profile from '../pages/Profile';
import { renderWithRouter } from './helpers/renderWIth';
import { mockDrinksData, mockMealsData } from './helpers/mockData';

const validEmail = 'email@valido.com';
const getPageTitle = 'page-title';

describe('Testes da página de Login', () => {
  test('Testa para ver se existe uma página de Login', () => {
    renderWithRouter(<App />);

    const loginTitle = screen.getByRole('heading', { name: /login/i });

    expect(loginTitle).toBeInTheDocument();
  });

  test('Testa para ver se, ao carregar a página, o botão "Entrar" está desabilitado', () => {
    renderWithRouter(<App />);

    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(loginBtn).toBeDisabled();
  });

  test('Testa para ver se ao digitar um e-mail valido e uma senha válida, o botão é habilitado', async () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, '1234567');
    await userEvent.click(loginBtn);

    const mealsTitle = screen.getByTestId(getPageTitle);

    expect(mealsTitle).toBeInTheDocument();
  });
});

describe('Testes referentes a HomeMeal', () => {
  test('Testa se ao entrar na pagina Meals, aparece a SearchBar', () => {
    renderWithRouter(<HomeMeal />);

    const searchIcon = screen.getByTestId('search-top-btn');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const AllCatBtn = screen.getByTestId('All-category-filter');
    const nameRadioBtn = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    expect(searchIcon).toBeInTheDocument();
    expect(nameRadioBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(AllCatBtn).toBeInTheDocument();
  });

  test('Testa se ao entrar na pagina HomeMeals, aparece uma receita na tela', async () => {
    renderWithRouter(<HomeMeal />);

    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockMealsData,
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    const firstRecipe = await screen.findByTestId('0-recipe-card');

    expect(firstRecipe).toBeInTheDocument();
  });
});
describe('Testes referentes a Drinks', () => {
  test('Testa se ao entrar na página Drinks, o título aparece na tela', () => {
    renderWithRouter(<Drinks />);

    const drinksHeader = screen.getByRole('heading', { name: /drinks/i });

    expect(drinksHeader).toBeInTheDocument();
  });

  test('Testa se ao entrar na página Drinks, aparece um Drink', async () => {
    renderWithRouter(<HomeMeal />);

    const drinkRoute = screen.getByTestId('drinks-bottom-btn');
    await userEvent.click(drinkRoute);

    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockDrinksData,
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    const firstRecipe = await screen.findByTestId('0-recipe-card');

    expect(firstRecipe).toBeInTheDocument();
  });

  test('Testa se procurar pelo ingrediente "ice", aparece o drink GG', async () => {
    renderWithRouter(<HomeMeal />);

    const drinkRoute = screen.getByTestId('drinks-bottom-btn');
    await userEvent.click(drinkRoute);

    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockDrinksData,
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    const searchIcon = screen.getByTestId('search-top-btn');
    await userEvent.click(searchIcon);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    await userEvent.click(ingredientRadio);
    const searchInput = screen.getByTestId('search-input');
    await userEvent.type(searchInput, 'ice');
    const searchBTN = screen.getByTestId('exec-search-btn');
    await userEvent.click(searchBTN);

    const GG = await screen.findByText(/gg/i);

    expect(GG).toBeInTheDocument();
  });
});

describe('Testes referentes a Done Recipes', () => {
  test('Testa para ver se existe titulo na página', () => {
    renderWithRouter(<DoneRecipes />);
    const pageTitle = screen.getByText('Done Recipes');

    expect(pageTitle).toBeInTheDocument();
  });
});

describe('Testes referentes a Favorite Recipes', () => {
  test('Testa para ver se existe titulo na página', () => {
    renderWithRouter(<FavoriteRecipes />);
    const pageTitle = screen.getByText('Favorite Recipes');

    expect(pageTitle).toBeInTheDocument();
  });
});

describe('Profile', () => {
  test('Renderiza página de perfil com título correto', () => {
    renderWithRouter(<Profile />);

    const pageTitleElement = screen.getByTestId(getPageTitle);
    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Profile');
  });

  test('Não renderiza ícone de pesquisa no perfil', () => {
    renderWithRouter(<Profile />);

    const searchIconElement = screen.queryByAltText('Search Icon');
    expect(searchIconElement).toBeNull();
  });

  test('Renderiza página com título correto e e-mail visível', () => {
    localStorage.setItem('userEmail', validEmail);

    renderWithRouter(<Profile />);

    const pageTitleElement = screen.getByTestId(getPageTitle);
    const emailElement = screen.getByTestId('profile-email');

    expect(pageTitleElement).toBeInTheDocument();
    expect(pageTitleElement.textContent).toBe('Profile');

    expect(emailElement).toBeInTheDocument();
    expect(emailElement.textContent).toBe('email@mail.com');
  });

  test('Verifica data-testid dos botões', () => {
    renderWithRouter(<Profile />);

    const doneButton = screen.getByTestId('profile-done-btn');
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    const logoutButton = screen.getByTestId('profile-logout-btn');

    expect(doneButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});

describe('Testes referentes ao Footer', () => {
  test('Renderiza corretamente', () => {
    renderWithRouter(<HomeMeal />);

    const footerElement = screen.getByTestId('footer');
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    const drinksButton = screen.getByTestId('drinks-bottom-btn');

    expect(footerElement).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
  });
});
