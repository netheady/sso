var uncaught = require('uncaught-exception');

var config = require('./config.js');

var log = require('bunyan').createLogger(config.log);
log.info('sso.api is starting on port %d.', config.web.port);

var stats = require('stats')('sso', config.stats);
stats.increment('api.process.start');

uncaught.configure({ log: log, stats: stats.withPrefix('sso.api') });

var createServer = require('./server.js');
createServer({
  config: config,
  stats: stats,
  logger: log
}, function () {
  log.info('sso.api service started successfully.');
});
