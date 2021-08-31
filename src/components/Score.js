import React from "react"
import { connect } from 'react-redux';
import clientSocket from '../socket/socket';
import axios from "axios"

class Score extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {

  }

  render() {
    const { battleId } = this.props

    return (
      <div>
        { battleId ? (
          <div>
            this is the battleId passed from game {battleId}
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
  };
};

// const mapDispatch = (dispatch) => {
//   return {

//   };
// };
export default connect(mapState, null)(Score)
