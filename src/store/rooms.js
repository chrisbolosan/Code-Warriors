import axios from "axios"

// ACTION TYPES
const SET_ROOMS = "SET_ROOMS"

// ACTION CREATORS
export const _setRooms = (rooms) => {
  return {
    type: SET_ROOMS,
    rooms
  }
}

// THUNKS
export const setRooms = (rooms) => {
  return async (dispatch) => {
    try {
      const { data: openBattles } = await axios.get("/api/battles/open")
      dispatch(_setRooms(openBattles))
    } catch (error) {
      console.log(error)
    }
  }
}

// REDUCER
export default function battlesReducer(state = [], action) {
  switch (action.type) {
    case SET_ROOMS:
      return action.rooms
    default:
      return state
  }
}
