import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RecipeAppProvider from '../../context/RecipeAppProvider';
import RecipeAppContext, { RecipeAppContextType } from '../../context/RecipeAppContext';

// export const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
//   window.history.pushState({}, '', route);
//   return {
//     user: userEvent.setup(),
//     ...render(ui, { wrapper: BrowserRouter }),
//   };
// };

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
