var conf = require('../conf');
var Slack = require('slack-node');


slack = new Slack();
slack.setWebhook(conf.channels.slack.uri);

module.exports = {
  send: function(msg, callback) {
    slack.webhook({
      channel: conf.channels.slack.channel,
      username: conf.channels.slack.username,
      text: msg
    }, function(err, response) {
      callback(err, response);
    });
  }
}
