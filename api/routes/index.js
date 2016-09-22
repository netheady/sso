'use strict';

module.exports = function (req, res) {
  res.send('Hello World! ' + req.headers['user-agent']);
};
