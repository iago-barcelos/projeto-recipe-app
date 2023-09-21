import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const submitButtonTestId = 'login-submit-btn';
const validEmail = 'email@valido.com';

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
