//ACTION CONSTS
const SET_TIME = "SET_TIME"


//ACTION CREATORS
export const _setTime = (time) => {
  return {
    type: SET_TIME,
    time
  }
}


// THUNKS
export const setTime = (time) => {
  return (dispatch) => {
    try {
      dispatch(_setTime(time))
    } catch (error) {
      console.log(error)
    }
  }
}



// REDUCERS
export default function timeReducer(state = "", action) {
  switch (action.type) {
    case SET_TIME:
      return action.time
    default:
      return state
  }
}
