const Jsrunner = require('javascript-code-runner');


function runTest(test, userSolution) {

    const problem = `${userSolution} ${test}`;
    const { result, message } = Jsrunner(problem);

    if (result === 'false') {
      return {
        success: false,
        message: 'Solution does not match test requirements',
      };
    } else if (message) {
      return { success: false, message };
    } else {
      return {
        success: true,
        message: 'tests passed',
      };
    }
}


module.exports = {
  runTest
}
