import React from "react"
import { connect } from "react-redux"
import { setLeaderboard } from "../store/leaderboard"


// thunk api/users/leaderboard
class Leaderboard extends React.Component {
  async componentDidMount() {
    await setLeaderboard()
  }

  render() {
    return (
      <div id="leaderboard-container">
        <h1>LEADERBOARD</h1>
        <ul>
          {this.props.leaderboard.map((user) => (
            <li>user</li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    leaderboard: state.leaderboard
  }
}

const mapDispatch = (dispatch) => {
  return {
    setLeaderboard: (leaderboard) => dispatch(setLeaderboard(leaderboard))
  }
}

export default connect(mapState, mapDispatch)(Leaderboard)
