import React, { useState } from "react"
import clientSocket from "../socket/socket"
import { useHistory } from "react-router-dom";


const Home = () => {
let history = useHistory()
const [rooms, setRooms] = useState([])

clientSocket.on("rooms", (rooms) => {
  setRooms(...rooms)
});

console.log(rooms)
  function handleClick() {
    const roomId = Math.floor(Math.random() * 10000000);
    clientSocket.emit('createGame', roomId)
    history.push({
      pathname: `/IDE/${roomId}`,
      state: {roomId}
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
