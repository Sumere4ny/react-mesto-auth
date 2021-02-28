import React from "react";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!password || !email) {
      return;
    }
    props.onSubmit(password, email);
    setEmail('');
    setPassword('');
  }

  return (
    <main className="content">
      <section className="auth">
        <form className="auth-form"
              onSubmit={handleSubmit}
        >
          <h2 className="auth-form__title">Вход</h2>
          <input
            type="email"
            placeholder="Email"
            className="auth-form__input"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            className="auth-form__input"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button type="submit"
                  className="auth-form__submit"
                  value="loggedIn"          >
            Войти
          </button>
        </form>

        <p className="auth__redirect">
          Ещё не зарегистрированы? {<Link to="/sign-up" 
            className="link">
            Регистриация
          </Link>}
        </p>
      </section>
    </main>
  )
}