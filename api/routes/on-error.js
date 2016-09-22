'use strict';

module.exports = function (err, req, res, next) {
  /* istanbul ignore if */
  if (res.headersSent) {
    // allow express error handler to cleanup connection
    return next(err);
  }

  res.status(500);

  if (req.accepts('html') || !req.accepts('json')) {
    res.send(err.message);
  } else {
    res.json({ name: err.name, message: err.message });
  }
};
