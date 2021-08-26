import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { me } from './store';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import UserProfile from './components/UserProfile';
import GuestHome from './components/GuestHome';
import { Login, SignUp } from './components/AuthForm';
import Game from './components/Game';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn } = this.props;
    console.log(isLoggedIn);

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/IDE" component={Game} />
            <Route exact path="/user/:userId" component={UserProfile} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/IDE" component={Game} />
            <Route exact path="/" component={GuestHome} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/user/:userId" component={UserProfile} />
            <Route exact path="/leaderboard" component={Leaderboard} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth._id,
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
