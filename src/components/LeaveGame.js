import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class LeaveGame extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  async componentWillUnmount() {
    await axios.put(`/api/users/${this.props.me._id}`, {
      totalPoints: this.props.currentPlayerScore,
    });
  }

  render() {
    return (
      <Link to="/">
        <button id="leave-game">Leave</button>
      </Link>
    );
  }
}

export default LeaveGame;
