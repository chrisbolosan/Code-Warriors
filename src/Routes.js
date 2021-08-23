import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter, Route, Switch, Redirect } from "react-router-dom"
import {me} from './store'
// import Home from "./components/Home"
//import Leaderboard from "./components/Leaderboard"
//import UserProfile from "./components/UserProfile"
import GuestHome from "./components/GuestHome"
import { Login, SignUp } from "./components/AuthForm"
import IDE from "./components/IDE";
// import { Login, SignUp } from "./components/AuthForm"


class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    return(
        <Switch>
          {// these routes are for non-logged in users, except for the ide
          }
          <Route exact path="/" component ={GuestHome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/IDE" component={IDE} />
        </Switch>
    )
  }
}

/*
          {isLoggedIn ? (
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/leaderboard" component={Leaderboard}
              />
              <Route path="/users/:username" component={UserProfile} />
              <Redirect to="/home" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/" exact component={GuestHome} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          )}

*/

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
