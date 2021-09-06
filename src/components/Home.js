import React, { useState, useEffect } from 'react';
import clientSocket from '../socket/socket';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setRooms, addRoom, updateRoom } from '../store/rooms';
import { getRandomExercise, getFilteredExercise } from '../store/exercise';
import DifficultyFilter from './DifficultyFilter';

const Home = (props) => {
  const {
    fetchRooms,
    addRoom,
    getRandomExercise,
    updateRoom,
    getFilteredExercise,
  } = props;
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const [gameTime, setGameTime] = useState(300000);
  const [fExercise, setExercise] = useState({});
  const [difficulty, setDifficulty] = useState('');

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
      length: gameTime,
    });
    clientSocket.emit('createGame', roomId);
  }

  //Update the time for the game
  function updateTime(event) {
    const time = event.target.value;
    setGameTime(time);
  }

  // when a user clicks join game
  function joinRoom(event) {
    const roomId = Number(event.target.value);

    const battleId = event.target.name;

    const player1 = props.battles.filter((battle) => {
      return battle.roomId === roomId;
    })[0].players[0];

    const player2 = {
      id: props.auth._id,
      username: props.auth.username,
      rank: props.auth.rank,
      points: props.auth.totalPoints,
      submitted: false,
    };

    updateRoom(
      {
        players: [player1, player2],
        open: false,
      },
      battleId
    );
    clientSocket.emit('joinedRoom', {
      roomId: roomId,
      player1: player1,
      player2: player2,
    });
  }

  async function handleChange(event) {
    setDifficulty(event.target.value);
    if (event.target.value.length > 0 && event.target.value) {
      console.log('Prior to switch: ', event.target.value);
      switch (event.target.value) {
        case 'Easy':
          console.log('Difficulty level (Easy): ', event.target.value);
          await getFilteredExercise(event.target.value);
          break;
        case 'Hard':
          console.log('Difficulty level (Hard): ', event.target.value);
          await getFilteredExercise(event.target.value);
          break;
        default:
          getRandomExercise();
      }
    }
  }

  return (
    <div className="main-home">
      <h1 className="welcomebanner">Welcome! Create or Join a Game</h1>
      <div id="gameFilters">
        <DifficultyFilter
          handleChange={handleChange}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
        {/* Time Selector */}
        <div>
          <label id="time-container">
            {' '}
            <select
              onChange={updateTime}
              name="times"
              id="timesSelector"
              class="form-select"
            >
              <option value="300000">5 Minutes</option>
              <option value="600000">10 Minutes</option>
              <option value="900000">15 Minutes</option>
              <option value="1200000">20 Minutes</option>
              <option value="1500000">25 Minutes</option>
              <option value="1800000">30 Minutes</option>
            </select>
          </label>
        </div>
      </div>
      {/* Create Game */}
      <Link
        to={{
          pathname: '/game',
          state: {
            roomId: roomId,
            exerciseId: props.exercise._id,
            gameTime: gameTime,
            startDisabled: true
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
                      startDisabled: false
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
