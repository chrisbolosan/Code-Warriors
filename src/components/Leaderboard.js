import React from 'react';
import { connect } from 'react-redux';
import { setLeaderboard } from '../store/leaderboard';
import { Link } from 'react-router-dom';

// thunk api/users/leaderboard
class Leaderboard extends React.Component {
  componentDidMount() {
    this.props.setLeaderboard();
  }
  //needs material ui/bootstrap card
  render() {
    return (
      <div id="leaderboard-container" className="flex">
        <h1 id="leaderboard-header">Leaderboard</h1>
        <div>
          {this.props.leaderboard.map((user) => (
            <div className="leaderboard-box flex">
              <Link to={`/user/${user._id}`}>{user.username}</Link>
              <p>Points: {user.totalPoints}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    leaderboard: state.leaderboard,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setLeaderboard: (leaderboard) => dispatch(setLeaderboard(leaderboard)),
  };
};

export default connect(mapState, mapDispatch)(Leaderboard);
