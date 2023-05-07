import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";

import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
           Together For A Better Tomorrow
          </h1>
          <p className="primary-text">
          "Voting is expression of our commitment to ourselves, One another, This country and This world"
          </p>
          <Link to="/Registration"style={{textDecoration:'none'}}>
        <button className="secondary-button">
          Sign Up <FiArrowRight />{" "}
        </button>
        </Link>
        </div>
        <div className="home-image-section">
          <img src="https://img.freepik.com/free-vector/hand-with-voting-sign-election_1017-18637.jpg?w=2000" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
