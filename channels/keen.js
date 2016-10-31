var conf = require('../conf');
var KeenTracking = require('keen-tracking');

// Configure a client instance
var client = new KeenTracking({
  projectId: conf.channels.keen.projectId,
  writeKey: conf.channels.keen.writeKey
});


module.exports = {
  send: function(collection, event, callback){
    client.recordEvent(collection, event, callback);
  }
}
