var express = require('express');
var router = express.Router();

var problemMaker = require('../helpers/problem.js');  //problem HELPER
var DBproblem = require('../models/problems.js'); //problem MODEL
/*var stats = require('../models/stats.js');*/
var user = require('../models/users.js');


router.get('/', function(req, res) {
    res.render('training-front', {user: req.user, title: 'Training'});
});



router.get('/:level/', function(req, res) {

    var level               = req.params.level;
    var currentProblem      = problemMaker.makeProblem(level);

    // convert the problem to a string
    var problemString = problemMaker.asString(currentProblem);

    var problem = new DBproblem({
        problem         : currentProblem,
        problemString   : problemString,
        level           : level,
        timeTaken       : 0,        // time in seconds needed to solve
        takenBy         : '',       // Oid of the user OR '' when not taken, 'not logged in' when not logged in
        takenAt         : '',       // date of the attempt
        solved          : false,    // if solved CORRECTLY
        finished        : false     // if attempted
    });

    console.log('problem created');

    console.dir(currentProblem);


    problem.save(function(err, result) {
        if (err) {console.log(err, result);}
        else {
            console.log('Problem saved to database');
            var problemOid      = result._doc._id + '';
            //var problemString   = result._doc.problemString;
           res.render('training', {
               user             : req.user,
               title            : 'Training',
               level            : level,
               Oid              : problemOid,
               problemString    : problemString,
               problemObject    : JSON.stringify(currentProblem)
           });
        }
    });
});

router.post('/:level/checkSolution', function checkSolution(req, res) {
    var givenSolution       = req.body.solution;
    var problemOid          = req.body.Oid;
    var timeNeeded          = req.body.time;
    var wasSolved           = false;

    if (req.user) {
        var userId          = req.user._id;
    }


    console.log("checking solution " + givenSolution);

    DBproblem.findOne({ _id: problemOid}, function(err, result) {
        if(err) {console.log(err);}
        var problemString = result._doc.problemString;

        // get correct solution
        var problemSolution = problemMaker.solve(problemString);
        console.log("solution: " + problemSolution);

        // compare given solution with correct solution
        var correct = givenSolution == problemSolution;  //bool

        if (correct) {
            console.log('solution was correct');
            wasSolved = true;
            res.send("OK");
        } else {
            wasSolved = false;
            res.json({
                correctSolution: problemSolution
                                                                            //TODO hints for solving
            })
        }

        DBproblem.update({ _id: problemOid}, {
            finished    : true,
            timeTaken   : timeNeeded,
            takenBy     : userId || 'not logged in',
            solved      : wasSolved,
            takenAt     : new Date()
        }, function(err) {
            if (err) {console.dir(err);}
            else {console.log('problem set to finished');}
        });

    });


});

module.exports = router;
