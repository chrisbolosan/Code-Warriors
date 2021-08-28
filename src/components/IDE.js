import React from "react";
import { connect } from "react-redux";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/mode/javascript/javascript";
import { Controlled } from "react-codemirror2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clientSocket from "../socket/socket"

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
    this.handleRun = this.handleRun.bind(this)
  }


 handleChange(userInput) {
    this.setState({ input: userInput });

    //Emit the solution and clientId in an object
    clientSocket.emit(`solution`, this.state)
  }

  // when a user clicks "RUN"
  async handleRun(event) {
    event.preventDefault()
    if(this.props.enabled){
    await this.props.runTestIDE(this.props.exercise.test, this.state.input)
    }
  }

  // when a user clicks "SUBMIT"
  async handleSubmit(event) {
    this.setState({ submitted: true })
    event.preventDefault()
    if(this.props.enabled){
      await this.props.submitSolution(this.props.exercise._id, this.state.input);
      this.props.result()

    }
  }


  componentDidMount() {
    //sets state to the exercise body and client socket Id
    console.log(this.props)
    this.setState({
      input: this.props.exercise.exerciseBody,
      playerId: clientSocket.id,
      roomId: this.props.roomId
    })
  }

  render() {
    const me = this.props.me

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
            options={ options }
          />
            {this.state.submitted === false ? (
              <div>
                <button type="submit" onClick={this.handleRun} disabled={!enabled}>
                  Run
                </button>
                <button type="submit" onClick={this.handleSubmit} disabled={!enabled}>
                  Submit
                </button>
                <ToastContainer />
              </div>
            ) : ( null
            )}
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    me: state.auth,
    solution: state.solution,
    exercise: state.exercise
  }
}

export default connect(mapState, null)(IDE);
