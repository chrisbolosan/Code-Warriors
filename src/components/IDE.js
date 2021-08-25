import React from "react";
import { connect } from "react-redux";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/mode/javascript/javascript";
import { Controlled } from "react-codemirror2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "socket.io-client"

// window.location.origin describes the URL of the page we're on
const clientSocket = socket(window.location.origin)

// Run when connected to server
clientSocket.on("connect", () => {
  console.log("Connected to server")
})

clientSocket.on("message", message => {
  console.log(message)
})

clientSocket.on("solution", solutionText => {
  const newDiv = document.createElement("div")
  newDiv.innerText = solutionText
  const testing = document.getElementById("testing")
  testing.appendChild(newDiv)

})

class IDE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 handleChange(userInput) {
    this.setState({ input: userInput });
  }

  async handleSubmit(event) {
    event.preventDefault()
    if(this.props.enabled){
      await this.props.testSolution("6123caa2a0b84caf217f3dc3", this.state.input);
      this.props.result()
      clientSocket.emit(`solution`, this.state.input)
    }
  }

 componentDidMount() {
  this.setState({input: this.props.exercise.exerciseBody})
  }

  render() {
    const {enabled} = this.props;
    let options;
    if(!enabled){
      options = {
        lineWrapping: true,
        lint: true,
        mode: "javascript",
        lineNumbers: true,
        theme: "material",
        autoCloseBrackets: true,
        readOnly: true,
      }
    } else {
      options = {
        lineWrapping: true,
        lint: true,
        mode: "javascript",
        lineNumbers: true,
        theme: "material",
        autoCloseBrackets: true,
      }
    }
    return (

      <div className="IDE">

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
            options={ options }
          />

          <div>
          <button type="submit" onClick={this.handleSubmit} disabled={!enabled}>
            Run
          </button>
            <ToastContainer />
          </div>
        </div>
        <div id="testing">
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    solution: state.solution
  }
}
export default connect(mapState, null)(IDE);
