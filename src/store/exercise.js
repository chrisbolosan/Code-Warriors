import axios from 'axios';

// ACTION TYPES
const GET_EXERCISE = 'GET_EXERCISE';

// ACTION CREATORS
export const getExercise = (exercise) => {
  return {
    type: GET_EXERCISE,
    exercise,
  };
};

// THUNKS
export const fetchExercise = (id) => {
  return async (dispatch) => {
    const { data: exercise } = await axios.get(`/api/exercises/${id}`);
    dispatch(getExercise(exercise));
  };
};

// REDUCER
export default function exerciseReducer(state = {}, action) {
  switch (action.type) {
    case GET_EXERCISE:
      return action.exercise;
    default:
      return state;
  }
}
