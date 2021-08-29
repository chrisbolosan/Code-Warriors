import React, { useState, useEffect } from "react";
import clientSocket from "../socket/socket";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setRooms, addRoom, updateRoom } from "../store/rooms";
import { getRandomExercise } from "../store/exercise";

const Home = (props) => {
  const { fetchRooms, addRoom, getExercise, updateRoom } = props;
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState('')

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

  // when a user clicks creates a game
  async function handleClick() {
  const roomId = Math.floor(Math.random() * 10000000);
  setRoomId(roomId)
  // console.log("create roomId",typeof roomId)

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
      <Link
        to={{
          pathname: "/game",
          state: {
            roomId: Number(roomId),
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
          // console.log(room)
          return (
            <Link
              to={{
                pathname: "/game",
                state: {
                  roomId: Number(room.roomId),
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
    getExercise: () => {
      dispatch(getRandomExercise());
    },
    updateRoom: (room, roomId) => {
      dispatch(updateRoom(room, roomId));
    },
  };
};

export default connect(mapState, mapDispatch)(Home);
