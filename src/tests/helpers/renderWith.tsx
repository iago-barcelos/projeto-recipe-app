import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RecipeAppContext, { RecipeAppContextType } from '../../context/RecipeAppContext';

export const renderWithRouterAndContext = (
  ui: JSX.Element,
  // { route = '/' } = {},
  route = '/',
  { initialContext = {} as RecipeAppContextType } = {},
) => {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(
      <RecipeAppContext.Provider value={ initialContext }>
        <MemoryRouter initialEntries={ [route] }>
          {ui}
        </MemoryRouter>
        ,
      </RecipeAppContext.Provider>,
    ),
  };
};
