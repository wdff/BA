var math = require('mathjs');

var operations = [
    "+",
    "-",
    "*",
    "/"
];


function randOp(amount) {
    if (amount == 2) {
        return operations[Math.round(Math.random())];
    }
    if (amount == 4) {
        //var val = min + (Math.random() * (max - min + 1)) + min;
        return operations[Math.floor(Math.random() * 4)];
    }

}

function randNum(maxSize) {
    return Math.ceil(Math.random() * maxSize);
}


/**
 * returns json
 */
module.exports.makeProblem = function(level) {

  var maxNumberSize = 10;

    if (level == 2) {
      maxNumberSize = 100;
    }


    if (level >= 1) {               // TODO zurücksetzen auf ==1
        var problem = {};

        var amountOfOperations = 2;


        //special test variables for level 1 to exclude negative results
        var num1 = randNum(maxNumberSize);
        var num2 = randNum(maxNumberSize);

        console.log(num1);
        console.log(num2);

        if (num1 <= num2) {
            var tmp = num1;
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

    console.log(problem[0].value);
    console.log(problem[1].value);

    for (var i = 0; i < amountOfOperations; i++) {



    }








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
 };*/
return problem;
};

/**
 * converts to string
 */
module.exports.asString = function(problem) {

    var problemString = "";

    var problemItems = Object.keys(problem).length;

    for (var i=0; i < problemItems; i++) {
        if (i > 0) { problemString += " ";}  //space between following items
        if (!(i == 0 && problem[i].operation == "+")) {
            problemString += problem[i].operation + " ";
        }
        problemString += problem[i].value;
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