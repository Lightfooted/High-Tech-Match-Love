import React from 'react';
import Logo from "../../assets/white-logo.png";
import BrendasProfile from "../../assets/brenda.png";
import KimsProfile from "../../assets/kim.png";
import BrookesProfile from "../../assets/brooke.png";
import LuizsProfile from "../../assets/luiz.png";

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

function Footer() {
  return (
    <FooterContainer>
      <FooterLinkTitle>Website crafted with 🤍 by:</FooterLinkTitle>
      <FooterLinksContainer>
        <FooterLinksWrapper>
          <FooterLinkItems>
            <FooterLink
              to={{ pathname: 'https://github.com/bjackels5' }}
              rel='noopener noreferrer'
              target='_blank'
              aria-label='Github'>
              <img className="grow" src={BrendasProfile} height="80" width="80" alt="Brenda's github profile" />
            </FooterLink>
            <FooterLink 
              to={{ pathname: 'https://github.com/Lightfooted' }}
              rel='noopener noreferrer'
              target='_blank'
              aria-label='Github'>
              <img className="grow" src={KimsProfile} height="80" width="80" alt="Kim's github profile" />
              </FooterLink>
            <FooterLink  
              to={{ pathname: 'https://github.com/brookemadison' }}
              rel='noopener noreferrer'
              target='_blank'
              aria-label='Github'>
               <img className="grow" src={BrookesProfile} height="80" width="80" alt="Brooke's github profile" />
              </FooterLink>
            <FooterLink 
              to={{ pathname: 'https://github.com/padredilg' }}
              rel='noopener noreferrer'
              target='_blank'
              aria-label='Github'>
              <img className="grow" src={LuizsProfile}
              height="80" width="80" alt="Luiz's github profile" />
              </FooterLink>
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
