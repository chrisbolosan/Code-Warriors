import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import exercise from './exercise.js';
import solution from './solution';
import leaderboard from "./leaderboard"
import auth from "./auth"
import battles from "./rooms"
import timer from './timer'
import battle from "./battle"
import profile from './user';


const reducer = combineReducers({
  auth,
  exercise,
  solution,
  leaderboard,
  battles,
  timer,
  battle,
  profile
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from './auth';
