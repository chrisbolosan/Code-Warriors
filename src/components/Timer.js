import React from 'react';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 300000 / 1000, //time in seconds
    };
  }
  
  getHours() {
    return ('0' + Math.floor(this.state.secondsElapsed / 3600)).slice(-2);
  }
  getMinutes() {
    return ('0' + Math.floor((this.state.secondsElapsed % 3600) / 60)).slice(

      -2
    );
  }
  getSeconds() {

    return ('0' + (this.state.secondsElapsed % 60)).slice(-2);
  }

  startTime() {
    var _this = this;
    this.countdown = setInterval(function () {
      _this.setState({ secondsElapsed: _this.state.secondsElapsed - 1 });
    }, 1000);
  }

  resetTime() {
    this.reset = this.setState({
      secondsElapsed: (this.state.secondsElapsed = 0),
    });
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
