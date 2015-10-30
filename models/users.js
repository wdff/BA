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
 * Schema of the users DB
 * @type {*}
 */
var Schema = mongoose.Schema;
var UserDetail = new Schema({
    username    : String,
    salt        : String,
    password    : String,
    firstName   : String,
    lastName    : String,
    email       : String,
    role        : String
}, {
    collection: 'users'
});



module.exports = connection.model('DBuser', UserDetail);