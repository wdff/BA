var MongoClient = require('mongodb').MongoClient;
var db_singleton = null;

/**
 * MongoDB Connection Singleton
 * @param uri URI of the DB
 * @param options options for the connection
 * @param callback to be executed after connection
 * @returns {*} Connection instance
 */
module.exports = function getConnection(uri, options, callback) {
    if (db_singleton) {
        return callback(null, db_singleton);
    }
    MongoClient.connect(uri, options, function(err, db) {
        if (err) {
            console.log('Error creating database connection: ' + err);
        } else {
            console.log('Connected to database');
        }
        db_singleton = db;
        return callback(err, db_singleton);
    });
};