import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/mode/javascript/javascript';
import { Controlled } from 'react-codemirror2';
import { connect } from 'react-redux';
import { fetchExercises } from '../store/exercises.js';
import React, { useState, useEffect } from 'react';

export function Editor(props) {
  const { onChange, value } = props;

  function handleChange(editor, data, value) {
    onChange(value);
  }

  async function runTest() {}

  return (
    <div className="editor-container">
      <Controlled
        onBeforeChange={handleChange}
        value={value}
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
      <button type="submit" onClick={runTest}>
        Run
      </button>
    </div>
  );
}

const mapState = (state) => {
  return {
    exercises: state.exercises,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchExercises: () => dispatch(fetchExercises()),
  };
};

export default connect(mapState, mapDispatch)(Editor);
