import axios from 'axios';

// ACTION TYPES
const GET_RANDOM_EXERCISE = "GET_RANDOM_EXERCISE";
const GET_EXERCISE = "GET_EXERCISE";
const GET_FILTERED_EXERCISE = "GET_FILTERED_EXERCISE";

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

export const _getFilteredExercise = (exercise) => {
  return {
    type: GET_FILTERED_EXERCISE,
    exercise
  }
}

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


export const getFilteredExercise = (difficulty) => {
  return async (dispatch) => {
    try {
      const {data: exercise} = await axios.get(`/api/exercises/filtered${difficulty}`)
      dispatch(_getFilteredExercise(exercise))
    } catch (error) {
      console.log(error)
    }

  }
}

// REDUCER
export default function exerciseReducer(state = {}, action) {
  switch (action.type) {
    case GET_RANDOM_EXERCISE:
      return action.exercise;
    case GET_EXERCISE:
      return action.exercise;
    case GET_FILTERED_EXERCISE:
      return action.exercise;
    default:
      return state;
  }
}
