var expect = require('chai').expect;
var validator = require('../handlers/validator');

describe('Check event', function() {

  it('should return false when the event is null', function() {
    expect(validator.checkMessage(null)).to.be.false
  });

  it('should return false when the event is an empty object', function() {
    expect(validator.checkMessage({})).to.be.false
  });

  it('should return false when the event is an empty array', function() {
    expect(validator.checkMessage([])).to.be.false
  });

  it('should return false when the event is an array', function() {
    expect(validator.checkMessage([2, 3, 'klj'])).to.be.false
  });

  it('should return false when the event is undefined', function() {
    expect(validator.checkMessage(undefined)).to.be.false
  });

  it('should return false when the event has no event type', function() {
    expect(validator.checkMessage({
      qslk: 'qsmlj'
    })).to.be.false
  });

  it('should return false when the event has no friendly message', function() {
    expect(validator.checkMessage({
      eventType: 'qsmlj'
    })).to.be.false
  });

  it('should return false when the event has no content', function() {
    expect(validator.checkMessage({
      eventType: 'qsmlj',
      friendlyMessage: 'qsd'
    })).to.be.false
  });

  it('should return false when the content of the event is empty', function() {
    expect(validator.checkMessage({
      eventType: 'qsmlj',
      friendlyMessage: 'qsd',
      content: {}
    })).to.be.false
  });


});
