'use strict';

module.exports = function (req, res) {
  res.send({
    name: 'sso.api',
    pid: process.pid,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  });
};
