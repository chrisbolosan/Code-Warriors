import axios from "axios"

// ACTION TYPES
const SET_ROOMS = "SET_ROOMS"
const ADD_ROOM = "ADD_ROOM"
const UPDATE_ROOM = "UPDATE_ROOM"
const DELETE_ROOM = "DELETE_ROOM"
const UPDATE_PLAYER = "UPDATE_PLAYER"

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

export const _deleteRoom = (room) => {
  return {
    type: DELETE_ROOM,
    room
  }
}

export const _updatePlayer = (updatedPlayer, battleId) => {
  return {
    type: UPDATE_PLAYER,
    updatedPlayer,
    battleId
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
      dispatch(_updateRoom(updatedRoom))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteRoom = (roomId) => {
  return async (dispatch) => {
    try {
      const { data: deletedRoom } = await axios.delete(`/api/battles/${roomId}`)
      dispatch(_deleteRoom(deletedRoom))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updatePlayer = (updatedPlayer, battleId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/battles/updatePlayer/${battleId}`, {
        battleId,
        updatedPlayer
      })
      dispatch(_updatePlayer(data, battleId))
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
    case DELETE_ROOM:
      return state.filter((room) => (
        room.roomId !== action.room.roomId
      ))
    case UPDATE_PLAYER:
      return state.map((room) => {
        if (room._id === action.battleId) {
          return room.players.map((updatedPlayer) => {
            if (updatedPlayer._id === action.playerId) {
              return action.updatedPlayer
            } else {
              return updatedPlayer
            }
          })
        } else {
          return room
        }
      })
    default:
      return state
  }
}
