var secrets = require('./secrets');

module.exports = {

  eventTypes: {

  },
  http: {
    port: 3465
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
    },
    mongo: {
      url: secrets.mongo.url
    }
  }
}
