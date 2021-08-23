import axios from 'axios';

// ACTION TYPES
const SET_LEADERBOARD = 'SET_LEADERBOARD';

// ACTION CREATORS
export const _setLeaderboard = (leaderboard) => {
  return {
    type: SET_LEADERBOARD,
    leaderboard
  };
};

// THUNKS
export const setLeaderboard = () => {
  return async (dispatch) => {
    const { data: leaderboard } = await axios.get("/api/users/leaderboard");
    dispatch(_setLeaderboard(leaderboard));
  };
};

// REDUCER
export default function exerciseReducer(state = [], action) {
  switch (action.type) {
    case SET_LEADERBOARD:
      return action.leaderboard;
    default:
      return state;
  }
}
