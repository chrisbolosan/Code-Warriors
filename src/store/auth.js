import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
const SIGN_UP = "SIGN_UP";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const signUp = (auth) => ({ type: SIGN_UP, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/api/users/${method}`, {
        username,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      console.log("i authenticated", res);
      dispatch(me());
      history.push("/");
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const signUpThunk = (username, password, email) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/auth/me`, {
      username,
      password,
      email,
    });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
    history.push("/");
  } catch (error) {
    return dispatch(signUp({ error }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case SIGN_UP:
      return action.auth;
    default:
      return state;
  }
}
