import React from "react";
import coverImage from "../assets/homepage/cover-img.png";
import homepageImage from "../assets/homepage/homepage-img.png";
import star from "../assets/star.png";

const Home = () => {

  return (
    <main>
          <section className="container"> 
          <div classame="homepage-title">
            <h1>Make the first Move.</h1>
            </div>
            <div className="home-btn btn-container">
            <button>
              login / signup
            </button>
            </div>
            <img 
            src={coverImage}
            className='cover-img'
            alt='cover'
            />
          </section>
          <section>
          <div
        class="homepage-img"
        style={{
          backgroundImage: 'url('+homepageImage+')',
          backgroundSize: "cover",
          height: "90vh",
          position: "relative",
          backgroundPosition: "center",
        }}>
          <h2 className="homepage-text homepage-h2">What's Your Github?</h2>
          <p className="homepage-text homepage-p">
            A unique experience to dating strictly for developers.
          </p>
          <div className="home-btn btn-container">
          <button>
          find your love match
          </button>
          </div>
          <img 
            src={star}
            className='star homepage-text'
            alt='star'
            width='40px'
            height='40px'
            />
          </div>
          </section>
      </main>
  );
};

export default Home;
