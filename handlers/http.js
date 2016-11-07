var express = require('express');
var app = express();
var conf = require('../conf');
var validator = require('./validator.js');
var bodyParser = require('body-parser');

var slackChannel = require('../channels/slack');
var keenChannel = require('../channels/keen');
var mongoChannel = require('../channels/mongo');


/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
  extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post('/events', function(req, res) {
  if (validator.checkMessage(req.body)) {
    message = req.body;

    slackChannel.send(message.friendlyMessage, function(err, response) {
      if (err){
        console.log('error from slack : ' + err);
        res.status(400).send('Invalid request');
      }
    });

    keenChannel.send(message.eventType, message.content, function(err, res) {
      if (err){
        console.log('error from keen : ' + err);
        res.status(400).send('Invalid request');
      }
    });
    mongoChannel.send(message.eventType, message, function(err, res) {
      if (err){
        console.log('error from mongo : ' + err);
        res.status(400).send('Invalid request');
      }
    });
    res.status(201).send('');
  } else
    res.status(400).send('Invalid request');
});


module.exports = {
  listen: function() {
    if (!conf.http || !conf.http.port)
      throw 'Http port should be configured in conf.js file';

    app.listen(conf.http.port, function() {
      console.log('HTTP api listening on port ' + conf.http.port);
    });
  }
}
