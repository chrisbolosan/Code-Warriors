import axios from 'axios';

// ACTION TYPES
const GET_RANDOM_EXERCISE = "GET_RANDOM_EXERCISE"

// ACTION CREATORS
export const _getRandomExercise = (exercise) => {
  return {
    type: GET_RANDOM_EXERCISE,
    exercise
  };
};

// THUNKS
export const getRandomExercise = (exercise) => {
  return async (dispatch) => {
    const { data: randomExercise } = await axios.get("/api/exercises/random");
    dispatch(_getRandomExercise(randomExercise));
  };
};

// REDUCER
export default function exerciseReducer(state = {}, action) {
  switch (action.type) {
    case GET_RANDOM_EXERCISE:
      return action.exercise;
    default:
      return state;
  }
}
