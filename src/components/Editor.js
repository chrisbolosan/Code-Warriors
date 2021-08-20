import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import 'codemirror/addon/edit/closebrackets'
import "codemirror/mode/javascript/javascript";
import { Controlled } from "react-codemirror2";

export default function Editor(props) {

  const { onChange, value, runCode } = props


 function handleChange(editor, data, value) {
   onChange(value)
 }

  return (
    <div className="editor-container">

    <Controlled
    onBeforeChange={handleChange}
    value={value}

    className='code-mirror-wrapper'
    options={{
      lineWrapping: true,
      lint: true,
      mode: 'javascript',
      lineNumbers: true,
      theme: 'material',
      autoCloseBrackets: true
    }}
    />
    <button type='submit' onClick={runCode}>Run</button>
    </div>
  );
}
