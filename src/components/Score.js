import React from "react"
import { connect } from 'react-redux';


class Score extends React.Component {

  render() {
    return (
      <div>DONE</div>
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
