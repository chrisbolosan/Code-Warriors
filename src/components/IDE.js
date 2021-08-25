import React from "react";
import { connect } from "react-redux";
//import { fetchExercise } from "../store/exercise";
//import { testSolution } from "../store/solution"; */
// import { updateExercise } from '../store/exercise.js';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/mode/javascript/javascript";
import { Controlled } from "react-codemirror2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    }
  }

 componentDidMount() {
  this.setState({input: this.props.exercise.exerciseBody})

  }

  // componentDidUpdate(prevProps){
  //   console.log('Previous Props: ', prevProps)
  //   console.log("Props: ", this.props)
  //   if(prevProps !== this.props){
  //     this.setState({ input: this.props.exercise.exerciseBody });
  //    }
  //   }

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
