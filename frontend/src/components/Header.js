import logo from '../../src/images/logo.svg';
import React from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { logout } from '../utils/auth';

function Header({ onLogOut, userEmail }) {

  const history = useHistory();

  const logOut = async () => {
    await logout();
    onLogOut(false)
    history.push("/signin")
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="место Россия" className="header__logo" />
      </Link>
      <Switch>
        <Route path="/signup">
          <Link to="/signin" className="header__link">Войти</Link>
        </Route>
        <Route path="/signin">
          <Link to="/signup" className="header__link">Регистрация</Link>
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