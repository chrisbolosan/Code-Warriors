import axios from "axios"

// ACTION TYPES
const SET_ROOMS = "SET_ROOMS"
const ADD_ROOM = "ADD_ROOM"
const UPDATE_ROOM = "UPDATE_ROOM"

// ACTION CREATORS
export const _setRooms = (rooms) => {
  return {
    type: SET_ROOMS,
    rooms
  }
}

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
      dispatch(_updateRoom(room))
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
