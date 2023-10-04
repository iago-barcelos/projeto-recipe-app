import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInfoType } from '../types';
import { saveUserInLocalStorage } from '../utils/functions';
import * as S from '../styles/style';

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
    saveUserInLocalStorage('user', { email: userInfo.email });
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmailValid() && isPasswordValid()) {
      navigate('/meals');
    }
  };

  return (
    <S.Main>
      <S.Header>
        <h1>MyRecipe App</h1>
      </S.Header>
      <S.Form onSubmit={ handleLoginSubmit }>
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
        <S.Button
          data-testid="login-submit-btn"
          disabled={ !isEmailValid() || !isPasswordValid() }
        >
          Entrar
        </S.Button>
      </S.Form>
    </S.Main>
  );
}

export default Login;
