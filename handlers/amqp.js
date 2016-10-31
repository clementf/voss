var q = 'event-handler';
var open = require('amqplib').connect('amqp://localhost');
var slackChannel = require('../channels/slack')
var keenChannel = require('../channels/keen')

module.exports = {
  listen: function() {
    // Consumer
    open.then(function(conn) {
      return conn.createChannel();
    }).then(function(ch) {
      console.log('listening for incoming messages');
      return ch.assertQueue(q).then(function(ok) {
        return ch.consume(q, function(msg) {
          if (msg !== null) {
            message = JSON.parse(msg.content.toString());

            slackChannel.send(message.friendlyMessage, function(err, response) {
              if (err)
                console.log('error from slack : ' + err);
            });

            keenChannel.send(message.eventType, message.content, function(err, res){
              if (err)
                console.log('error from keen : ' + err);
            });
            ch.ack(msg);
          }
        });
      });
    }).catch(console.warn);
  }
}
