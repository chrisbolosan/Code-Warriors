import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../store/user';

class Account extends React.Component {
  componentDidMount(props) {
    this.props.fetchUser(this.props.match.params.userId);
  }

  render () {
    return (
      <div id="profile-container">
        <h1>Your Account</h1>
        <div id="profile" className="flex">
          <hr />
          <div className="username flex">
            <p>Username</p>
            <button>Change</button>
          </div>
          <hr />
          <div className="password flex">
            <p>Password</p>
            <button>Change</button>
          </div>
          <hr />
          <div className="email flex">
            <p>Email</p>
            <p>{this.props.profile.email}</p>
          </div>
          <hr />
        </div>
      </div>
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

export default connect(mapState, mapDispatch)(Account)
