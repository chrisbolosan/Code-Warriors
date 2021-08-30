import React from 'react';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setTime } from '../store/timer'
import { connect } from "react-redux";


export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: 300000 / 1000, //time in seconds
    };
    this.resetTime = this.resetTime.bind(this)
  }

  getHours() {
    return ('0' + Math.floor(this.state.secondsRemaining / 3600)).slice(-2);
  }
  getMinutes() {
    return ('0' + Math.floor((this.state.secondsRemaining % 3600) / 60)).slice(

      -2
    );
  }
  getSeconds() {
    return ('0' + (this.state.secondsRemaining % 60)).slice(-2);
  }

  resetTime() {
    var _this = this;

    this.reset = this.setState({
      secondsRemaining: (_this.state.secondsRemaining = 0),
    });
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


  pauseTime() {
    clearInterval(this.countdown);
  }

  render() {
    return (
      <div className='App'>
        <div className='timer-container'>
          <span className='bloc-timer'>
            Time Remaining : {this.getMinutes()}
          </span>
          <span className='bloc-timer'> :{this.getSeconds()}</span>
        </div>
        <div>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              toast.success('Code Challenge Begin', {
                position: 'top-center',

                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              this.startTime();
            }}
          >
            Start Battle
          </Button>
        </div>
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
