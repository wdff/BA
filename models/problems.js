var Oid = require('mongodb').ObjectId;
var mongoose = require('mongoose');

var connection = mongoose.createConnection('mongodb://localhost/BA');
var db = mongoose.connection;
db
    .on('error', function() {
        console.log("error with user database connection");
    })
    .once('open', function() {
        console.log("connected to user database");
    });



/**
 * Schema of the problems DB
 * @type {*}
 */
var Schema = mongoose.Schema;
var DBprob = new Schema({
    problem         : Object,
    problemString   : String,
    level           : Number,
    timeTaken       : Number,
    takenBy         : String,
    takenAt         : Date,
    solved          : Boolean,
    finished        : Boolean
}, {
    collection: 'problems'
});



module.exports = connection.model('DBproblem', DBprob);