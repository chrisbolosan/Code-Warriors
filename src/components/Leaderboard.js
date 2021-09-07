import React from 'react';
import { connect } from 'react-redux';
import { setLeaderboard } from '../store/leaderboard';

class Leaderboard extends React.Component {
  componentDidMount() {
    this.props.setLeaderboard();
  }

  render() {
    return (
      <div id="leaderboard-container" className="flex">
        <h2 id="leaderboard-header">Leaderboard</h2>
        <div>
          {this.props.leaderboard.map((user) => (
            <div className="leaderboard-box flex">
              <p>{user.username}</p>
              <div className="leaderboard-info flex">
                <small id="leaderboard-rank">
                  {`${user.rank}, ${user.totalPoints} points`}
                </small>
                <small>Matches won: {user.matchesWon}</small>
              </div>
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
