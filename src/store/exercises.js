import axios from 'axios'

export const GET_ALL_EXERCISES = "GET_ALL_EXERCISES"

export const _getExercises = (exercises) => {
  return {
    type: GET_ALL_EXERCISES,
    exercises
  }
}

export const getExercises = () => {
  return async (dispatch) => {
    try{
      const {data: exercises } = await axios.get('/api/exercises')
      dispatch(_getExercises(exercises))
    } catch (error){
      console.log(error)
    }
  }
}

export default function reducer(state = [], action){
  switch(action.type){
    case GET_ALL_EXERCISES:
      return action.exercises
    default:
      return state
  }
}
