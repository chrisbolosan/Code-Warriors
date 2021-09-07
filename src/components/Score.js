import React from "react"
import { connect } from 'react-redux';
import { setBattle } from "../store/battle"
import LeaveGame from './LeaveGame'
import axios from "axios"
// import clientSocket from '../socket/socket';

class Score extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  async componentDidMount() {
    const { player1, player2 } = this.props
    let player1Score = 0
    let player2Score = 0

    if (player1.success) {
      player1Score += 7
      if (player1.time > player2.time) {
        player1Score += 5
      }
    }

    if (player2.success) {
      player2Score += 7
      if (player2.time > player1.time) {
        player2Score += 5
      }
    }

    if (player1Score === player2Score) {
      this.setState({
        tie: true
      })
    } else if (player1Score > player2Score) {
      this.setState({
        winner: {
          username: player1.username,
          score: player1Score,
          id: player1.playerId
        },
        loser : {
          username: player2.username,
          score: player2Score,
          id: player2.playerId
        }
      })
    } else {
      this.setState({
        winner: {
          username: player2.username,
          score: player2Score,
          id: player2.playerId
        },
        loser : {
          username: player1.username,
          score: player1Score,
          id: player1.playerId
        }
      })
    }
  }

 async componentWillUnmount() {
    if (this.state.tie) {
      const matchesPlayed = this.props.me.matchesPlayed + 1
      await axios.put("/api/users/updateLosingUser", {
        id: this.props.me._id,
        newPlayed: matchesPlayed
      })
    } else if (this.props.me._id === this.state.winner.id) {
      const matchesWon = this.props.me.matchesWon + 1
      const matchesPlayed = this.props.me.matchesPlayed + 1

      await axios.put("/api/users/updateWinningUser", {
        id: this.props.me._id,
        newWon: matchesWon,
        newPlayed: matchesPlayed,

      })

      await axios.put(`/api/users/${this.props.me._id}`, {
        totalPoints: this.state.winner.score
      })
    } else {
      const matchesPlayed = this.props.me.matchesPlayed + 1
      await axios.put("/api/users/updateLosingUser", {
        id: this.props.me._id,
        newPlayed: matchesPlayed
      })

      await axios.put(`/api/users/${this.props.me._id}`, {
        totalPoints: this.state.loser.score
      })
    }
    window.location.reload();
  }



  render() {
    const  { me } = this.props
    return (
      <div id="score-container">
        {this.state.winner || this.state.tie ? (
          <div>
            {this.state.tie ? (
              <div className="score-box">
                <p className="score-title">Tie!</p>
              </div>
            ) : (
              <div>
                {this.state.winner.username === me.username ? (
                  <div className="score-box flex">
                    <img alt="crown" src="crown.png"/>
                    <div className="score-people flex">
                      <div className="flex winner">
                        <p className="winner-username">{this.state.winner.username}</p>
                        <p className="winner-score">{this.state.winner.score} points</p>
                      </div>
                      <div className="flex loser">
                        <p className="loser-username">{this.state.loser.username}</p>
                        <p className="loser-score">{this.state.loser.score} points</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="score-box flex">
                    <img alt="crying" src="crying.png" />
                    <div className="score-people flex">
                      <div className="flex loser">
                        <p className="loser-username">{this.state.loser.username}</p>
                        <p className="loser-score">{this.state.loser.score} points</p>
                      </div>
                      <div className="flex winner">
                        <p className="winner-username">{this.state.winner.username}</p>
                        <p className="winner-score">{this.state.winner.score} points</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>Calculating scores....</p>
        )}
        <LeaveGame />
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
