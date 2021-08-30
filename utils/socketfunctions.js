let secondsRemaining = 300000 / 1000

function getMinutes() {
    return ('0' + Math.floor((secondsRemaining % 3600) / 60)).slice(-2)
  }

function getSeconds() {
    return ('0' + (secondsRemaining % 60)).slice(-2);
  }

// function startTime() {
//     this.countdown = setInterval(function () {

//     }, 1000);
//   }

module.exports = {
  getMinutes,
  getSeconds
}
