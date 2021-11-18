import React from "react";
import Logo from "../../assets/logo.png";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
<<<<<<< HEAD
        <ul className="flex-row ">
=======
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/profile">
              Profile
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/gitusers">
              Git Users
            </Link>
          </li>
>>>>>>> 8c876f46e89b33bf0b98aa49ee94fc06a449059a
          <li className="mx-1">
            <Link to="/" onClick={() => Auth.logout()}>
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="px-1">
        <Link to="/">
        <img className="logo" src={Logo} height="40" width="180" alt="logo" />
        </Link>
      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
