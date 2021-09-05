import React from 'react';
import Leaderboard from './Leaderboard';

const GuestHome = () => {
  return (
    <div id="guest-home">
      <div id="left-panel">
        <p style={{fontSize: "50px"}}>Welcome to Code Warriors!</p>
        <p>Login or Create an account to play</p>
        <img src="https://i.imgur.com/QsCIwz2.gif" alt="code-snippet-gif"></img>
      </div>
      <Leaderboard />
    </div>
  );
};

export default GuestHome;
