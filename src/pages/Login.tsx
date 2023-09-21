import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInfoType } from '../types';
import { saveLocalStorage } from '../utils/functions';

function Login() {
  const initialUserInfo = {
    email: '',
    password: '',
  };
  const [userInfo, setUserInfo] = useState<UserInfoType>(initialUserInfo);
  const navigate = useNavigate(); // Importe useNavigate do React Router

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(userInfo.email);
  };

  const isPasswordValid = () => {
    if (userInfo.password) {
      return userInfo.password.length > 6;
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
    saveLocalStorage('user', { email: userInfo.email });
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
      <form onSubmit={ handleLoginSubmit }>
        <label htmlFor="email">E-mail</label>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          id="email"
          value={ userInfo.email }
          onChange={ handleChange }
        />
        <label htmlFor="password">Senha</label>
        <input
          data-testid="password-input"
          type="password"
          name="password"
          id="password"
          value={ userInfo.password }
          onChange={ handleChange }
        />
        <button
          data-testid="login-submit-btn"
          disabled={ !isEmailValid() || !isPasswordValid() }
        >
          Entrar
        </button>
      </form>
    </>
  );
}

export default Login;
