import React from "react"
import { connect } from 'react-redux';
import { setBattle } from "../store/battle"
import LeaveGame from './LeaveGame'
import clientSocket from '../socket/socket';

class Score extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    // this.getScore = this.getScore.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   setBattle()
  //   if (prevProps.battle !== this.props.battle) {
  //     this.setState({
  //       battle: this.props.battle[0]
  //     })
  //   }
  // }

    // if (this.state.player1.username && this.state.player2.username) {
    //   const { getScore } = this
    //   const { player1, player2 } = this.state
    //   const currentPlayerScore = getScore(player1, player2)
    //   const opponentPlayerScore = getScore(player2, player1)

    //   if (currentPlayerScore === opponentPlayerScore) {
    //     return <div>TIE!</div>
    //   } else if (currentPlayerScore > opponentPlayerScore) {
    //     return <div>YOU WON!</div>
    //   } else {
    //     return <div>you lost sorry</div>
    //   }

    // } else {
    //   return <div>Calculating scores...</div>
    // }

  // getScore(currentPlayer, opponentPlayer) {
  //   let currentPlayerScore = 0
  //   if (currentPlayer.success) {
  //     currentPlayerScore += 7
  //     if (currentPlayer.time > opponentPlayer.time) {
  //       currentPlayerScore += 5
  //     }
  //   }
  //   return currentPlayerScore
  // }


  componentDidMount() {
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
          score: player1Score
        },
        loser : {
          username: player2.username,
          score: player2Score
        }
      })
    } else {
      this.setState({
        winner: {
          username: player2.username,
          score: player2Score
        },
        loser : {
          username: player1.username,
          score: player1Score
        }
      })
    }
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
    // if (this.state.battle._id) {
    //   const { battle } = this.state

    //   if (this.state.battle.players.length === 2 ) {
    //     const currentPlayer = battle.players.filter(player => {
    //     return player.id === me._id
    //     })[0]

    //     const opponentPlayer = battle.players.filter(player => {
    //       return player.id !== me._id
    //   })[0]

    //   const currentPlayerScore = getScore(currentPlayer, opponentPlayer)
    //   const opponentScore = getScore(opponentPlayer, currentPlayer)

    //   const winner = currentPlayerScore > opponentScore ? currentPlayer : opponentPlayer

    //    // if they are tie (both codes dont work)
    //   if (currentPlayerScore === opponentScore) {
    //     return (
    //       <div id="score-container">
    //         <h2>Tie</h2>
    //         <div id="scores">
    //           <div>
    //             <p>{currentPlayer.username}</p>
    //             <p>Points: {currentPlayerScore}</p>
    //           </div>
    //           <div>
    //             <p>{opponentPlayer.username}</p>
    //             <p>Points: {opponentScore}</p>
    //           </div>
    //         </div>
    //         <LeaveGame currentPlayerScore={currentPlayerScore} me={me} />

    //       </div>
    //     )
    //   }
    //   else if (winner.id === currentPlayer.id) {
    //     // if the winner is the current player, show the crown and scores
    //     // button to home
    //     return (
    //       <div id="score-container">
    //         <img alt="won" src="crown.png" />
    //         <div id="scores">
    //           <div>
    //             <p>{currentPlayer.username}</p>
    //             <p>Points: {currentPlayerScore}</p>
    //           </div>
    //           <div>
    //             <p>{opponentPlayer.username}</p>
    //             <p>Points: {opponentScore}</p>
    //           </div>
    //         </div>
    //         <LeaveGame currentPlayerScore={currentPlayerScore} me={me} />
    //       </div>
    //     )
    //   } else {
    //     // if the winner is the opponent, show sad face and scores
    //     // button to home
    //     return (
    //       <div id="score-container">
    //         <img alt="lost" src="crying.png" />
    //         <div id="scores">
    //           <div>
    //             <p>{currentPlayer.username}</p>
    //             <p>Points: {currentPlayerScore}</p>
    //           </div>
    //           <div>
    //             <p>{opponentPlayer.username}</p>
    //             <p>Points: {opponentScore}</p>
    //           </div>
    //         </div>
    //         <LeaveGame currentPlayerScore={currentPlayerScore} me={me} />
    //       </div>
    //     )
    //   }
    // }

    //   } else {
    //   return (
    //     <div>Calculating scores...</div>
    //   )
    // }
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
