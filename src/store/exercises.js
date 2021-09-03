import axios from 'axios'

export const GET_ALL_EXERCISES = "GET_ALL_EXERCISES"
export const FILTERED_EXERCISES = "FILTERED_EXERCISES"

export const _getExercises = (exercises) => {
  return {
    type: GET_ALL_EXERCISES,
    exercises
  }
}

export const _filterExercises = (exercises) => {
  return {
    type: FILTERED_EXERCISES,
    exercises
  }
}
export const getExercises = () => {
  return async (dispatch) => {
    try{
      const {data: exercises } = await axios.get('/api/exercises')
      console.log('From Redux', exercises)
      dispatch(_getExercises(exercises))
    } catch (error){
      console.log(error)
    }
  }
}

export const filterExercises = (filterType, value) => {
  return async (dispatch) => {
    try {
      const {data: exercises} = await axios.get('/api/exercises/')
      const filteredExercises = exercises.filter(exercise => value === exercise[filterType]
      )
        dispatch(_filterExercises(filteredExercises))
    } catch(err){
      console.log(err)
    }
  }

}
export default function reducer(state = [], action){
  switch(action.type){
    case GET_ALL_EXERCISES:
      return action.exercises
    case FILTERED_EXERCISES:
      return action.exercises
    default:
      return state
  }
}
