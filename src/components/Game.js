import React from 'react'
import IDE from './IDE'
import { connect } from "react-redux";
import { fetchExercise } from "../store/exercise";
import { testSolution } from "../store/solution";

class Game extends React.Component{
  constructor(props){
    super(props)
  }

  async componentDidMount() {
    await this.props.fetchExercise("6123caa2a0b84caf217f3dc3");

    this.setState({ input: this.props.exercise.exerciseBody });
  }

  render(){
    const {exercise, solution } = this.props;
    return(
      <>
        <IDE exercise={exercise} solution={solution}/>
        <IDE exercise={exercise} solution={solution}/>
      </>
    )
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
