import React, { useState, useEffect } from "react"
import clientSocket from "../socket/socket"
import { useHistory, Link } from "react-router-dom";


const Home = () => {
// let history = useHistory()
const [rooms, setRooms] = useState([])



useEffect(()=> {
  clientSocket.on("rooms", (rooms) => {
    setRooms(rooms)
  });
}, [rooms])

const roomId = Math.floor(Math.random() * 10000000);


  function handleClick() {
    clientSocket.emit('createGame', roomId);
  }

  function joinRoom(event) {
    clientSocket.emit('joinRoom', event.target.value)
  }


  return (
    <div>
      <h1>This is the logged in user homepage</h1>
      <Link to={{
          pathname: '/game',
          state: {
            room: roomId
          }
        }}>
        <button type='button' onClick={handleClick}>Create Game</button>
      </Link>
      <div>
      {rooms && rooms.map((room) => {
       return  (
        <Link to={{
          pathname: '/game',
          state: {
            room: room
          }
        }}>
          <button onClick={joinRoom} value={room} key={room} type='button'>{room}</button>
        </Link>
       )

      })}
      </div>

    </div>
  )
}

export default Home
