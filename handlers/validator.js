module.exports = {
  checkMessage: function(message) {
    //check non null msg
    if (message == undefined || message == null) {
      console.log('Invalid message : null');
      return false;
    }
    if (!message.eventType) {
      console.log('Invalid message : event type not specified');
      return false;
    }
    if (!message.friendlyMessage) {
      console.log('Invalid message : friendly message not specified');
      return false;
    }
    if (!message.content || (Object.keys(message.content).length === 0 && message.content.constructor === Object)) {
      console.log('Invalid message : content is empty');
      return false;
    }
    return true;
  }
}
