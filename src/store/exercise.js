import axios from 'axios';

// ACTION TYPES
const GET_RANDOM_EXERCISE = "GET_RANDOM_EXERCISE";
const GET_EXERCISE = "GET_EXERCISE";

// ACTION CREATORS
export const _getRandomExercise = (exercise) => {
  return {
    type: GET_RANDOM_EXERCISE,
    exercise
  };
};

export const _getExercise = (exercise) => {
  return {
    type: GET_EXERCISE,
    exercise
  };
};

// THUNKS
export const getRandomExercise = () => {
  return async (dispatch) => {
    const { data: randomExercise } = await axios.get("/api/exercises/random");
    dispatch(_getRandomExercise(randomExercise));
  };
};

export const getExercise = (exerciseId) => {
  return async (dispatch) => {
    const { data: exercise } = await axios.get(`/api/exercises/${exerciseId}`);
    dispatch(_getExercise(exercise));
  };
};

// REDUCER
export default function exerciseReducer(state = {}, action) {
  switch (action.type) {
    case GET_RANDOM_EXERCISE:
      return action.exercise;
    case GET_EXERCISE:
      return action.exercise;
    default:
      return state;
  }
}
