import React from 'react';
import { connect } from 'react-redux';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/mode/javascript/javascript';
import { Controlled } from 'react-codemirror2';
import clientSocket from '../socket/socket';
import { updateRoom, updatePlayer } from '../store/rooms';

class IDE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      playerId: '',
      roomId: '',
      submitDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRun = this.handleRun.bind(this);
  }

  async handleChange(userInput) {
    this.setState({ input: userInput });

    //Emit the solution and clientId in an object
    clientSocket.emit(`solution`, this.state);
  }

  // when a user clicks "RUN"
  async handleRun(event) {
    event.preventDefault();
    await this.props.runTestIDE(this.props.exercise.test, this.state.input);
  }

  // when a user clicks "SUBMIT"
  async handleSubmit(event) {
    // tell server client has submitted their solution
    clientSocket.emit("submitted", {
      roomId: this.state.roomId,
      playerId: this.props.me._id
    })
    // submit button gets disabled
    this.setState({
      submitDisabled: true,
    });

    event.preventDefault();
      await this.props.submitSolution(
        this.props.exercise._id,
        this.state.input
      );
    // all players in the room
    let players = this.state.room.players;

    // the current player
    let currentPlayerId = this.props.me._id;

    let updatedPlayerIdx = 0

    // returns the updated player and their index.
    const updatedPlayers = players.map((player , idx) => {
      if (player.id === currentPlayerId) {
        updatedPlayerIdx = idx
        return ({
          ...player,
          time: this.props.timer,
          submitted: true,
          solution: this.props.solution.success
        })
      } else {
        return player
      }
    })

    const updatedPlayer = updatedPlayers[updatedPlayerIdx]
    const battleId = this.state.room._id

    const { updatePlayer } = this.props
    updatePlayer(updatedPlayer, battleId)
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.funcFrame !== this.props.funcFrame) {
      this.setState({
        input: this.props.funcFrame,
      });
    }
    if (prevProps.room !== this.props.room) {
      this.setState({
        room: this.props.room,
      });
    }

    if (prevProps.submitDisabled !== this.props.submitDisabled) {
      this.setState({
        submitDisabled: this.props.submitDisabled,
      });
    }
  }

  async componentDidMount() {
    //sets state to the exercise body and client socket Id
    this.setState({
      input: this.props.funcFrame,
      playerId: clientSocket.id,
      roomId: this.props.roomId,
    });
  }

  render() {
      let options = {
        lineWrapping: true,
        lint: true,
        mode: 'javascript',
        lineNumbers: true,
        theme: 'material',
        autoCloseBrackets: true,
      };

    return (
      <div className="IDE IDE1">
        {/* user info */}
        {/* <div className="user-info">
          <small>{me.username}   rank: {me.rank}   points: {me.totalPoints}</small>
        </div> */}

        <div className="ide-submit-run flex">
          <p className="your-solution">Your solution</p>

          <div>
            {/* RUN BUTTON  */}
            <button
              className="ide-run"
              type="submit"
              onClick={this.handleRun}
              disabled={this.state.submitDisabled}
            >
              Run Code
            </button>
            {/* SUBMIT */}
            <button
              type="submit"
              className="ide-submit"
              onClick={this.handleSubmit}
              disabled={this.state.submitDisabled}
            >
              Submit Code
            </button>
          </div>
        </div>

        {/* IDE */}
        <div className="editor-container">
          {/* This is the IDE component from codemirror */}
          <Controlled
            // this is the onChange equivalent of the imported component
            // callback sets the input to the state as code
            onBeforeChange={(editor, data, value) => {
              this.handleChange(value);
            }}
            value={this.state.input}
            className="code-mirror-wrapper"
            options={options}
          />
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
    timer: state.timer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateRoom: (room, roomId) => {
      dispatch(updateRoom(room, roomId));
    },
    updatePlayer: (updatedPlayer, battleId) => {
      dispatch(updatePlayer(updatedPlayer, battleId))
    }
  };
};

export default connect(mapState, mapDispatch)(IDE);
