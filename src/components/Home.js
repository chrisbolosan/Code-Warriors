import React, { useState, useEffect } from "react"
import clientSocket from "../socket/socket"
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux"
import { setRooms, addRoom, updateRoom } from "../store/rooms"
import { getRandomExercise } from "../store/exercise"

const Home = (props) => {

  const { fetchRooms, addRoom, getExercise, updateRoom } = props
  const [rooms, setRooms] = useState([])

  useEffect(()=> {
    fetchRooms()
    clientSocket.on("rooms", (rooms) => {
      setRooms(rooms)
    });
  }, [fetchRooms, rooms])

  useEffect(() => {
    getExercise()
  }, [])

  // generate a random roomId
  const roomId = Math.floor(Math.random() * 10000000);

  // when a user clicks creates a game
  function handleClick() {
    clientSocket.emit('createGame', roomId);
    addRoom({
      _id: Number(roomId),
      exercise_id: props.exercise._id,
      players: [{
        id: props.auth._id,
        username: props.auth.username,
        rank: props.auth.rank,
        points: props.auth.totalPoints
      }]
    })
  }

  // when a user clicks join game
  function joinRoom(event) {
    const roomId = event.target.value
    clientSocket.emit('joinRoom', roomId)

    const player1 = props.rooms.filter(roomObject => {
      return Number(roomObject._id) === Number(roomId)
    })[0].players[0]

    updateRoom({
      players: [
        player1,
        {
          id: props.auth._id,
          username: props.auth.username,
          rank: props.auth.rank,
          points: props.auth.totalPoints
        }
      ],
      open: false
    }, roomId)
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
      {props.rooms.map((room) => {
       return  (
        <Link to={{
          pathname: '/game',
          state: {
            roomId: room._id
          }
        }}>
          <button onClick={joinRoom} value={room._id} key={room._id} type='button'>{`${room.players[0].username}'s room`}</button>
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
    exercise: state.exercise,
    auth: state.auth
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
    },
    updateRoom: (room, roomId) => {
      dispatch(updateRoom(room, roomId))
    }
  }
}

export default connect(mapState, mapDispatch)(Home)
