import React from "react"
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setBattle } from "../store/battle"
import axios from "axios"

class Score extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPlayer: 0,
      battle: {}
    }
    this.getScore = this.getScore.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.battle !== this.props.battle) {
      this.setState({
        battle: this.props.battle[0]
      })
    }
  }

  getScore(currentPlayer, opponentPlayer) {
    let currentPlayerScore = 0
    if (currentPlayer.solution) {
      currentPlayerScore += 7
      if (currentPlayer.time > opponentPlayer.time) {
        currentPlayerScore += 5
      }
    }
    return currentPlayerScore
  }

  render() {
    const { me } = this.props
    const { getScore } = this

    if (this.state.battle._id) {
      const { battle } = this.state

      const currentPlayer = battle.players.filter(player => {
       return player.id === me._id
      })[0]

      const opponentPlayer = battle.players.filter(player => {
        return player.id !== me._id
      })[0]

      const currentPlayerScore = getScore(currentPlayer, opponentPlayer)
      const opponentScore = getScore(opponentPlayer, currentPlayer)

      const winner = currentPlayerScore > opponentScore ? currentPlayer : opponentPlayer

      // if they are tie (both codes dont work)
      if (currentPlayerScore === opponentScore) {
        return (
          <div id="score-container">
            <h2>Tie</h2>
            <div id="scores">
              <div>
                <p>{currentPlayer.username}</p>
                <p>Points: {currentPlayerScore}</p>
              </div>
              <div>
                <p>{opponentPlayer.username}</p>
                <p>Points: {opponentScore}</p>
              </div>
            </div>
            <Link to={{
              pathname: "/",
              state: {
                currentPlayerScore: currentPlayerScore
              }
            }}>
              <button>Leave</button>
            </Link>
          </div>
        )
      }
      else if (winner.id === currentPlayer.id) {
        // if the winner is the current player, show the crown and scores
        // button to home
        return (
          <div id="score-container">
            <img alt="won" src="crown.png" />
            <div id="scores">
              <div>
                <p>{currentPlayer.username}</p>
                <p>Points: {currentPlayerScore}</p>
              </div>
              <div>
                <p>{opponentPlayer.username}</p>
                <p>Points: {opponentScore}</p>
              </div>
            </div>
            <Link to={{
              pathname: "/",
              state: {
                currentPlayerScore: currentPlayerScore
              }
            }}>
              <button>Leave</button>
            </Link>
          </div>
        )
      } else {
        // if the winner is the opponent, show sad face and scores
        // button to home
        return (
          <div id="score-container">
            <img alt="lost" src="crying.png" />
            <div id="scores">
              <div>
                <p>{currentPlayer.username}</p>
                <p>Points: {currentPlayerScore}</p>
              </div>
              <div>
                <p>{opponentPlayer.username}</p>
                <p>Points: {opponentScore}</p>
              </div>
            </div>
            <Link to={{
              pathname: "/",
              state: {
                currentPlayerScore: currentPlayerScore
              }
            }}>
              <button>Leave</button>
            </Link>
          </div>
        )
      }
    } else {
      return (
        <div>Calculating scores...</div>
      )
    }
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
