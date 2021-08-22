const fs = require('fs')

const test = `describe("#sum()", function () {
  context("with number arguments", function () {
    it("should return sum of arguments", function () {
      expect(sum(1, 2)).to.equal(3);
    });
  });
});
`

const func = `function sum(a,b){
	return a + b
  }`


async function createTestFile(tests) {
  try {
    fs.writeFile('public/sum.test.js', tests, (err) => {
      if (err) throw err
    })
  } catch (error) {
    console.log(error)
  }
}

async function createFuncFile(func) {
  try {
    fs.writeFile('public/sum2.js', func, (err) => {
      if (err) throw err
    })
  } catch (error) {
    console.log(error)
  }
}


createTestFile(test)
createFuncFile(func)

