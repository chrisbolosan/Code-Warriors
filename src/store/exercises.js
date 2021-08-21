import axios from 'axios';

// ACTION TYPES
const GET_EXERCISES = 'GET_EXERCISES'


// ACTION CREATORS
export const getExercises = (exercises) => {
  return {
    type: GET_EXERCISES,
    exercises,
  };
};


// THUNKS
export const fetchExercises = () => {
  return async (dispatch) => {
    const { data: exercises } = await axios.get('/api/exercises');
    dispatch(getExercises(exercises));
  };
};


// REDUCER
export default function exerciseReducer (state = [], action) {
  switch (action.type) {
    case GET_EXERCISES:
      return action.exercises;
    default:
      return state;
  }
}
