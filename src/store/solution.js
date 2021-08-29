import axios from 'axios';

// ACTION TYPES
const TEST_SOLUTION = 'TEST_SOLUTION';

// ACTION CREATORS
export const testExercise = (output) => {
  return {
    type: TEST_SOLUTION,
    output,
  };
};

// THUNKS
export const submitSolution = (id, solution) => {
  return async (dispatch) => {
    const { data: output } = await axios.post('/api/exercises/solution', {
      id,
      solution,
    });
    dispatch(testExercise(output));
  };
};



// REDUCER
export default function exerciseReducer(state = {}, action) {
  switch (action.type) {
    case TEST_SOLUTION:
      return action.output;
    default:
      return state;
  }
}
