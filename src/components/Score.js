import React from "react"
import { connect } from 'react-redux';
import clientSocket from '../socket/socket';
import { setBattle } from "../store/battle"
import axios from "axios"

class Score extends React.Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const { roomId, setBattle } = this.props
    await setBattle(roomId)
  }

  render() {
    const { roomId } = this.props

    return (
      <div>
        { roomId ? (
          <div>
            this is the roomId passed from game {roomId}
          </div>
        ): (
          <div>Loading.......</div>
        )}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    me: state.auth,
    solution: state.solution,
    battles: state.battles,
    timer: state.timer,
    battle: state.battle
  };
};

const mapDispatch = (dispatch) => {
  return {
    setBattle: (battle) => {
      dispatch(setBattle(battle))
    }
  };
};

export default connect(mapState, mapDispatch)(Score)
