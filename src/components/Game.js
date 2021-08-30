import React from "react";
import IDE from "./IDE";
import { connect } from "react-redux";
import { submitSolution } from "../store/solution";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IDEOpponent from "./IDEOpponent";
import clientSocket from "../socket/socket";
import { runTest } from "../helpers/testRunner";
import Timer from "./Timer";
import Button from "@material-ui/core/Button";
import { getExercise } from "../store/exercise"
import axios from "axios"

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {},
      started: false,
    };
    this.result = this.result.bind(this);
    this.runTestIDE = this.runTestIDE.bind(this);
    this.handleStart = this.handleStart.bind(this)
  }

  result() {
    toast(this.props.solution.message, {
      position: "top-center",
      style: {
        color: this.props.solution.success ? "green" : "red",
      },
    });
  }

  async runTestIDE(test, input) {
    const res = await runTest(test, input);
    this.setState({
      result: res,
    });
  }

  async handleStart() {

    // game has started
    this.setState({
      started: true,
      funcFrame: this.props.exercise.exerciseBody
    })

    // get the room from the database
    const roomId = String(this.props.location.state.roomId)
    const { data } = await axios.get(`/api/battles/${roomId}`)

    // set it to local state
    await this.setState({
      room: data[0]
    })
    console.log("this is the state after clicking start", this.state)
  }

  async componentDidMount() {
    const { exerciseId } = this.props.location.state;
    await this.props.getExercise(exerciseId)
    clientSocket.on("solution", (solutionObject) => {
      this.setState(solutionObject);
    });
  }

  render() {
    console.log(this.state)
    const { roomId } = this.props.location.state;
    const { submitSolution, exercise } = this.props;
    const { result, runTestIDE } = this;
    if (exercise.problemDescription) {
      return (
        <div className="game-container">
          <div>{exercise ? exercise.problemDescription : null}</div>
          <div>
            <IDE
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
          {
            this.state.started === false ? (
              <button onClick={this.handleStart}>START</button>
            ) : (
              <p>Timer</p>
            )
          }
          <div>
              <h3>Test Results</h3>
              <div>
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

const mapState = (state) => {
  return {
    exercise: state.exercise,
    solution: state.solution,

  };
};

const mapDispatch = (dispatch) => {
  return {
    submitSolution: (id, solution) => dispatch(submitSolution(id, solution)),
    getExercise: (exerciseId) => dispatch(getExercise(exerciseId))
  };
};

export default connect(mapState, mapDispatch)(Game);

// <Button onClick={this.handleStart} variant="inherit" color="secondary" ><Timer /></Button>
