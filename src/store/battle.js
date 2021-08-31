import axios from "axios"

// ACTION TYPES
const SET_BATTLE = "SET_BATTLE"

// ACTION CREATORS
export const _setBattle = (battle) => {
  return {
    type: SET_BATTLE,
    battle
  }
}

// THUNKS
export const setBattle = (roomId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/battles/${roomId}`)
      dispatch(_setBattle(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// REDUCER
export default function battle (state = {}, action) {
  switch (action.type) {
    case SET_BATTLE:
      return action.battle
    default:
      return state
  }
}
