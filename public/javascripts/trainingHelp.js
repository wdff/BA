$(document).ready(function() {
  var problem = $('p.problem');
  //console.dir(problem);

  var operationsToSearch = [
    '+',
    '-',
    '*',
    '/',
    'sqrt'
  ];

  function isInOperationsArray(op) {
    var len = operationsToSearch.length;
    while(len--) {
      if (op === operationsToSearch[len]) {
        return op;
      }
    }
    return false;
  }

  var operationsInProblem = [];

  // splits the problem String
  // checks which operations are used
  // fills the operationsInProblem array with them
  for (var i = 0;i < problem[0].childNodes.length; i++) {
    var char = problem[0].childNodes[i].data;
    //console.log(char);
    //console.log("isinarray: " + isInOperationsArray(char));

    if (isInOperationsArray(char)) {
      operationsInProblem.push(char);
    }
  }

  console.dir(operationsInProblem);



});