import React from "react"
import Routes from "./Routes"
import Navbar from "./components/Navbar"
import Game from './components/Game'


function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes />
      <Game />
    </div>
  );
}

export default App;
