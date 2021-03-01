import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSubmit(password, email);
    setPassword('');
  }

  return (
    <main>
      <section className="auth">
      <h2 className="auth-form__title">Регистрация</h2>
        <form className="auth-form"
              onSubmit={handleSubmit}
        >
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
          >
            Зарегистрироваться
          </button>
        </form>

        <p className="auth__redirect">
          Уже зарегистрированы? {<Link to="/sign-in"
            className="link">
            Войти
          </Link>}
        </p>
      </section>
    </main>
  )
}

export default Register
