import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/mode/javascript/javascript";
import { Controlled } from "react-codemirror2";

export default function Editor(props) {
  const { onChange, value } = props;

  function handleChange(editor, data, value) {
    onChange(value);
  }

  function setCode() {
    const funcScript = document.createElement("script");
    const testScript = document.createElement("script");

    funcScript.src = "/sum2.js";
    testScript.src = "/sum.test.js";

    document.body.appendChild(funcScript);
    document.body.appendChild(testScript);
  }

  async function runTest() {

    const runScript = document.createElement("script");


    runScript.innerText = "mocha.run()";


    document.body.appendChild(runScript);
    // console.log(value);
  }

  return (
    <div className="editor-container">
      <Controlled
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: "javascript",
          lineNumbers: true,
          theme: "material",
          autoCloseBrackets: true,
        }}
      />
        <button type="submit" onClick={setCode}>
        Set Code
      </button>
      <button type="submit" onClick={runTest}>
        Run
      </button>
    </div>
  );
}
