import React from 'react'
import IDE from './IDE'
import { connect } from "react-redux";
import { fetchExercise } from "../store/exercise";
import { testSolution } from "../store/solution";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Game extends React.Component{
  constructor(props){
    super(props);
    this.result = this.result.bind(this);

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
          <IDE exercise={exercise}
               testSolution={testSolution}
               result={result}
               enabled={false}
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
