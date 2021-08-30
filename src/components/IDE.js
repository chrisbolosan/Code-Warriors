import React from "react";
import { connect } from "react-redux";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/mode/javascript/javascript";
import { Controlled } from "react-codemirror2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clientSocket from "../socket/socket";
import { updateRoom } from "../store/rooms";


class IDE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      playerId: "",
      roomId: "",
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.getWinner = this.getWinner.bind(this)
  }

  async handleChange(userInput) {
    await this.setState({ input: userInput });

    //Emit the solution and clientId in an object
    clientSocket.emit(`solution`, this.state);
  }

  // when a user clicks "RUN"
  async handleRun(event) {
    event.preventDefault();
    if (this.props.enabled) {
      await this.props.runTestIDE(this.props.exercise.test, this.state.input);
    }
  }

  getWinner(player, opponant) {
    let playerScore = 0;
    if (player.time > opponant.time) playerScore += 5;
    if (player.solution) playerScore += 5
    return playerScore
  }

  // when a user clicks "SUBMIT"
  async handleSubmit(event) {
    this.setState({
      submitted: true
    });
    event.preventDefault();
    if (this.props.enabled) {
      await this.props.submitSolution(
        this.props.exercise._id,
        this.state.input
      );
      this.props.result();
    }


    const players =  this.state.room.players
    const currentPlayerId = this.props.me._id;
    console.log("solution", this.props.solution)
    const updatedPlayers = players.map(player => {
      if (player.id === currentPlayerId) {
        return {
          ...player,
          time: this.props.timer,
          submitted: true,
          solution: this.props.solution.success
        }
      } else {
        return player
      }
    })

    await this.props.updateRoom(
      {
        players: updatedPlayers
      },
      this.state.room._id
    );

    const res = updatedPlayers.some(player => {
      return player.submitted === false
    })

    const [player1, player2] = updatedPlayers;


    console.log(player2)
    console.log(player1)


    if (!res) {
      const p1Score = this.getWinner(player1, player2);
      const p2Score = this.getWinner(player2, player1)
      const winner = p1Score > p2Score ? player1 : player2
      alert(winner.username)

    }

    console.log("players", updatedPlayers)


  }

  async componentDidUpdate(prevProps) {
    if (prevProps.exercise.exerciseBody !== this.props.exercise.exerciseBody) {
      this.setState({
        input: this.props.exercise.exerciseBody
      })
    }
    if (prevProps.room !== this.props.room) {
      this.setState({
        room: this.props.room
      })
    }
  }

  async componentDidMount() {
    //sets state to the exercise body and client socket Id
    await this.setState({
      input: this.props.exercise.exerciseBody,
      playerId: clientSocket.id,
      roomId: this.props.roomId
    });
  }

  render() {
    const me = this.props.me;
    // This code checks the status of enabled and sets options based on whether it is
    // enabled or not
    const { enabled } = this.props;
    let options;
    if (!enabled) {
      options = {
        lineWrapping: true,
        lint: true,
        mode: "javascript",
        lineNumbers: true,
        theme: "material",
        autoCloseBrackets: true,
        readOnly: true,
      };
    } else {
      options = {
        lineWrapping: true,
        lint: true,
        mode: "javascript",
        lineNumbers: true,
        theme: "material",
        autoCloseBrackets: true,
      };
    }
    return (
      <div className="IDE">
        <div className="user-info">
          <small>{me.username}</small>
          <small>Rank: {me.rank}</small>
          <small>Points: {me.totalPoints}</small>
        </div>

        <div className="editor-container">
          {/* This is the IDE component from codemirror */}
          <Controlled
            // this is the onChange equivilent of the imported component
            // callback sets the input to the state as code
            onBeforeChange={(editor, data, value) => {
              this.handleChange(value);
            }}
            value={this.state.input}
            className="code-mirror-wrapper"
            options={options}
          />

            <div>
              <button
                type="submit"
                onClick={this.handleRun}
              >
                Run
              </button>
              <button
                type="submit"
                onClick={this.handleSubmit}
                disabled={this.state.submitted ? true : false}
              >
                Submit
              </button>
              <ToastContainer />
            </div>

        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    me: state.auth,
    solution: state.solution,
    battles: state.battles,
    timer: state.timer
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateRoom: (room, roomId) => {
      dispatch(updateRoom(room, roomId));
    },
  };
};

export default connect(mapState, mapDispatch)(IDE);
