import React from "react"
import clientSocket from "../socket/socket"
import { useHistory } from "react-router-dom";


const Home = () => {
let history = useHistory()

  clientSocket.on("roomnumber", (roomnumber) => {
    console.log(roomnumber)
  });

  function handleClick() {
    const roomnumber = Math.floor(Math.random() * 10000000);
    clientSocket.emit('createGame', roomnumber)
    history.push({
      pathname: `/IDE`,
    });
  }
  return (
    <div>
      <h1>This is the logged in user homepage</h1>
      <button type='button' onClick={handleClick}>Create Game</button>
    </div>
  )
}

export default Home
