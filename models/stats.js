var Oid = require('mongodb').ObjectId;
var mongoose = require('mongoose');

var connection = mongoose.createConnection('mongodb://localhost/BA');
var db = mongoose.connection;
db
    .on('error', function() {
        console.log("error with stat database connection");
    })
    .once('open', function() {
        console.log("connected to stat database");
});


var statSchema = mongoose.Schema({
    userID      : Oid,
    level       : Number,
    problemID   : String,
    takenAt     : Date,
    situation   : String

}, {
    collection: 'stats'
});


module.exports = mongoose.model('stats', statSchema);