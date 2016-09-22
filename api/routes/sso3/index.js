'use strict';
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const config = require('../../config.js');

var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
  var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
  var publicKey = fs.readFileSync(absolutePath, "utf8");
  var buffer = new Buffer(toEncrypt);
  var encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
};

module.exports = function (req, res) {
  const certificate = path.join(__dirname + '../../..' + config.web.publicKey);
  const options = {
    userId: '1682004',
    programId: '04018984',
    currDate: '092120161426'
  };

  const tokenStr = `<?xml version="1.0" encoding="utf-8" ?><login><puid>${options.userId}</puid><programid>${options.programId}</programid><timestamp>${options.currDate}</timestamp></login>`;

  const result = encryptStringWithRsaPublicKey(tokenStr, certificate);

  res.send({
    encrypted: result
  });

};
