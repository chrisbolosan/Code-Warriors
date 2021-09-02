import React, { useState, useEffect } from 'react';
import clientSocket from '../socket/socket';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setRooms, addRoom, updateRoom } from '../store/rooms';
import { getRandomExercise, getFilteredExercise } from '../store/exercise';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router';
import DifficultyFilter from './DifficultyFilter';

const Home = (props) => {
  const { fetchRooms, addRoom, getRandomExercise, updateRoom, getFilteredExercise } = props;
  console.log('uselocation', useLocation());
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const [exercise, setExercise] = useState({});
  const [difficulty, setDifficulty] = React.useState('');

  useEffect(() => {
    fetchRooms();
    clientSocket.on('rooms', (rooms) => {
      setRooms(rooms);
    });
  }, [fetchRooms, rooms]);

  useEffect(() => {
    const randomRoomId = Math.floor(Math.random() * 10000000);
    setRoomId(randomRoomId);
    getRandomExercise();
    setExercise(props.exercise)
    console.log('Initial state after random eexercise call: ', exercise)

    // async function updateScore(score) {
    //   await axios.put(`/api/users/${props.me._id}`, {
    //   totalPoints: score
    //   })
    // }
    // if (props.location.state.currentPlayerScore) {
    //   updateScore(props.location.state.currentPlayerScore)
    // }
  }, []);

  // when a user clicks creates a game
  async function handleClick() {
    // generate a random roomId
    await addRoom({
      roomId: roomId,
      ref: exercise._id,
      players: [
        {
          id: props.auth._id,
          username: props.auth.username,
          rank: props.auth.rank,
          points: props.auth.totalPoints,
          submitted: false,
        },
      ],
    });
    clientSocket.emit('createGame', roomId);
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
  };

  const handleChange = (event) => {
    setDifficulty(event.target.value);
    console.log('(handleChange func) Value of state before getFilteredExercise is invoked: ', exercise)
    getFilteredExercise(difficulty);
    setExercise(props.exercise);
    console.log('(handleChange func) Value of state after getFilteredExercise is invoked: ', exercise)
  };

  return (
    <div className="main-home">
      <h1>Welcome! Create or Join a Game</h1>

      <DifficultyFilter handleChange={handleChange} />
      {/* Create Game */}
      <Link
        to={{
          pathname: '/game',
          state: {
            roomId: roomId,
            exerciseId: exercise._id,
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
            return (
              // JOIN GAME Button
              <div className="room-item">
                <Link
                  to={{
                    pathname: '/game',
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
                    room.players ? room.players[0].username : 'User'
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
    getFilteredExercise: (difficulty) => {
      dispatch(getFilteredExercise(difficulty));
    },
  };
};

export default connect(mapState, mapDispatch)(Home);
