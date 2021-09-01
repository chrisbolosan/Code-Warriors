import React from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
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
      secondsRemaining: 300000 / 1000, // time in seconds
    };
  }

  componentDidMount() {
    const { roomId, me } = this.props

    // start the timer
    this.startTime();

    // listen for when a user submits code to stop timer
    clientSocket.on("submitted", (info) => {
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
          clientSocket.emit("gameOver", roomId);
        } else {
          console.log("UR OPPONENT SUBMITTED THEIR SOLUTION!");
        }
      }
    });
  }

  async componentWillUnmount() {
    const { roomId, setBattle } = this.props;

    var _this = this;
    clearInterval(_this.countdown);
    await setBattle(roomId)
  }

  getMinutes() {
    return ("0" + Math.floor((this.state.secondsRemaining % 3600) / 60)).slice(
      -2
    );
  }

  getSeconds() {
    return ("0" + (this.state.secondsRemaining % 60)).slice(-2);
  }

  startTime() {
    var _this = this;
    this.countdown = setInterval(function () {
      _this.props.setTime(_this.state.secondsRemaining - 1);
      _this.setState({ secondsRemaining: _this.state.secondsRemaining - 1 });
      if (!_this.state.secondsRemaining) {
        clearInterval(_this.countdown);
      }
    }, 1000);
  }

  render() {
    const { timer } = this.props;
    return (
      <div className="App">
        {timer === 0 ? (
          <Redirect to="/score" />
        ) : (
          <div className="timer-container">
            <span className="bloc-timer">
              Time Remaining : {this.getMinutes()}
            </span>
            <span className="bloc-timer"> :{this.getSeconds()}</span>
          </div>
        )}
      </div>
    );
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
