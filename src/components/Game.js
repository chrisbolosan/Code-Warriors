import React from 'react'
import IDE from './IDE'
import { connect } from "react-redux";
import { fetchExercise } from "../store/exercise";
import { testSolution } from "../store/solution";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IDEOpponent from "./IDEOpponent"
import clientSocket from "../socket/socket"

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      playerId: "",
      solutionText: "",
      id: ""
    }
    this.result = this.result.bind(this);
  }

  componentDidUpdate(prevState) {
    if (prevState.solutionText !== this.state.solutionText) {

    }
  }

  result() {
    toast(this.props.solution.message, {
      position: 'top-center',
      style: {
        color: this.props.solution.success ? 'green' : 'red'
      }
    });
  }

  async componentDidMount() {
    await this.props.fetchExercise("6123caa2a0b84caf217f3dc3");
    clientSocket.on("solution", async solutionObject => {
      await this.setState(solutionObject)
    })
    clientSocket.on("message", async (message) => {
      await this.setState({
        playerId: message
      })
    })
  }

  render(){
    const {exercise, testSolution } = this.props;
    const {result} = this;

    if(exercise.problemDescription){
      return(
        <div className="Game">
        <div>
            {exercise ? exercise.problemDescription : null}
         </div>
          <IDE exercise={exercise}
               testSolution={testSolution}
               result={result}
               enabled={true}
          />
          <IDEOpponent solutionObject={this.state}
                       exercise={exercise.exerciseBody}
          />
        </div>
      )
    } else {
      return(
        <div>"Game Loading..."</div>
      )
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
    fetchExercise: (id) => dispatch(fetchExercise(id)),
  };
};

export default connect(mapState, mapDispatch)(Game);
