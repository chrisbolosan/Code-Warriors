import React, { useState, useEffect } from "react";
import clientSocket from "../socket/socket";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setRooms, addRoom, updateRoom } from "../store/rooms";
import { getRandomExercise } from "../store/exercise";

const Home = (props) => {
  const { fetchRooms, addRoom, getExercise, updateRoom } = props;
  const [rooms, setRooms] = useState([]);

  // const [room, setRoom] = useState({})

  useEffect(() => {
    fetchRooms();
    clientSocket.on("rooms", (rooms) => {
      setRooms(rooms);
    });
  }, [fetchRooms, rooms]);

  // useEffect(() => {
  //   setRoom(props.battle);
  // }, [props.battle]);

  useEffect(() => {
    getExercise();
  }, []);

  // generate a random roomId
  const roomId = Math.floor(Math.random() * 10000000);

  // when a user clicks creates a game
  async function handleClick() {
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
    // console.log(room)
    clientSocket.emit("createGame", roomId);

  }

  // when a user clicks join game
  function joinRoom(event) {
    const roomId = event.target.value;
    clientSocket.emit("joinRoom", roomId);
    console.log('roomID', roomId)
    console.log('battles', props.battles)

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
      roomId
    );
  }


  return (
    <div>
      <h1>This is the logged in user homepage</h1>
      <Link
        to={{
          pathname: "/game",
          state: {
            room: roomId,
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
            <Link
              to={{
                pathname: "/game",
                state: {
                  roomId: room._id,
                },
              }}
            >
              <button
                onClick={joinRoom}
                value={room.roomId}
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
    // battle: state.battle
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
    getExercise: () => {
      dispatch(getRandomExercise());
    },
    updateRoom: (room, roomId) => {
      dispatch(updateRoom(room, roomId));
    },
  };
};

export default connect(mapState, mapDispatch)(Home);
