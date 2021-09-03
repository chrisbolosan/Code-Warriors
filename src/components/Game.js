import React from 'react';
import { Redirect } from 'react-router-dom';
import IDE from './IDE';
import { connect } from 'react-redux';
import { submitSolution } from '../store/solution';
import IDEOpponent from './IDEOpponent';
import clientSocket from '../socket/socket';
import { runTest } from '../helpers/testRunner';
import Timer from './Timer';
import { getExercise } from "../store/exercise";
import { deleteRoom, setRooms } from "../store/rooms";
import axios from "axios";
import Score from "./Score"

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {},
      started: false,
      startDisabled: true,
      gameOver: false,
      gameLength: ''
    };

    this.runTestIDE = this.runTestIDE.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  // run the test in the IDE
  async runTestIDE(test, input) {
    const res = await runTest(test, input);
    this.setState({
      result: res,
    });
  }

  // when user clicks the START button
  async handleStart() {


    // get the room from the database
    const roomId = String(this.props.location.state.roomId);
    const { data } = await axios.get(`/api/battles/${roomId}`);

    clientSocket.emit('startGame', roomId);

    // set it to local state
    this.setState({
      room: data[0],
      gameLength: data[0].length
    });

      // game has started
      this.setState({
        started: true,
        funcFrame: this.props.exercise.exerciseBody,
      });
  }

  async componentDidMount() {

    clientSocket.on('gameStarted', async (senderRoomId) => {

      // get the room from the database
      const roomId = String(this.props.location.state.roomId);
      const { data } = await axios.get(`/api/battles/${roomId}`);



      // set it to local state
      // this.setState({
      //   room: data[0],
      //   gameLength: data[0] ? data[0].length : '100000'
      // });


      if (roomId === senderRoomId) {
        console.log("STARTED", senderRoomId)
        this.setState({
          started: true,
          funcFrame: this.props.exercise.exerciseBody,
          room: data[0],
          gameLength: data[0] ? data[0].length : '100000'
        });
      }




    });

    const { exerciseId } = this.props.location.state;
    await this.props.getExercise(exerciseId);

    clientSocket.on('solution', (solutionObject) => {
      this.setState(solutionObject);
    });

    clientSocket.on('roomFull', (value) => {
      this.setState({
        startDisabled: value,
      });
    });

    // current player
    const currentPlayer = this.props.me._id;
    // player who created the game
    this.props.battles.forEach((battle) => {
      if (battle.roomId === this.props.location.state.roomId) {
        if (battle.players[0]._id !== currentPlayer) {
          clientSocket.emit('joinRoom', this.props.location.state.roomId);
        }
      }
    });

    // listen for when it is game over
    clientSocket.on("endGame", (battleId) => {
      this.setState({
        gameOver: true,
        battleId
      })
    })

    clientSocket.on("opponentSubmitted", (submitterId) => {
      if (submitterId === this.props.me._id) {
        const status = document.getElementById("status")
        status.innerHTML = "Opponent has submitted their solution"
      }
    })
  }

  componentWillUnmount() {
    const { deleteBattle, battles } = this.props;
    const { roomId } = this.props.location.state;

    const battleToDelete = battles.filter(
      (battle) => battle.roomId === roomId
    )[0];

    // if the user who creates a game leaves the game when it's still open, the room gets deleted
  if (battleToDelete) {
    if (battleToDelete.open === true && this.state.started === false) {
      deleteBattle(battleToDelete.roomId);
      setRooms();
    } else {
      // this logic should be: if the game started and a user leaves, the opponent wins the game and the room gets deleted
      return;
    }
  }
  clientSocket.emit('leaveRoom', roomId)
  }

  render() {

    if (this.state.gameOver === true ) {
      return <Score roomId={this.state.room.roomId} />
    } else {
      const { roomId } = this.props.location.state;
      const { submitSolution, exercise } = this.props;
      const { runTestIDE } = this;

      if (exercise.problemDescription) {
        return (
          <div id="game-container">
            <div id="exercise-problem">
              {/* show the problem once game has started */}
              <h4>Description</h4>
              {this.state.started === true ? (
                <p>{exercise.problemDescription}</p>
              ) : null}
            </div>

            <div id="ide-container">
              <IDE
                exercise={this.props.exercise}
                funcFrame={this.state.funcFrame}
                submitSolution={submitSolution}
                roomId={roomId}
                runTestIDE={runTestIDE}
                room={this.state.room}
                submitDisabled={!this.state.started}
              />
              <div>
                <IDEOpponent
                  //pass solution obj as props to dummy IDE
                  solutionObject={this.state}
                  funcFrame={this.state.funcFrame}
                  roomId={roomId}
                />
                <div id="status"></div>
              </div>
            </div>
            <div id="start-match">
              {this.state.started === false ? (
                <button
                  onClick={this.handleStart}
                  disabled={this.state.startDisabled}
                >
                  START
                </button>
              ) : (
                <>
                  <Timer
                  roomId={this.props.location.state.roomId}
                  gameLength={this.state.gameLength}
                 />
                  <div id="seconds-remaining"></div>
                </>
              )}
            </div>
            <div id="test">
              <h3>Test Results</h3>
              <div id="test-results">
                {this.state.result
                  ? this.state.result.message
                  : "please run your test"}
              </div>
            </div>

          </div>
        );
      } else {
        return <div>"Game Loading..."</div>;
      }
    }
  }
}

const mapState = (state) => {
  return {
    exercise: state.exercise,
    solution: state.solution,
    battles: state.battles,
    timer: state.timer,
    me: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    submitSolution: (id, solution) => dispatch(submitSolution(id, solution)),
    getExercise: (exerciseId) => dispatch(getExercise(exerciseId)),
    deleteBattle: (roomId) => dispatch(deleteRoom(roomId)),
  };
};

export default connect(mapState, mapDispatch)(Game);

