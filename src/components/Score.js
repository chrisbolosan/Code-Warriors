import React from "react"
import { connect } from 'react-redux';
import clientSocket from '../socket/socket';
import { setBattle } from "../store/battle"
import axios from "axios"

class Score extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPlayer: 0,
      opponant: 0,
      battle: {}
    }
    this.getScore = this.getScore.bind(this);

  }

  // async componentDidMount() {
  //   // const { roomId, setBattle } = this.props
  //   // await setBattle(roomId)
  //   // const currentPlayer = this.props.me

  //   const battle = this.props.battle;

  //   // const players = battle.players;


  //   // this.setState({
  //   //   player1Score: this.getWinner()
  //   // })
  // }


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
    // let playerScore = 0;
    // if (player.time > opponant.time) playerScore += 5;
    // if (player.solution) playerScore += 7;
    // return playerScore;
  }


  render() {
    const { roomId, me } = this.props
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

      console.log("current player score", currentPlayerScore)
      console.log("opponent player score", opponentScore)


      return (
        <div>
          { roomId ? (
            <div>
              this is the roomId passed from game {roomId}
            </div>
          ): (
            <div>Loading.......</div>
          )}
        </div>
      )
    } else {
      return <div>LOADING.....</div>
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
