import React from "react";
import Logo from "../../assets/logo.png";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
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
          <li className="mx-1">
            <Link to="/chat">
              Chat
            </Link>
          </li>
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
    <header className="flex-row px-1">
        <Link to="/">
        <span className="logo">
      <a href="/">
        <img src={Logo} height="40" width="180" alt="text here" /></a>
    </span>
        </Link>
      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
