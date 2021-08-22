/* public/sum.js */

function sum() {
  var args = Array.prototype.slice.call(arguments);

  // // Return the sum of the arguments
  return args.reduce(function(a, b) {
    return a + b
  }, 0);

}
