import React, { useState, useEffect } from 'react';
import clientSocket from '../socket/socket';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from "@material-ui/core"
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { setRooms, addRoom, updateRoom } from '../store/rooms';
import { getRandomExercise, getFilteredExercise } from '../store/exercise';
import DifficultyFilter from './DifficultyFilter';
import TimeFilter from './TimeFilter';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "black",

  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "300px",
    width: "450px;"
  },
  }));

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
  const [open, setOpen] = React.useState(false)
  const [gameTime, setGameTime] = useState(300000);
  const [difficulty, setDifficulty] = useState('');
  const classes = useStyles()

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

  function handleCreate() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  // when a user clicks creates a game
  async function handleClick() {
    // generate a random roomId
    await addRoom({
      roomId: roomId,
      ref: props.exercise._id,
      players: [
        {
          id: props.me._id,
          username: props.me.username,
          rank: props.me.rank,
          points: props.me.totalPoints,
          submitted: false,
        },
      ],
      length: gameTime,
    });
    clientSocket.emit('createGame', roomId);
  }

  // update the time for the game
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
      id: props.me._id,
      username: props.me.username,
      rank: props.me.rank,
      points: props.me.totalPoints,
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

  async function handleDifficulty(event) {
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
    <div id="home-container" className="flex">
      <div id="home-battles">
        {/* Open Games */}
        <div id="home-options" className="flex">
          <p>Open Games</p>

          {/* Create a Game */}
          <button type="button" id="create-button" onClick={handleCreate}>
            Create Game
          </button>
          <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <div id="game-filters" className="flex">
                  <DifficultyFilter
                    handleChange={handleDifficulty}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                  />
                  {/* Select Time */}
                  <div id="time-selector">
                    <TimeFilter
                      handleChange={updateTime}
                      time={gameTime}
                    />
                  </div>
                </div>
                <Link
                  to={{
                    pathname: '/game',
                    state: {
                      roomId: roomId,
                      exerciseId: props.exercise._id,
                      gameTime: gameTime,
                    },
                  }}
                >
                  <button id="final-create-button" onClick={handleClick}>Create game</button>
                </Link>
              </div>
            </Fade>
          </Modal>

        </div>
        <div id="rooms-container" className="flex">
          {props.battles[0] &&
            props.battles.map((room) => {
              return (
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
                    >
                      {
                      `${room.players ? room.players[0].username : 'User'}`
                      }
                      <p>Difficulty</p>
                      <p>Time</p>
                    </button>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>

      <div id="home-user" className="flex">
        <h3 id="welcome">{`Hi, ${props.me.username}`}</h3>
        <div id="dashboard">
          <p>rank: {props.me.rank}</p>
          <p>points: {props.me.totalPoints}</p>
          <p>matches won:</p>
          <p>matches played:</p>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    battles: state.battles,
    exercise: state.exercise,
    me: state.auth,
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
