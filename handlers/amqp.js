var open = require('amqplib').connect('amqp://localhost');
var validator = require('./validator.js');
var slackChannel = require('../channels/slack');
var keenChannel = require('../channels/keen');
var mongoChannel = require('../channels/mongo');

var queueName = 'event-handler';

module.exports = {
  listen: function() {
    // Consumer
    open.then(function(conn) {
      return conn.createChannel();
    }).then(function(ch) {
      console.log('AMQP api listening for incoming messages');

      return ch.assertQueue(queueName).then(function(ok) {
        return ch.consume(queueName, function(msg) {
          if(validator.checkMessage(msg)){
            message = JSON.parse(msg.content.toString());

            slackChannel.send(message.friendlyMessage, function(err, response) {
              if (err)
                console.log('error from slack : ' + err);
            });

            keenChannel.send(message.eventType, message.content, function(err, res){
              if (err)
                console.log('error from keen : ' + err);
            });
            mongoChannel.send(message.eventType, message, function(err, res){
              if (err)
                console.log('error from mongo : ' + err);
            });
            ch.ack(msg);
          }
        });
      });
    }).catch(console.warn);
  }
}
