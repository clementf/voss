var q = 'event-handler';
var open = require('amqplib').connect('amqp://localhost');

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
            console.log(msg.content.toString());
            ch.ack(msg);
          }
        });
      });
    }).catch(console.warn);
  }
}
