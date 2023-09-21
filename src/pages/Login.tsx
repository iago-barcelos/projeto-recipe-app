function Login() {
  return (
    <>
      <header>
        <h1>Login</h1>
      </header>
      <form>
        <label htmlFor="email">E-mail</label>
        <input data-testid="email-input" type="email" name="email" id="email" />
        <label htmlFor="password">Senha</label>
        <input
          data-testid="password-input"
          type="password"
          name="password"
          id="password"
        />
        <button data-testid="login-submit-btn">Enter</button>
      </form>
    </>
  );
}

export default Login;
