import React from 'react';
import { Link } from 'react-router-dom';
import Leaderboard from './Leaderboard';


const GuestHome = () => {
  return (
    <div id="guest-container">
      <div id="guest-home">
        <div id="left-panel">
          <p style={{fontSize: "50px"}}>Welcome to Code Warriors!</p>
          <p><Link to="/login">Login</Link> or <Link to="/signup">Create</Link> an account to play</p>
          <img src="https://i.imgur.com/QsCIwz2.gif" alt="code-snippet-gif"></img>
        </div>
        <Leaderboard />
      </div>
      <div id="about" className="flex">
        <h1>What is Code Warriors?</h1>
        <div id="about-desc">
          Code Warriors is the new fun way to prep for coding interviews. It's an interactive multiplayer game where players can challenge each other to a round of solving algos.
          <br/>
          Code away!
        </div>
      </div>
      <div id="founders-container" className="flex">
        <h1>Meet the Founders</h1>
        <div id="founders" className="flex">
          <div className="founder flex">
            <p>Antonio Dinkins</p>
            <p>Software Engineer</p>
            <p>Fullstack Academy</p>
            <p className="founder-desc">...description here</p>
          </div>
          <div className="founder flex">
            <p>Adrian Rios</p>
            <p>Software Engineer</p>
            <p>Fullstack Academy</p>
            <p className="founder-desc">...description here</p>
          </div>
          <div className="founder flex">
            <p>Gabe Fridkis</p>
            <p>Software Engineer</p>
            <p>Fullstack Academy</p>
            <p className="founder-desc">...description here</p>
          </div>
          <div className="founder flex">
            <p>Chris Bolosan</p>
            <p>Software Engineer</p>
            <p>Fullstack Academy</p>
            <p className="founder-desc">...description here</p>
          </div>
          <div className="founder flex">
            <p>Haram Chang</p>
            <p>Software Engineer</p>
            <p>Fullstack Academy</p>
            <p className="founder-desc">...description here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestHome;
