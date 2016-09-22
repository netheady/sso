'use strict';

var express = require('express');
var bunyanExpress = require('express-bunyan-logger');
var favicon = require('serve-favicon');
var helmet = require('helmet');

module.exports = function createServer(deps, cb) {
  var app = express();

  // express configs
  var config = deps.config.web;
  app.set('env', config.env);
  app.set('protocol', config.protocol);
  app.set('host', config.host);
  app.set('port', config.port);
  app.set('trust proxy', true);

  app.use(helmet());
  app.use(require('stats-middleware')(deps.stats));

  app.get('/health', require('./routes/health'));
  app.get('/sso', require('./routes/sso'));
  app.get('/sso2', require('./routes/sso2'));
  app.get('/sso3', require('./routes/sso3'));
  app.get('/sso4', require('./routes/sso4'));
  app.post('/health/errors', require('./routes/health/errors'));

  //above logging to not spam logs with favicon requests
  app.use(favicon(__dirname + '/public/favicon.png'));

  // Middleware
  app.use(bunyanExpress({
    logger: deps.logger,
    excludes: config.log.excludes,
    format: config.log.format
  }));

  app.use(express.static(__dirname + '/public'));

  // Routes
  // Default hello world route
  app.get('/', require('./routes'));

  // Handle 404s (ajax & server)
  app.use(require('./routes/on-not-found.js'));

  // Error handler (ajax & server)
  app.use(require('./routes/on-error.js'));

  var server = app.listen(config.port, cb);
  app.close = server.close.bind(server);

  return app;
};
