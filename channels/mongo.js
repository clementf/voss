var conf = require('../conf');
var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect(conf.channels.mongo.url, function(err, database){
  if(err) throw err;

  db = database;
});


module.exports = {
  send: function(collection, event, callback){
    db.collection(collection).insert({
      timestamp: event.timestamp,
      data: event.content
    }, callback)
  }
}
