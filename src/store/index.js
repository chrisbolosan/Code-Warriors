import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import exercise from './exercise.js';
import solution from './solution';
import leaderboard from "./leaderboard"
import auth from "./auth"
import rooms from "./rooms"

const reducer = combineReducers({
  auth,
  exercise,
  solution,
  leaderboard,
  rooms
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from "./auth"
