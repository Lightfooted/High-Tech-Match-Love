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
            <FooterLink
            href=
                'https://github.com/bjackels5'
              rel='noopener noreferrer'
              target='_blank'
              aria-label='Github'>
              Brenda Jackels
              </FooterLink>
            <FooterLink  href={
                'https://github.com/Lightfooted'
              }
              rel='noopener noreferrer'
              target='_blank'
              aria-label='Github'>Kimberly Collazo</FooterLink>
            <FooterLink  href={
                'https://github.com/brookemadison'
              }
              rel='noopener noreferrer'
              target='_blank'
              aria-label='Github'>Brooke Madison</FooterLink>
            <FooterLink  href={
                'https://github.com/padredilg'
              }
              rel='noopener noreferrer'
              target='_blank'
              aria-label='Github'>Luiz Padredi</FooterLink>
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
