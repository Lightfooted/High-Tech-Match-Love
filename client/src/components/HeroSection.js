import React from 'react';
import StarLogo from "../assets/star.png";
import HeroImage from "../assets/homepage-img.png";
import { Link } from "react-router-dom";


function HeroSection() {
  return (
    <div className='hero-container'
      style={{ backgroundImage: `url(${HeroImage})` }}>
      <h1 className='hero-text hero-img-top'>What's your Github?</h1>
      <p className='hero-text'> A unique experience to dating strictly for developers.</p>
      <div className='btn-container'>
        <button>
          <Link to="/findmatch">
            Find Your Love Match
          </Link>
        </button>
      </div>
      <img src={StarLogo} height="40" width="40" alt="star logo"
        style={{
          marginTop: '35px'
        }}
      />
      <div className='hero-img-bottom'></div>
    </div>
  );
}

export default HeroSection;