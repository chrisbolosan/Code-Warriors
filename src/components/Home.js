import React, { useState, useEffect } from "react"
import clientSocket from "../socket/socket"
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux"
import { setRooms, addRoom } from "../store/rooms"
import { getRandomExercise } from "../store/exercise"

const Home = (props) => {

  const { fetchRooms, addRoom, getExercise } = props
  const [rooms, setRooms] = useState([])

  useEffect(()=> {
    fetchRooms()
    clientSocket.on("rooms", (rooms) => {
      setRooms(rooms)
    });
  }, [fetchRooms, rooms])

  // generate a random roomId
  const roomId = Math.floor(Math.random() * 10000000);

  // when a user clicks creates a game
  async function handleClick() {
    await getExercise()
    console.log(props.exercise)

    clientSocket.emit('createGame', roomId);
    addRoom({
      _id: Number(roomId),
      exercise_id: ""
    })
  }

  // when a user clicks join game
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

const mapState = state => {
  return {
    rooms: state.rooms,
    exercise: state.exercise
  }
}

const mapDispatch = dispatch => {
  return {
    fetchRooms: () => {
      dispatch(setRooms())
    },
    addRoom: (room) => {
      dispatch(addRoom(room))
    },
    getExercise: () => {
      dispatch(getRandomExercise())
    }
  }
}

export default connect(mapState, mapDispatch)(Home)
