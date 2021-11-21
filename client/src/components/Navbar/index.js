import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import styled from 'styled-components';



const Navbar = () => {
    

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <Menu>
                    <Link className="my-1" to="/profile">
                        <MenuLink>Profile</MenuLink>
                    </Link>
                    <Link className="my-1" to="/gitusers">
                        <MenuLink>Explore</MenuLink>
                    </Link>
                    <Link className="my-1" to="/findmatch">
                        <MenuLink>Find-match</MenuLink>
                    </Link>
                    <Link className="my-1" to="/chat">
                        <MenuLink>Chat</MenuLink>
                    </Link>
                    <Link className="my-1" to="/" onClick={() => Auth.logout()}>
                        <MenuLink>Logout</MenuLink>
                    </Link>
                </Menu>
            );
        } else {
            return (
                <Menu>
                    <Link className="my-1" to="/signup">
                        <MenuLink>Signup</MenuLink>
                    </Link>
                    <Link className="my-1" to="/login">
                        <MenuLink>Login</MenuLink>
                    </Link>
                </Menu>
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
            </Hamburger>

            {showNavigation()}

        </Nav>
    );
}

const Nav = styled.div`
    text-transform: uppercase;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background: none;
`;

const Hamburger = styled.div`
    display: none;
    flex-direction: column;
    padding-top: .75rem;

    span{
        height: 2.5px;
        width: 25px;
        background: #2C6975;
        margin-bottom: 4px;
        border-radius: 5px;
        transition: all .3s ease-in-out;
    }

    &:hover{
        span{
            background: #68B2A0;
        }
    }

    @media (max-width:768px){
        display: flex;
    }
`;

const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    @media (max-width:768px){
        overflow: hidden;
        flex-direction: column;
        width: 100%;
    }
`;

const MenuLink = styled.a`
    padding: 1rem .8rem;
    transition: all 0.3s ease-in-out;
    font-size: 0.9rem;
    text-align: center;


    &:hover{
        color: orange;
    }
`
// const MenuLink = styled.div``;

export default Navbar;