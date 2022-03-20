import logo from '../../src/images/logo.svg';
import React from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

function Header({ onLogOut, userEmail }) {

  const history = useHistory();

  const logOut = () => {
    localStorage.removeItem('jwt')
    onLogOut(false)
    history.push("/sign-in")
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="место Россия" className="header__logo" />
      </Link>
      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/">
          <div className="header__info">
            <p className="header__email">{ userEmail }</p>
            <button className="header__link" type="button" onClick={ logOut } >
              Выйти
            </button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;