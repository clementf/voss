var secrets = require('./secrets');

module.exports = {

  eventTypes: {

  },
  channels: {
    slack: {
      channel: secrets.slack.channel,
      username: secrets.slack.username,
      uri: secrets.slack.webhookUri,
    },
    keen: {
      projectId: secrets.keen.projectId,
      writeKey: secrets.keen.writeKey
    }
  }
}
