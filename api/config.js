'use strict';

var bunyan = require('bunyan');
var serializer = require('bunyan-err-serializer');

module.exports = require('rc')('sso', {
  log: {
    name: 'sso.api',
    serializers: {
      res: bunyan.stdSerializers.res,
      req: bunyan.stdSerializers.req,
      err: serializer
    },
    level: 'info'
  },
  web: {
    env: 'production',
    host: 'localhost',
    log: {
      excludes: ['body', 'short-body', 'req-headers', 'res-headers', 'incoming'],
      format: ':res[statusCode] :method'
    },
    port: 8085,
    protocol: 'https',
    cert: '/certs/SonyRewards.pem',
    publicKey: '/certs/publickey.pem'
  },
  stats: {
    host: 'statsd.dev.360incentives.io'
  }
});
