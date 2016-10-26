var q = 'event-handler';
var open = require('amqplib').connect('amqp://localhost');
var slackChannel = require('../channels/slack')

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
            slackChannel.send(msg.content.toString(), function(err, response) {
              if (err)
                console.log('error from slack : ' + err);
            })
            ch.ack(msg);
          }
        });
      });
    }).catch(console.warn);
  }
}
