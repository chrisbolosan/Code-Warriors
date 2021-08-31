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
export const setBattle = (battle) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/battles/${battle.roomId}`)
      dispatch(_setBattle(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// REDUCER
export function battle(state = {}, action) {
  switch (action.type) {
    case SET_BATTLE:
      return action.battle
    default:
      return state
  }
}
