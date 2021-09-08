import React from 'react';
import { Link } from 'react-router-dom';
import Leaderboard from './Leaderboard';


const GuestHome = () => {
  return (
    <div id="guest-container">
      <div id="guest-home">
        <div id="left-panel">
          <p style={{fontSize: "50px", fontFamily: "monospace"}}>Hello, World!</p>
          <p><Link to="/login">Login</Link> or <Link to="/signup">Create</Link> an account to play</p>
          <img src="https://i.imgur.com/QsCIwz2.gif" alt="code-snippet-gif"></img>
        </div>
        <Leaderboard />
      </div>

      <div id="about" className="flex">
        <h1>What is Code Warriors?</h1>
        <div id="about-desc">
          Code Warriors is the new fun way to prep for coding interviews. It's an interactive multiplayer game where players can challenge each other to a round of solving algorithms.
          <br/>
          Happy Coding!
        </div>
      </div>
      <div id="founders-container" className="flex">
        <h1>Meet the Founders</h1>
        <div id="founders" className="flex">
          <div className="founder flex">
            <img alt="antonio" src="antonio.png"/>
            <p className="name">Antonio Dinkins</p>
            <p className="job">Software Engineer</p>
            <p className="fsa"><img alt="fsa" src="fsa.ico"/>Fullstack Academy</p>
            <p className="founder-desc">Everyday is a new day so utilize to the best of your abilities the gifts God has granted you. Every day is a day to learn something new and grow.</p>
          </div>
          <div className="founder flex">
            <img alt="antonio" src="adrianrios.png"/>
            <p className="name">Adrian Rios</p>
            <p className="job">Software Engineer</p>
            <p className="fsa"><img alt="fsa" src="fsa.ico"/>Fullstack Academy</p>
            <p className="founder-desc">Bolivian Entrepreneur striking to achieve or solve challenges along the path of coding.</p>
          </div>
          <div className="founder flex">
            <img alt="antonio" src="gabefridkis.png"/>
            <p className="name">Gabe Fridkis</p>
            <p className="job">Software Engineer</p>
            <p className="fsa"><img alt="fsa" src="fsa.ico"/>Fullstack Academy</p>
            <p className="founder-desc">Gabe is both a professional orchestral musician and a software developer but can only do one at a time.</p>
          </div>
          <div className="founder flex">
            <img alt="antonio" src="chrisbolosan.png"/>
            <p className="name">Chris Bolosan</p>
            <p className="job">Software Engineer</p>
            <p className="fsa"><img alt="fsa" src="fsa.ico"/>Fullstack Academy</p>
            <p className="founder-desc">Database Administrator turned Software Engineer who loves to bbq Memphis style, travel the world, and eat.
</p>
          </div>
          <div className="founder flex">
            <img alt="antonio" src="haramchang.png"/>
            <p className="name">Haram Chang</p>
            <p className="job">Software Engineer</p>
            <p className="fsa"><img alt="fsa" src="fsa.ico" />Fullstack Academy</p>
            <p className="founder-desc">Mother of 2 Dogs. Lover of all animals. </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestHome;
