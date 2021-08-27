import React from "react";
import IDE from "./IDE";
import { connect } from "react-redux";
//import { fetchExercise } from "../store/exercise";
import { testSolution } from "../store/solution";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IDEOpponent from "./IDEOpponent";
import clientSocket from "../socket/socket";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.result = this.result.bind(this);
  }

  result() {
    toast(this.props.solution.message, {
      position: "top-center",
      style: {
        color: this.props.solution.success ? "green" : "red",
      },
    });
  }

  async componentDidMount() {
    // console.log(this.props.location.state.roomId)
    //await this.props.fetchExercise("6128f53f83a4ca7174a10b3b");
    //Listen for solution event, set solution obj to state
    clientSocket.on("solution", (solutionObject) => {
      this.setState(solutionObject);
    });
  }

  render() {
    const roomId = this.props.location.state.roomId
    const { exercise, testSolution } = this.props;
    const { result } = this;

    if (exercise.problemDescription) {
      return (
        <div className="Game">
          <div>{exercise ? exercise.problemDescription : null}</div>
          <IDE
            exercise={exercise}
            testSolution={testSolution}
            result={result}
            enabled={true}
            roomId={roomId}
          />
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
    testSolution: (id, solution) => dispatch(testSolution(id, solution)),
    //fetchExercise: (id) => dispatch(fetchExercise(id)),
  };
};

export default connect(mapState, mapDispatch)(Game);
