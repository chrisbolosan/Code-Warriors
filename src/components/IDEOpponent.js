import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/mode/javascript/javascript";
import { Controlled } from "react-codemirror2";
import clientSocket from "../socket/socket";


class IDEOpponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      functionText: this.props.funcFrame,
      name: 'Opponent',
      rank: '0',
      points: '0'
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.funcFrame !== this.props.funcFrame) {
      this.setState({
        functionText: this.props.funcFrame
      })
    }

    if (prevProps.solutionObject.input !== this.props.solutionObject.input) {
      //Check if current socket id is same as sender socket id which is on the solution obj
      if (this.props.solutionObject.playerId !== clientSocket.id) {
        if(this.props.roomId === this.props.solutionObject.roomId) {
          this.setState({
            functionText: this.props.solutionObject.input,
          });
        } else {
          console.log('WRONG ROOM')
        }
        //If not, set state and rerender dummy ide
      } else {
        //Do nothing
        return
      }
    }
  }

  componentDidMount() {
    clientSocket.on('joinedRoom', (data) => {
      if (data.roomId === this.props.roomId) {
        // console.log(data.player1)
        // console.log(data.player2)
        const opponent = data.player1.id !== this.props.me._id ? data.player1 : data.player2
        this.setState({
          name: opponent.username,
          rank: opponent.rank,
          points: opponent.points
        })
      }
    })
  }

  render() {
    const options = {
      lineWrapping: true,
      lint: true,
      mode: "javascript",
      lineNumbers: true,
      theme: "material",
      autoCloseBrackets: true,
      readOnly: true,
    };

    console.log("this is opponent state", this.state)
    return (
      <div className="IDE IDE2">
        {/* <div className="user-info">
          {this.state.name === "Opponent" ? (
            <>
              <span id="waiting">Waiting for an opponent</span>
              <span id="wait">.</span>
            </>
          ) : (
            <>
              <small>{this.state.name}</small>
              <small>Rank: {this.state.rank}</small>
              <small>Points: {this.state.points}</small>
            </>
          )}
        </div> */}
  
        <div className="editor-container opponent">
          {/* This is the IDE component from codemirror */}
          <Controlled
            // this is the onChange equivilent of the imported component
            // callback sets the input to the state as code
            value={this.state.functionText}
            className="code-mirror-wrapper"
            options={options}
          />
        </div>
      </div>
    );
  }
}

export default IDEOpponent;
