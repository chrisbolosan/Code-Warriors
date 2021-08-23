import React from 'react';
import { connect } from 'react-redux';
import { fetchExercise } from '../store/exercise';
import { testSolution } from '../store/solution';
// import { updateExercise } from '../store/exercise.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/mode/javascript/javascript';
import { Controlled } from 'react-codemirror2';

class IDE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(userInput) {
    this.setState({ input: userInput });
  }

  handleSubmit() {
    this.props.testSolution('6122e58b5d3aad59a0799c10', this.state.input);
    console.log(this.props.solution);
    console.log(this.state.input);
  }

  async componentDidMount() {
    await this.props.fetchExercise('6122e58b5d3aad59a0799c10');
    this.setState({ input: this.props.exercise.exerciseBody });
  }

  render() {
    return (
      <div className="App">
        <>
          {this.props.exercise ? this.props.exercise.problemDescription : null}
        </>
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
            options={{
              lineWrapping: true,
              lint: true,
              mode: 'javascript',
              lineNumbers: true,
              theme: 'material',
              autoCloseBrackets: true,
            }}
          />
          <button type="submit" onClick={this.handleSubmit}>
            Run
          </button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    exercise: state.exercise,
    solution: state.solution,
  };
};

const mapDispatch = (dispatch) => {
  return {
    testSolution: (id, solution) => dispatch(testSolution(id, solution)),
    fetchExercise: (id) => dispatch(fetchExercise(id)),
  };
};

export default connect(mapState, mapDispatch)(IDE);
