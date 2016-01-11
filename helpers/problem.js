var math = require('mathjs');



function isPrime(value) {
  for(var i = 2; i < value/2; i++) {
    if(value % i === 0) {
      return false;
    }
  }
  return value > 1;
}

function isPerfectSquare(value) {
  console.log('teste ' +value);
  var closestRoot = Math.round(Math.sqrt(value));
  console.log('closest root ' + closestRoot);
  var result = value == closestRoot * closestRoot;
  console.log('root*root = ' + closestRoot*closestRoot);
  console.log('result ' + result);
  return result;
}

function isInt(n) {
  return parseInt(n) === n;
}

var problem = {

  problem: [],

  operations: [
    "+",
    "-",
    "*",
    "/"
  ],

  clear: function() {
    this.problem = [];
    this.second = false;
  },

  randomFloat: function(maxSize, minSize, length) {
    minSize = minSize || 0;
    length = length || 1;
    return parseFloat(((Math.random() * (maxSize - minSize)) + minSize).toFixed(length));
  },

  randomNumber: function(maxSize, minSize) {
    minSize = minSize || 1;
    return Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
  },

  randomOperation: function(amount) {
    //console.dir("rand " + amount);
    if (amount == 2) {
      return this.operations[Math.round(Math.random())];
    }
    if (amount == 4) {
      //var val = min + (Math.random() * (max - min + 1)) + min;
      return this.operations[Math.floor(Math.random() * 4)];
    }
  },

  //determines if there was already a division in the problem (used for xx/xx +- xx/xx)
  second: false,

  addNonPrime: function(operand, maxSize, minSize) {
    var op = operand;
    if (operand == 2 || operand == 4) {
      op = this.randomOperation(operand);
    }

    var number;  // init with prime
    do {
      number = this.randomNumber(maxSize, minSize);
      console.log('generated NonPrime: ' + number);
    } while (isPrime(number));

    console.log('NonPrime ' + number);
    this.problem.push({
      value: number,
      operation: op
    });
    console.log('adding ' + op + ' ' + number);

  },



  // TODO endlosschleife bei floats (err)


  addFloat: function(operand, maxSize, minSize, length) {
    console.log('adding float');
    var op = operand;
    //console.log('operand oben ' + operand);
    //console.log('op oben ' + op);
    if (operand == 2 || operand == 4) {
      console.log('getting random operand');
      op = this.randomOperation(operand);
    }
    var number;
    if (op === '/') {
      var firstValue = this.second ? this.problem[2].value : this.problem[0].value;
      this.second = true;
      while (firstValue % number != 0) {
        console.log('creating new number for /  (' + firstValue + ' ' + number + ')');
        number = this.randomFloat(firstValue - 1, minSize. length);
      }
    } else {
      do {
        //console.log('getting float');
        number = this.randomFloat(maxSize, minSize, length);
        console.log('number: ' + number);
        console.log('ergebnis: ' + number * this.problem[0].value);
        console.log(!isInt(number * this.problem[0].value));
        console.log(isInt(number));


      } while ((!isInt(number * this.problem[0].value)) || isInt(number));
    }
    this.problem.push({
      value: number,
      operation: op
    });
    console.log('adding ' + op + ' ' + number);




  },

  addOperand: function(operand, maxSize, minSize) {
    var op = operand;
    //console.log('operand oben ' + operand);
    //console.log('op oben ' + op);
    if (operand == 2 || operand == 4) {
      console.log('getting random operand');
      op = this.randomOperation(operand);
    }
    var number;

    // if the operation is a division, make sure the result is an int
    if (op === '/') {
      var firstValue = this.second ? this.problem[2].value : this.problem[0].value;
      this.second = true;
      while (firstValue % number != 0) {
        console.log('creating new number for /  (' + firstValue + ' ' + number + ')');
        number = this.randomNumber(firstValue - 1, 2);
      }

    } else if (operand === 'sqrt') {
      do {
        number = this.randomNumber(maxSize, minSize);
      } while (!isPerfectSquare(number))


    } else {

      if (maxSize == 0) {   // maxSize == 0 generates just an operand (for roots)
        number = "";
      } else {
        number = this.randomNumber(maxSize, minSize);
      }

    }

    console.log('number ' + number);
    this.problem.push({
      value: number,
      operation: op
    });
    console.log('adding ' + op + ' ' + number);
  },





  /**
   * for level 1 (with two numbers). makes sure the result is positive
   */
  makePositiveResult: function() {
    if (this.problem[0].value <= this.problem[1].value) {
      console.log('switching ' + this.problem[0].value + '<=' + this.problem[1].value);
      var tmp = this.problem[0].value;
      this.problem[0].value = this.problem[1].value;
      this.problem[1].value = tmp;
      console.log('switched ' + this.problem[0].value + '<=' + this.problem[1].value);
    }
  },


  /**
   * returns the generated problem
   * @returns {Array}
   */
  getProblem: function() {
    return this.problem;
  }
};



