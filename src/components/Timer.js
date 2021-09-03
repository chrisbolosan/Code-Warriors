
import React from "react";
import { Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { setTime } from "../store/timer";
import { connect } from "react-redux";
import clientSocket from "../socket/socket";
import { setBattle } from "../store/battle";


export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oneSubmission: false,
      secondsRemaining: 0

    };
  }

  componentDidMount() {

    console.log("GameLength", this.props.gameLength)
    console.log("Type of GameLength", typeof this.props.gameLength)

    this.setState({
     secondsRemaining: Number(this.props.gameLength) / 1000, // time in seconds
    })

    const { roomId, me } = this.props


    // start the timer
    this.startTime();

    // listen for when a user submits code to stop timer
    clientSocket.on('submitted', (info) => {
      // is the current user the same as the user who submitted the code
      if (me._id === info.playerId) {
        this.setState({
          oneSubmission: true,
        });
        // timer stops
        var _this = this;
        clearInterval(_this.countdown);
      } else {
        // if one person has already submitted
        if (this.state.oneSubmission === true) {
          clientSocket.emit('gameOver', roomId);
        } else {

          clientSocket.emit('opponentSubmitted', {
            roomId: roomId,
            id: me._id
          })
        }
      }
    });
  }

  async componentWillUnmount() {
    const { roomId, setBattle } = this.props;
    if (this.props.timer === 0) {
      console.log('TIMER OUT');
      clientSocket.emit('outOfTime', roomId);
      this.props.setTime(1000);
    }

    var _this = this;
    clearInterval(_this.countdown);
    await setBattle(roomId);
  }

  getMinutes() {
    return ('0' + Math.floor((this.state.secondsRemaining % 3600) / 60)).slice(
      -2
    );
  }

  getSeconds() {
    return ('0' + (this.state.secondsRemaining % 60)).slice(-2);
  }

  startTime() {
    var _this = this;
    this.countdown = setInterval(function () {
      _this.props.setTime(_this.state.secondsRemaining - 1);
      _this.setState({ secondsRemaining: _this.state.secondsRemaining - 1 });
      if (_this.state.secondsRemaining === 0) {
        clearInterval(_this.countdown);
      }
    }, 1000);
  }

  render() {
    const { timer } = this.props;
    if (timer === 0 && this.state.oneSubmission) {
      return (
        <div className="App">
          <Redirect to="/score" />
        </div>
      );
    } else if (timer === 0 && !this.state.oneSubmission) {
      return (
        <div className="App">
          {alert('You ran out of time! No points awarded. Try again!')}
          <Redirect to="/" />
        </div>
      );
    } else {
      return (
        <div className="timeContainer">
          <h1>Time Remaining</h1>
          <div className="time">
            {/* <span className="blockTimer">
              Time Remaining : {this.getMinutes()}
            </span>
            <span className="blockTimer"> :{this.getSeconds()}</span> */}

            <span className="blockTimer">
              <span>{this.getMinutes()}</span>
            </span>
            <span className="blockcolon">
              <span className="colon">:</span>
            </span>
            <span className="blockTimer">
              <span>{this.getSeconds()}</span>
            </span>
          </div>
        </div>
        // </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    timer: state.timer,
    me: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setTime: (time) => {
      dispatch(setTime(time));
    },
    setBattle: (battle) => {
      dispatch(setBattle(battle));
    },
  };
};

export default connect(mapState, mapDispatch)(Timer);
