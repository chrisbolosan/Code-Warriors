import React, { useState, useEffect } from "react";
import clientSocket from "../socket/socket";
import {  Link } from "react-router-dom";
import { connect } from "react-redux";
import { setRooms, addRoom, updateRoom } from "../store/rooms";
import { getRandomExercise } from "../store/exercise";


const Home = (props) => {
  const { fetchRooms, addRoom, getRandomExercise, updateRoom } = props;
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState(0);


  useEffect(() => {
    fetchRooms();
    clientSocket.on("rooms", (rooms) => {
      setRooms(rooms);
    });
  }, [fetchRooms, rooms]);


  useEffect(() => {
    const randomRoomId = Math.floor(Math.random() * 10000000);
    setRoomId(randomRoomId)
    getRandomExercise();
  }, []);



  // when a user clicks creates a game
  async function handleClick() {
  // generate a random roomId

  console.log("roomID", roomId)

    await addRoom({
      roomId: roomId,
      ref: props.exercise._id,
      players: [
        {
          id: props.auth._id,
          username: props.auth.username,
          rank: props.auth.rank,
          points: props.auth.totalPoints,
        },
      ],
    });
    clientSocket.emit("createGame", roomId);

  }

  // when a user clicks join game
  function joinRoom(event) {
    const roomId = Number(event.target.value);


    const battleId = event.target.name
    clientSocket.emit("joinRoom", roomId);

    const player1 = props.battles.filter((battle) => {
      return battle.roomId === roomId;
    })[0].players[0];

    updateRoom(
      {
        players: [
          player1,
          {
            id: props.auth._id,
            username: props.auth.username,
            rank: props.auth.rank,
            points: props.auth.totalPoints,
          },
        ],
        open: false,
      },
      battleId
    );
  }


  return (
    <div>
      <h1>This is the logged in user homepage</h1>
      {/* Create Game */}
      <Link
        to={{
          pathname: "/game",
          state: {
            roomId: roomId,
            exerciseId: props.exercise._id

          },
        }}
      >
        <button type="button" onClick={handleClick}>
          Create Game
        </button>
      </Link>
      <div>
        {props.battles.map((room) => {
          return (
            // JOIN GAME Button
            <Link
              to={{
                pathname: "/game",
                state: {
                  roomId: room.roomId,
                  exerciseId: room.ref
                },
              }}
            >
              <button
                onClick={joinRoom}
                value={room.roomId}
                name={room._id}
                key={room._id}
                type="button"
              >{`${room.players[0].username}'s room`}</button>
            </Link>
          );
        })}

      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    battles: state.battles,
    exercise: state.exercise,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchRooms: () => {
      dispatch(setRooms());
    },
    addRoom: (room) => {
      dispatch(addRoom(room));
    },
    getRandomExercise: () => {
      dispatch(getRandomExercise());
    },
    updateRoom: (room, roomId) => {
      dispatch(updateRoom(room, roomId));
    },
  };
};

export default connect(mapState, mapDispatch)(Home);
