import axios from 'axios';

const GET_USER = 'GET_USER';

// ACTION CREATORS

export const _fetchUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

// THUNKS
export const fetchUser = (userID) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userID}`);
      dispatch(_fetchUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//REDUCER
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
