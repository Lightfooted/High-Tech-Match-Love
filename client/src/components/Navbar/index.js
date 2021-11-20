import React from "react";
import Logo from "../../assets/logo.png";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Navbar = () => {
    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <div>
                    <Link to="/profile">Profile</Link>
                    <Link to="/gitusers">Explore</Link>
                    <Link to="/findmatch">Find-match</Link>
                    <Link to="/chat">Chat</Link>
                    <Link to="/" onClick={() => Auth.logout()}>Logout</Link>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to="/signup">Signup</Link>
                    <Link to="/login">Login</Link>
                </div>
            );
        }
    }

    return (
        <Nav className="flex-row px-1">
            <Link to="/">
                <span className="logo">
                    <img src={Logo} height="40" width="180" alt="text here" />
                </span>
            </Link>
            <Hamburger>
                <span />
                <span />
                <span />
                <span />
            </Hamburger>
            <Menu>
                {showNavigation()}
            </Menu>
        </Nav>
    );
}

const Nav = styled.div`
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
`;

const Hamburger = styled.div``;

const Menu = styled.div``;

// const MenuLink = styled.div``;

export default Navbar;