/**
 * returns json
 */
module.exports.makeProblem = function(level) {

  level = parseInt(level);

  problem.clear();

  // IMPORTANT!
  // Operands with '/' are automatically tested so that the solution is always a clean int
  // For this to work, the number BEFORE has to be added by addNonPrime();

  switch (level) {
  /**
   * 3 + 5
   *
   * [+]
   * [1-10]
   * [+-]
   * [1-10]
   */
    case 1: {
      problem.addOperand('+', 10);
      problem.addOperand(2, 10);
      problem.makePositiveResult();
      return problem.getProblem();
    }


  /**
   * 4 * 16
   *
   * [+]
   * [2-20]
   * [+-/*]
   * [1-20]
   */
    case 2: {
      problem.addNonPrime('+', 50, 2);
      problem.addOperand(4, 50);
      return problem.getProblem();
    }

  /**
   * 75 + 37
   *
   * [+]
   * [1-100]
   * [+-]
   * [1-100]
   */
    case 3: {
      problem.addOperand('+', 100);
      problem.addOperand(2, 100);
      return problem.getProblem();
    }

  /**
   * 491 - 318
   *
   * [+]
   * [1-1000]
   * [+-]
   * [1-1000]
   */
    case 4: {
      problem.addOperand('+', 1000);
      problem.addOperand(2, 1000);
      return problem.getProblem();
    }

  /**
   * 548 + 614 - 245
   *
   * [+]
   * [1-1000]
   * [+-]
   * [1-1000]
   * [+-]
   * [1-1000]
   */
    case 5: {
      problem.addOperand('+', 1000);
      problem.addOperand(2, 1000);
      problem.addOperand(2, 1000);
      return problem.getProblem();
    }


  /**
   * 15 * 11 + 142 - 67
   *
   * [+]
   * [1-20]
   * [*]
   * [1-20]
   * [+]
   * [1-200]
   * [-]
   * [1-200]
   */
    case 6: {
      problem.addOperand('+', 20);
      problem.addOperand('*', 20);
      problem.addOperand('+', 200);
      problem.addOperand('-', 200);
      return problem.getProblem();
    }

  /**
   * 86 / 12 + 59
   *
   * [+]
   * [10-100]
   * [/]
   * [1-100]
   * [+-]
   * [1-100]
   */
    case 7: {
      problem.addNonPrime('+',100, 10);
      problem.addOperand('/',100);
      problem.addOperand(2, 100);
      return problem.getProblem();
    }

  /**
   * [+]
   * [1-1000] (non-prime)
   * [/]
   * [1-100]
   * [+-]
   * [1-1000] (non-prime)
   * [/]
   * [1-100]
   */
    case 8: {
      problem.addNonPrime('+', 1000);
      problem.addOperand('/', 100);
      problem.addNonPrime(2, 1000);
      problem.addOperand('/', 100);
      return problem.getProblem();
    }

  /**
   * [+]
   * [1000-9999]
   * [+-]
   * [1000-9999]
   * [+-]
   * [1000-9999]
   */
    case 9: {
      problem.addOperand('+', 9999, 1000);
      problem.addOperand(2, 9999, 1000);
      problem.addOperand(2, 9999, 1000);
      return problem.getProblem();
    }


  /**
   * [sqrt]
   * [9-500]
   * [+-]
   * [sqrt]
   * [9-500]
   */
    case 10: {
      problem.addOperand('sqrt', 500, 9);
      problem.addOperand(2, 0);
      problem.addOperand('sqrt', 500, 9);
      return problem.getProblem();
    }


    case 11: {
      problem.addOperand('+', 999999, 100000);
      problem.addOperand(2, 999999, 100000);
      problem.addOperand(2, 999999, 100000);
      return problem.getProblem();
    }

    case 12: {
      problem.addNonPrime('+',9999,1000);
      problem.addOperand('/',9999,1000);
      problem.addOperand('*',9999,1000);
      return problem.getProblem();
    }

    case 13: {
      problem.addOperand('sqrt', 9999, 1000);
      return problem.getProblem();
    }

    case 14: {
      problem.addOperand('+', 99999, 1000);
      problem.addOperand('*', 99999, 1000);
      return problem.getProblem();
    }

    case 15: {
      problem.addNonPrime('+', 99999, 10000);
      problem.addOperand('/', 9999, 100);
      return problem.getProblem();
    }

    case 16: {
      problem.addOperand('+', 999, 100);
      problem.addOperand('*', 999, 100);
      problem.addOperand('-', 999, 100);
      problem.addOperand('*', 999, 100);
      return problem.getProblem();
    }

    // ====================================    world championship levels

    case 20: {
      problem.addOperand('+', 9999999999, 1000000000);
      problem.addOperand('+', 9999999999, 1000000000);
      problem.addOperand('+', 9999999999, 1000000000);
      problem.addOperand('+', 9999999999, 1000000000);
      problem.addOperand('+', 9999999999, 1000000000);
      problem.addOperand('+', 9999999999, 1000000000);
      problem.addOperand('+', 9999999999, 1000000000);
      problem.addOperand('+', 9999999999, 1000000000);
      problem.addOperand('+', 9999999999, 1000000000);
      problem.addOperand('+', 9999999999, 1000000000);
      return problem.getProblem();
    }

    case 21: {
      problem.addOperand('+', 99999999, 10000000);
      problem.addOperand('*', 99999999, 10000000);
      return problem.getProblem();
    }

    case 22: {
      problem.addOperand('sqrt', 999999, 100000);
      return problem.getProblem();
    }

    case 23: {
      problem.addNonPrime('+', 9999999, 1000000);
      problem.addOperand('/', 999, 100);
      return problem.getProblem();
    }

    case 24: {
      problem.addOperand('+', 99999, 10000);
      problem.addOperand('*', 99999, 10000);
      problem.addOperand('-', 99999, 10000);
      problem.addOperand('*', 99999, 10000);
      return problem.getProblem();
    }





    default:
      console.log('default');
    break;


  }








/*

  var maxNumberSize = 10;
  var amountOfOperations = 2;
  var perRow = 2;
  var usePowers = false;
  var useRoots = false;
  var firstOperatorPositive = false;
  var resultPositive = false;

  /*
   10 zeichen
   10 zeilen
   +

   8 zeichen
   2 zeilen
   *

   sechsstellige wurzeln
   http://www.scientificpsychic.com/etc/square-root.html

   xx/xx * x.xxx

   7stellig / 3stellig

   5s * 5s - 5s * 5s








  if (level == 2) {
    maxNumberSize = 100;
  }


  if (level >= 1) {               // TODO zurücksetzen auf ==1
    var problem = [];



    //special test variables for level 1 to exclude negative results
    var num1 = randNum(maxNumberSize);
    var num2 = randNum(maxNumberSize);

    //console.log(num1);
    //console.log(num2);

    if (num1 <= num2) {
      //var tmp = num1;
      num1 = num2;
      num2 = tmp;
    }
    problem[0] = {
      value: num1,
      operation: "+"
    };
    problem[1] = {
      value: num2,
      operation: randOp(2)
    };
  }

  //console.log(problem[0].value);
  //console.log(problem[1].value);









  /*var problem = {
   "0": {
   "operation"     : "+",
   "value"         : 25
   },
   "1": {
   "operation"     : "-",
   "value"         : 37
   },
   "2": {
   "operation"    : "+",
   "value"         : 17
   }
   };
  return problem;

  */
};



/**
 * converts to string
 */
module.exports.asString = function(problem) {

  var problemString = "";

  var problemItems = Object.keys(problem).length;

  for (var i=0; i < problemItems; i++) {


    if (i > 0) { problemString += " ";}  //space between following items

    if (problem[i].operation == "sqrt") {
      problemString += "sqrt(" + problem[i].value + ") ";
      continue;
    }

    if (!(i == 0 && problem[i].operation == "+")) {
      problemString += problem[i].operation + " ";
    }



    problemString += problem[i].value || "";
  }
  return problemString;
};


/**
 * solves a STRING problem
 * @param problem
 */
module.exports.solve = function(problem) {
  return math.eval(problem);
};