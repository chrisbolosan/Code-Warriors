import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../store/user';

class UserProfile extends React.Component {
  componentDidMount(props) {
    this.props.fetchUser(this.props.match.params.userId);
  }

  render() {
    return (
      <>
        <h1 className="user-header">User Profile</h1>
        <div id="userprofile">
          <hr />
          <div className="username">
            <h3>Username</h3>
            <p>{this.props.profile.username}</p>
          </div>
          <hr />
          <div className="email">
            <h3>Email</h3>
            <p>{this.props.profile.email}</p>
          </div>
          <hr />
          <div className="rank">
            <h3>Rank</h3>
            <p>{this.props.profile.rank}</p>
          </div>
          <hr />
          <div className="total-points">
            <h3>Total Points</h3>
            <p>{this.props.profile.totalPoints}</p>
          </div>
          <hr />
        </div>
      </>
    );
  }
}
const mapState = (state) => {
  return { profile: state.profile };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUser: (userID) => dispatch(fetchUser(userID)),
  };
};

export default connect(mapState, mapDispatch)(UserProfile);
