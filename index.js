var handlers = require('./handlers');

// starts listening on amqp channel
handlers.amqp.listen();

//starts listening on http api
handlers.http.listen();
