import React from 'react';
import Logo from "../../assets/logo.png";
import {
    FooterContainer,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink,
    SocialLogo,
    WebsiteRights,
  } from './Footer.elements';
  
function Footer () {
    return (
        <FooterContainer>
                    <FooterLinkTitle>Website crafted with 🤍 by:</FooterLinkTitle>
                    <FooterLinksContainer>
                <FooterLinksWrapper>
                    <FooterLinkItems>
            <FooterLink to='https://github.com/bjackels5'>Brenda Jackels</FooterLink>
            <FooterLink to='https://github.com/Lightfooted'>Kimberly Collazo</FooterLink>
            <FooterLink to='https://github.com/brookemadison'>Brooke Madison</FooterLink>
            <FooterLink to='https://github.com/Padredilg'>Luiz Padredi</FooterLink>
                 </FooterLinkItems>
                </FooterLinksWrapper>
            </FooterLinksContainer>
            <SocialLogo to='/'>
            <span className="logo">
        <img src={Logo} height="40" width="180" alt="text here" />
    </span>
          </SocialLogo>
          <WebsiteRights>High Tech Match Love © 2021</WebsiteRights>
        </FooterContainer>
    )
}

export default Footer;
