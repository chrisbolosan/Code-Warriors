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
      functionText: this.props.exercise,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.solutionObject.input !== this.props.solutionObject.input) {
      //Check if current socket id is same as sender socket idm which is on the solution obj
      if (this.props.solutionObject.playerId !== clientSocket.id) {
        //If not, set state and rerender dummy ide
        this.setState({ functionText: this.props.solutionObject.input });
      } else {
        //FUCK IT
        console.log('fucc it')
      }

    }
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
    return (
      <div className="IDE">
        <div className="editor-container">
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
