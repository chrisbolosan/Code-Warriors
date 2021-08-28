import axios from "axios"

// ACTION TYPES
const SET_ROOMS = "SET_ROOMS"
const ADD_ROOM = "ADD_ROOM"
const UPDATE_ROOM = "UPDATE_ROOM"
// const SET_ROOM = "SET_ROOM"


// ACTION CREATORS
export const _setRooms = (rooms) => {
  return {
    type: SET_ROOMS,
    rooms
  }
}


// export const _setRoom = (room) => {
//   return {
//     type: SET_ROOM,
//     room
//   }
// }


export const _addRoom = (room) => {
  return {
    type: ADD_ROOM,
    room
  }
}

export const _updateRoom = (room) => {
  return {
    type: UPDATE_ROOM,
    room
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

export const addRoom = (roomToAdd) => {
  return async (dispatch) => {
    try {
      const { data: newRoom } = await axios.post("/api/battles", roomToAdd)
      // dispatch(_setRoom(newRoom))
      dispatch(_addRoom(newRoom))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateRoom = (room, roomId) => {
  return async (dispatch) => {
    try {
      const { data: updatedRoom } = await axios.put(`/api/battles/${roomId}`, room)
      dispatch(_updateRoom(updatedRoom))
    } catch (error) {
      console.log(error)
    }
  }
}


// REDUCERS
export default function battleReducer(state = [], action) {
  switch (action.type) {
    case SET_ROOMS:
      return action.rooms
    case ADD_ROOM:
      return [...state, action.room]
    case UPDATE_ROOM:
      return state.map((room) => (
        room._id === action.room._id ? action.room : room
        ))
    default:
      return state
  }
}


// export function battle(state = {}, action) {
//   switch (action.type) {
//     case SET_ROOM:
//       return action.room
//     default:
//       return state
//   }
// }
