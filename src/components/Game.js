import React from 'react';
import { Redirect } from 'react-router-dom';
import IDE from './IDE';
import { connect } from 'react-redux';
import { submitSolution } from '../store/solution';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IDEOpponent from './IDEOpponent';
import clientSocket from '../socket/socket';
import { runTest } from '../helpers/testRunner';
import Timer from './Timer';
//import Button from "@material-ui/core/Button";
import { getExercise } from '../store/exercise';
import { deleteRoom, setRooms } from '../store/rooms';
import axios from 'axios';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {},
      started: false,
    };

    this.result = this.result.bind(this);
    this.runTestIDE = this.runTestIDE.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  result() {
    toast(this.props.solution.message, {
      position: 'top-center',
      style: {
        color: this.props.solution.success ? 'green' : 'red',
      },
    });
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
    // game has started
    this.setState({
      started: true,
      funcFrame: this.props.exercise.exerciseBody,
    });

    // get the room from the database
    const roomId = String(this.props.location.state.roomId);
    const { data } = await axios.get(`/api/battles/${roomId}`);

    // set it to local state
    await this.setState({
      room: data[0],
    });
  }

  async componentDidMount() {
    const { exerciseId } = this.props.location.state;
    await this.props.getExercise(exerciseId);

    clientSocket.on('solution', (solutionObject) => {
      this.setState(solutionObject);
    });

    clientSocket.on('timer', (secondsRemaining) => {
      const div = document.getElementById('seconds-remaining');
      div.innerHTML = secondsRemaining;
    });
  }

  componentWillUnmount() {
    const { deleteBattle, battles } = this.props;
    const { roomId } = this.props.location.state;

    const battleToDelete = battles.filter(
      (battle) => battle.roomId !== roomId
    )[0];

    // if the user who creates a game leaves the game when it's still open, the room gets deleted
    if (battleToDelete.open === true && this.state.started === false) {
      deleteBattle(battleToDelete.roomId);
      setRooms();
    } else {
      // this logic should be: if the game started and a user leaves, the opponent wins the game and the room gets deleted
      return;
    }
  }

  render() {
    const { roomId } = this.props.location.state;
    const { submitSolution, exercise } = this.props;
    const { result, runTestIDE } = this;

    if (exercise.problemDescription) {
      return (
        <div id="game-container">
          <div id="exercise-problem">
            {/* show the problem once game has started */}
            {/* {this.state.started === true ? exercise.problemDescription : null} */}
            <h4>Description</h4>
            <p> {exercise.problemDescription}</p>
          </div>

          <div id="ide-container">
            <IDE
              exercise={this.props.exercise}
              funcFrame={this.state.funcFrame}
              submitSolution={submitSolution}
              result={result}
              enabled={true}
              roomId={roomId}
              runTestIDE={runTestIDE}
              room={this.state.room}
            />
            <IDEOpponent
              //pass solution obj as props to dummy IDE
              solutionObject={this.state}
              funcFrame={this.state.funcFrame}
              roomId={roomId}
            />
          </div>
          <div id="start-match">
            {this.state.started === false ? (
              <button onClick={this.handleStart}>START</button>
            ) : (
              <>
                <Timer roomId={this.props.location.state.roomId} />
                <div id="seconds-remaining"></div>
              </>
            )}
          </div>
          <div id="test">
            <h3>Test Results</h3>
            <div id="test-results">
              {this.state.result
                ? this.state.result.message
                : 'please run your test'}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>"Game Loading..."</div>;
    }
  }
}

const mapState = (state) => {
  return {
    exercise: state.exercise,
    solution: state.solution,
    battles: state.battles,
    timer: state.timer,
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

// <Button onClick={this.handleStart} variant="inherit" color="secondary" ><Timer /></Button>
