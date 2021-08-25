import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/mode/javascript/javascript";
import { Controlled } from "react-codemirror2";

class IDEOpponent extends React.Component {
  constructor(props) {
    super(props)
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
    }
    return (
      <div className="IDE">
        <div className="editor-container">
          {/* This is the IDE component from codemirror */}
          <Controlled
            // this is the onChange equivilent of the imported component
            // callback sets the input to the state as code
            value={this.props.functionText}
            className="code-mirror-wrapper"
            options={ options }
          />
        </div>
      </div>
    );
  }
}

export default IDEOpponent
