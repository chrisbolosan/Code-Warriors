import React from "react";
import IDE from "./IDE";
import { connect } from "react-redux";
//import { fetchExercise } from "../store/exercise";
import { submitSolution, testSolution } from "../store/solution";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IDEOpponent from "./IDEOpponent";
import clientSocket from "../socket/socket";
import { runTest } from "../helpers/testRunner";


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.result = this.result.bind(this);
    this.runTestIDE = this.runTestIDE.bind(this)
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
    const res =  await runTest(test, input)
    this.setState({
      result: res
    })
    console.log(this.state)
  }

  async componentDidMount() {
    clientSocket.on("solution", (solutionObject) => {
      this.setState(solutionObject);
    });
  }

  render() {
    const roomId = this.props.location.state.roomId
    const { exercise, submitSolution } = this.props;
    const { result, runTestIDE } = this;

    if (exercise.problemDescription) {
      return (
        <div className="Game">
          <div>{exercise ? exercise.problemDescription : null}</div>
          <div>
          <IDE
            exercise={exercise}
            submitSolution={submitSolution}
            result={result}
            enabled={true}
            roomId={roomId}
            runTestIDE={runTestIDE}
          />
          <div>
            <h3>Test Results</h3>
            <div>{this.state.result ? this.state.result.message : 'please run your test' }</div>
          </div>
          </div>

          <IDEOpponent
          //pass solution obj as props to dummy IDE
            solutionObject={this.state}
            exercise={exercise.exerciseBody}
            roomId={roomId}
          />
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

    //fetchExercise: (id) => dispatch(fetchExercise(id)),
  };
};

export default connect(mapState, mapDispatch)(Game);
