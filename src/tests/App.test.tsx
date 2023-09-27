import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { vi } from 'vitest';

import App from '../App';
import DoneRecipes from '../pages/DoneRecipes';
import Drinks from '../pages/Drinks';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import HomeMeal from '../pages/HomeMeal';
import Profile from '../pages/Profile';
import { renderWithRouter } from './helpers/renderWIth';
import { mockDrinksData, mockMealsData } from './helpers/mockData';
import RecipeAppContext from '../context/RecipeAppContext';
import { mockContext } from './helpers/contextMock';

const validEmail = 'email@valido.com';
const getPageTitle = 'page-title';
const footerDrinksRoute = 'drinks-bottom-btn';
const searchIconTestId = 'search-top-btn';
const searchBtnTestId = 'exec-search-btn';
const nameSearchRadioTestId = 'name-search-radio';
const searchInputTestId = 'search-input';

beforeEach(() => {
  vi.spyOn(global, 'fetch');
});

afterEach(() => {
  vi.restoreAllMocks();
});

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

    const searchIcon = screen.getByTestId(searchIconTestId);
    const profileIcon = screen.getByTestId('profile-top-btn');
    const AllCatBtn = screen.getByTestId('All-category-filter');
    const nameRadioBtn = screen.getByTestId(nameSearchRadioTestId);
    const searchBtn = screen.getByTestId(searchBtnTestId);

    expect(searchIcon).toBeInTheDocument();
    expect(nameRadioBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(AllCatBtn).toBeInTheDocument();
  });

  test('Testa se ao realizar uma pesquisa por nome, aparecem receitas relacionadas', async () => {
    renderWithRouter(
      <RecipeAppContext.Provider value={ mockContext }>
        <HomeMeal />
        ,
      </RecipeAppContext.Provider>,
    );
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockMealsData,
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    const searchIcon = screen.getByTestId(searchIconTestId);
    await userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchInputTestId);
    await userEvent.type(searchInput, 'Cor');
    const nameRadioBtn = screen.getByTestId(nameSearchRadioTestId);
    await userEvent.click(nameRadioBtn);
    const searchBtn = screen.getByTestId(searchBtnTestId);
    await userEvent.click(searchBtn);

    const corba = await screen.findByAltText('Corba');

    expect(corba).toBeInTheDocument();
  });

  test('Testa se os botões de filtro de meals são carregados na tela', async () => {
    renderWithRouter(
      <RecipeAppContext.Provider value={ mockContext }>
        <HomeMeal />
        ,
      </RecipeAppContext.Provider>,
    );

    const beefFilterBtn = screen.getByTestId('Beef-category-filter');
    const breakfastFilterBtn = screen.getByTestId('Breakfast-category-filter');
    const goatFilterBtn = screen.getByTestId('Breakfast-category-filter');
    const dessertFilterBtn = screen.getByTestId('Dessert-category-filter');
    const chickenFilterBtn = screen.getByTestId('Chicken-category-filter');

    expect(beefFilterBtn).toBeInTheDocument();
    expect(breakfastFilterBtn).toBeInTheDocument();
    expect(goatFilterBtn).toBeInTheDocument();
    expect(dessertFilterBtn).toBeInTheDocument();
    expect(chickenFilterBtn).toBeInTheDocument();
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

    const drinkRoute = screen.getByTestId(footerDrinksRoute);
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

  test('Testa se os filtros de Drinks são carregados corretamente', async () => {
    renderWithRouter(
      <RecipeAppContext.Provider value={ mockContext }>
        <Drinks />
        ,
      </RecipeAppContext.Provider>,
    );

    const ordinaryDrink = screen.getByTestId('Ordinary Drink-category-filter');
    const cocktail = screen.getByTestId('Cocktail-category-filter');
    const shake = screen.getByTestId('Shake-category-filter');
    const otherUnknown = screen.getByTestId('Other/Unknown-category-filter');
    const cocoa = screen.getByTestId('Cocoa-category-filter');

    expect(ordinaryDrink).toBeInTheDocument();
    expect(cocktail).toBeInTheDocument();
    expect(shake).toBeInTheDocument();
    expect(otherUnknown).toBeInTheDocument();
    expect(cocoa).toBeInTheDocument();
  });

  test('Testa se procurar pelo ingrediente "gin", aparece os drinks A1 e Ace', async () => {
    renderWithRouter(
      <RecipeAppContext.Provider value={ mockContext }>
        <Drinks />
        ,
      </RecipeAppContext.Provider>,
    );

    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockDrinksData,
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    const searchIcon = screen.getByTestId(searchIconTestId);
    await userEvent.click(searchIcon);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    await userEvent.click(ingredientRadio);
    const searchInput = screen.getByTestId(searchInputTestId);
    await userEvent.type(searchInput, 'gin');
    const searchBTN = screen.getByTestId(searchBtnTestId);
    await userEvent.click(searchBTN);

    const A1 = await screen.findByAltText(/a1/i);
    const Ace = await screen.findByAltText(/ace/i);

    expect(A1).toBeInTheDocument();
    expect(Ace).toBeInTheDocument();
  });

  test.only('Testa se procurar pelo nome A1, é redirecionado para a pagina de detalhes', async () => {
    renderWithRouter(
      <RecipeAppContext.Provider value={ mockContext }>
        <App />
        ,
      </RecipeAppContext.Provider>,
    );

    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockMealsData,
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, '1234567');
    await userEvent.click(loginBtn);

    const searchIcon = screen.getByTestId(searchIconTestId);
    await userEvent.click(searchIcon);
    const nameRadio = screen.getByTestId(nameSearchRadioTestId);
    await userEvent.click(nameRadio);
    const searchInput = screen.getByTestId(searchInputTestId);
    await userEvent.type(searchInput, 'Corba');
    const searchBTN = screen.getByTestId(searchBtnTestId);
    await userEvent.click(searchBTN);
    // VERIFICAR TESTE
    expect(await window.location.pathname).toBe(await '/meals/52977');
  });
});

describe('Testes referentes a FilterBar', () => {
  test('Testa para ver se os filtros estão sendo carregados', async () => {
    renderWithRouter(<HomeMeal />);
    const allFilterBtn = await screen.findByTestId('All-category-filter');

    expect(allFilterBtn).toBeInTheDocument();
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
    const drinksButton = screen.getByTestId(footerDrinksRoute);

    expect(footerElement).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
  });
});
