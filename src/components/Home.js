import React, { useState, useEffect } from "react";
import clientSocket from "../socket/socket";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setRooms, addRoom, updateRoom } from "../store/rooms";
import { getRandomExercise } from "../store/exercise";

const Home = (props) => {
  const { fetchRooms, addRoom, getRandomExercise, updateRoom } = props;
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const [gameTime, setGameTime] = useState(300000);


  useEffect(() => {
    fetchRooms();
    clientSocket.on("rooms", (rooms) => {
      setRooms(rooms);
    });
  }, [fetchRooms, rooms]);

  useEffect(() => {
    const randomRoomId = Math.floor(Math.random() * 10000000);
    setRoomId(randomRoomId);
    getRandomExercise();
  }, []);

  // when a user clicks creates a game
  async function handleClick() {
    // generate a random roomId
    await addRoom({
      roomId: roomId,
      ref: props.exercise._id,
      players: [
        {
          id: props.auth._id,
          username: props.auth.username,
          rank: props.auth.rank,
          points: props.auth.totalPoints,
          submitted: false,
        },
      ],
      length: gameTime
    });
    clientSocket.emit("createGame", roomId);
  }

  //Update the time for the game
  function updateTime(event){
    const time = event.target.value
    setGameTime(time)
  }

  // when a user clicks join game
  function joinRoom(event) {
    const roomId = Number(event.target.value);

    const battleId = event.target.name;

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
            submitted: false,
          },
        ],
        open: false,
      },
      battleId
    );
  }

  return (
    <div className="main-home">
      <h1>Welcome! Create or Join a Game</h1>

      {/* Time Selector */}
        <div>
          <select onChange={updateTime} name="times" id="times" class="form-select">
            <option value='300000'>5</option>
            <option value='600000'>10</option>
            <option value='900000'>15</option>
            <option value='1200000'>20</option>
            <option value='1500000'>25</option>
            <option value='1800000'>30</option>
          </select>
        </div>

      {/* Create Game */}
      <Link
        to={{
          pathname: "/game",
          state: {
            roomId: roomId,
            exerciseId: props.exercise._id,
            gameTime: gameTime
          },
        }}
      >
        <button type="button" id="create-button" onClick={handleClick}>
          Create Game
        </button>
      </Link>
      <h2>Rooms</h2>
      <div className="rooms-container">
        {props.battles[0] &&
          props.battles.map((room) => {
            console.log(room)
            return (
              // JOIN GAME Button
              <div className="room-item">
                <Link
                  to={{
                    pathname: room.open ? "/game" : "/",
                    state: {
                      roomId: room.roomId,
                      exerciseId: room.ref,
                    },
                  }}
                >
                  <button
                    onClick={joinRoom}
                    value={room.roomId}
                    name={room._id}
                    key={room._id}
                    type="button"
                    className="room-button"
                  >{`${
                    room.players ? room.players[0].username : "User"
                  }'s room`}</button>
                </Link>
              </div>
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
