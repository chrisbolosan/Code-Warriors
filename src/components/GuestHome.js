import React from 'react';
import { Link } from 'react-router-dom';
import Leaderboard from './Leaderboard';


const GuestHome = () => {
  return (
    <div id="guest-home">
      <div id="left-panel">
        <p style={{fontSize: "50px"}}>Welcome to Code Warriors!</p>
        <p><Link to="/login">Login</Link> or <Link to="/signup">Create</Link> an account to play</p>
        <img src="https://i.imgur.com/QsCIwz2.gif" alt="code-snippet-gif"></img>
      </div>
      <Leaderboard />
    </div>
  );
};

export default GuestHome;
