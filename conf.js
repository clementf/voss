var secrets = require('./secrets');

module.exports = {
  channels : {
    slack : {
      channel: secrets.slack.channel,
      username: secrets.slack.username,
      uri: secrets.slack.webhookUri,
    }
  }
}
