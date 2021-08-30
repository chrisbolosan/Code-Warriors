import React from 'react';
import { Redirect } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setTime } from '../store/timer'
import { connect } from "react-redux";
import clientSocket from "../socket/socket";
import { useEffect, useState } from "react"

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: 300000 / 1000, //time in seconds
    };
  }

  componentDidMount() {
    const { roomId } = this.props
    this.startTime()
    // clientSocket.emit("timer", {
    //   roomId: String(roomId)
    // })

    // clientSocket.on("timer", (time) => {
    //   const div = document.getElementById("timer")
    //   div.innerHTML = <><span>minutes</span><span>seconds</span></>
    // })
  }

  componentWillUnmount() {
    var _this = this;
    clearInterval(_this.countdown)
  }

  getMinutes() {
    return ('0' + Math.floor((this.state.secondsRemaining % 3600) / 60)).slice(-2)
  }

  getSeconds() {
    return ('0' + (this.state.secondsRemaining % 60)).slice(-2);
  }

  startTime() {
    var _this = this;
    this.countdown = setInterval(function () {
      _this.props.setTime(_this.state.secondsRemaining - 1)
      _this.setState({ secondsRemaining: _this.state.secondsRemaining - 1 });
      if (!_this.state.secondsRemaining) {
        clearInterval(_this.countdown)
      }
    }, 1000);
  }

  render() {
    const { timer } = this.props
    return (
      <div className='App'>
        {
          timer === 0 ? (
            <Redirect to="/score" />
          ) : (
            <div className='timer-container'>
              <span className='bloc-timer'>
                Time Remaining : {this.getMinutes()}
              </span>
              <span className='bloc-timer'> :{this.getSeconds()}</span>
            </div>
          )
        }
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    timer: state.timer
  };
};

const mapDispatch = (dispatch) => {
  return {
    setTime: (time) => {
      dispatch(setTime(time));
    },
  }
};

export default connect(mapState, mapDispatch)(Timer);
