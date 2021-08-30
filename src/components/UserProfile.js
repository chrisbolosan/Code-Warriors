import React from "react";
import { connect } from "react-redux";
// import { me } from '../store';

const UserProfile = (props) => {
  // const {
  //   match: {
  //     params: { id },
  //   },
  //   userId,
  // } = props;

  const { user } = props.location.state;
  console.log(user)
  //console.log("giveuspleaseid", userId);
  return (
    <div>
      <div>This is the user profile page.</div>
    </div>
  );
};

const mapState = (state) => ({
  isLoggedIn: !!state.auth._id,
  userId: state.auth._id,
});

export default connect(mapState, null)(UserProfile);
