import React from 'react';
import {homeObjOne} from './Data';
import HeroSection from '../../components/HeroSection'
import InfoSection from '../../components/InfoSection/InfoSection.js';

function Home() {
  return (
    <>
      <InfoSection {...homeObjOne} />
      <HeroSection />
    </>
  );
}

export default Home;

