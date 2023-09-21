import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Importe useNavigate do React Router

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = () => {
    return password.length > 6;
  };

  const handleEmailChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handlePasswordChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleLoginSubmit = () => {
    if (isEmailValid() && isPasswordValid()) {
      navigate('/meals');
    }
  };

  return (
    <>
      <header>
        <h1>Login</h1>
      </header>
      <form>
        <label htmlFor="email">E-mail</label>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          id="email"
          value={ email }
          onChange={ handleEmailChange }
        />
        <label htmlFor="password">Senha</label>
        <input
          data-testid="password-input"
          type="password"
          name="password"
          id="password"
          value={ password }
          onChange={ handlePasswordChange }
        />
        <button
          data-testid="login-submit-btn"
          disabled={ !isEmailValid() || !isPasswordValid() }
          onClick={ handleLoginSubmit }
        >
          Entrar
        </button>
      </form>
    </>
  );
}

export default Login;
