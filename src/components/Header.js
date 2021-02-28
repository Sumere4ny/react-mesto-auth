import logo from '../images/logo.svg';

import { NavLink, Route } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Место" />
      <nav className="header__nav">
        <Route path="/sign-up">
          <NavLink to='/sign-in' className="link header__nav-link">Войти</NavLink>
        </Route>
        <Route path="/sign-in">
          <NavLink to='/sign-up' className="link header__nav-link">Зарегистрироваться</NavLink>
        </Route>
        {props.isLoggedIn && (<Route path="/">
          <p className="header__user-info">{props.user}</p>
          <button onClick={props.onLogout} className="link header__nav-link">Выйти</button>
        </Route>)}
      </nav>
    </header>
  )
}

export default Header