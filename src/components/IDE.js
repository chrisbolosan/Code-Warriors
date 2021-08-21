import Editor from "./Editor";
import React, { useState } from "react";
// import JSrunner from "javascript-code-runner";

const testObj = {
  id: 1,
  codewarsLink:
    "https://www.codewars.com/kata/577d0a117a3dbd36170001c2/train/javascript",
  difficulty: "medium",
  starterCode: "function vaccineList(age, status, month) {  //Your code}",
  instructionsText:
    "Vaccinations for children under 5\nYou have been put in charge of administrating vaccinations for children in your local area. Write a function that will generate a list of vaccines for each child presented for vaccination, based on the child's age and vaccination history, and the month of the year.\nThe function takes three parameters: age, status and month\nThe parameter 'age' will be given in weeks up to 16 weeks, and thereafter in months. You can assume that children presented will be scheduled for vaccination (eg '16 weeks', '12 months' etc).\nThe parameter 'status' indicates if the child has missed a scheduled vaccination, and the argument will be a string that says 'up-to-date', or a scheduled stage (eg '8 weeks') that has been missed, in which case you need to add any missing shots to the list. Only one missed vaccination stage will be passed in per function call.\nIf the month is 'september', 'october' or 'november' add 'offer fluVaccine' to the list.\nMake sure there are no duplicates in the returned list, and sort it alphabetically.\nExample input and output\ninput     ('12 weeks', 'up-to-date', 'december')\noutput    ['fiveInOne', 'rotavirus']\n\ninput     ('12 months', '16 weeks', 'june')\noutput     ['fiveInOne', 'hibMenC', 'measlesMumpsRubella', 'meningitisB', 'pneumococcal']\n\ninput     ('40 months', '12 months', 'october') \noutput    ['hibMenC', 'measlesMumpsRubella', 'meningitisB', 'offer fluVaccine', 'preSchoolBooster']\nTo save you typing it up, here is the vaccinations list\nfiveInOne : ['8 weeks', '12 weeks', '16 weeks'],\n//Protects against: diphtheria, tetanus, whooping cough, polio and Hib (Haemophilus influenzae type b)\npneumococcal : ['8 weeks', '16 weeks'],\n//Protects against: some types of pneumococcal infection\nrotavirus : ['8 weeks', '12 weeks'],\n//Protects against: rotavirus infection, a common cause of childhood diarrhoea and sickness\nmeningitisB : ['8 weeks', '16 weeks', '12 months'],\n//Protects against: meningitis caused by meningococcal type B bacteria\nhibMenC : ['12 months'],\n//Protects against: Haemophilus influenzae type b (Hib), meningitis caused by meningococcal group C bacteria    \nmeaslesMumpsRubella : ['12 months', '40 months'],\n//Protects against: measles, mumps and rubella\nfluVaccine : ['september','october','november'],\n//Given at: annually in Sept/Oct\npreSchoolBooster : ['40 months']\n//Protects against: diphtheria, tetanus, whooping cough and polio",
  instructionsHTML:
    "<h3 id=\"vaccinations-for-children-under-5\">Vaccinations for children under 5</h3>\n<p>You have been put in charge of administrating vaccinations for children in your local area. Write a function that will generate a list of vaccines for each child presented for vaccination, based on the child's age and vaccination history, and the month of the year.</p>\n<h4 id=\"the-function-takes-three-parameters-age-status-and-month\">The function takes three parameters: age, status and month</h4>\n<ul>\n<li>The parameter 'age' will be given in weeks up to 16 weeks, and thereafter in months. You can assume that children presented will be scheduled for vaccination (eg '16 weeks', '12 months' etc).</li>\n<li>The parameter 'status' indicates if the child has missed a scheduled vaccination, and the argument will be a string that says 'up-to-date', or a scheduled stage (eg '8 weeks') that has been missed, in which case you need to add any missing shots to the list. Only one missed vaccination stage will be passed in per function call.</li>\n<li>If the month is 'september', 'october' or 'november' add 'offer fluVaccine' to the list.</li>\n<li>Make sure there are no duplicates in the returned list, and sort it alphabetically.</li>\n</ul>\n<h4 id=\"example-input-and-output\">Example input and output</h4>\n<pre><code>input     ('12 weeks', 'up-to-date', 'december')\noutput    ['fiveInOne', 'rotavirus']\n\ninput     ('12 months', '16 weeks', 'june')\noutput     ['fiveInOne', 'hibMenC', 'measlesMumpsRubella', 'meningitisB', 'pneumococcal']\n\ninput     ('40 months', '12 months', 'october') \noutput    ['hibMenC', 'measlesMumpsRubella', 'meningitisB', 'offer fluVaccine', 'preSchoolBooster']\n</code></pre>\n<h4 id=\"to-save-you-typing-it-up-here-is-the-vaccinations-list\">To save you typing it up, here is the vaccinations list</h4>\n<pre><code>fiveInOne : ['8 weeks', '12 weeks', '16 weeks'],\n//Protects against: diphtheria, tetanus, whooping cough, polio and Hib (Haemophilus influenzae type b)\npneumococcal : ['8 weeks', '16 weeks'],\n//Protects against: some types of pneumococcal infection\nrotavirus : ['8 weeks', '12 weeks'],\n//Protects against: rotavirus infection, a common cause of childhood diarrhoea and sickness\nmeningitisB : ['8 weeks', '16 weeks', '12 months'],\n//Protects against: meningitis caused by meningococcal type B bacteria\nhibMenC : ['12 months'],\n//Protects against: Haemophilus influenzae type b (Hib), meningitis caused by meningococcal group C bacteria    \nmeaslesMumpsRubella : ['12 months', '40 months'],\n//Protects against: measles, mumps and rubella\nfluVaccine : ['september','october','november'],\n//Given at: annually in Sept/Oct\npreSchoolBooster : ['40 months']\n//Protects against: diphtheria, tetanus, whooping cough and polio\n</code></pre>\n",
  tests:
    "describe(\"Tests\", () => {  it(\"test\", () => {Test.assertSimilar(vaccineList('12 weeks','up-to-date','december'), [, 'rotavirus'], \"Your list isn't returning what was expected.\");Test.assertSimilar(vaccineList('12 months','16 weeks','june'), [, 'hibMenC', 'measlesMumpsRubella', 'meningitisB', 'pneumococcal'], \"Your list isn't returning what was expected.\");Test.assertSimilar(vaccineList('40 months','12 months','october'), [,'measlesMumpsRubella','meningitisB','offer fluVaccine','preSchoolBooster'], \"Your list isn't returning what was expected.\");  });});",
};

function IDE() {

  const funcFrame = `function sum(a,b){

  }`

  const [code, setCode] = useState(funcFrame);
  const [html, setHtml] = useState("");


  const srcDoc = `
  <html>
    <body>${html}</body>
  </html>
  `;

  return (
    <div className="App">
      <div className="editor">
        <Editor onChange={setCode} value={code} />
      </div>
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"
      />
    </div>
  );
}

export default IDE;



  // function formatPrompt(prompt) {
  //   return `${prompt.slice(0, prompt.length - 1)}

  // }`;
  // }


  // function runCode() {
  //   let toRun = code + `${funcName}('dave')`
  //    const { result, message } = JSrunner(toRun);
  //    setHtml(result)
  //    console.log(result);
  //    console.log(message);
  // }
