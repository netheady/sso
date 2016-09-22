var bodyParser = require('body-parser');

function generateError(req, res, next) {
  next(new Error(req.body.messages[0]));
}

module.exports = [ bodyParser.json(), generateError ];
