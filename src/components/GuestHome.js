import React from 'react';
import Leaderboard from './Leaderboard';

const GuestHome = () => {
  return (
    <div id="guest">
      <div id="left-panel">
        <h1>Welcome to Code Warriors!</h1>
        <h4>Login or Create an account to play</h4>
        <img src="https://i.imgur.com/QsCIwz2.gif" alt="code-snippet-gif"></img>
      </div>
      <Leaderboard />
    </div>
  );
};

export default GuestHome;
