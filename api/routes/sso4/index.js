'use strict';
const crypto2 = require('crypto2');
const path = require('path');
const config = require('../../config.js');

module.exports = function (req, res) {
  const certificate = path.join(__dirname + '../../..' + config.web.publicKey);
  
  const options = {
    userId: '1682004',
    programId: '04018984',
    currDate: '092120161426'
  };

  const tokenStr = `<?xml version="1.0" encoding="utf-8" ?><login><puid>${options.userId}</puid><programid>${options.programId}</programid><timestamp>${options.currDate}</timestamp></login>`;
  const buffer = new Buffer(tokenStr, 'utf-8');

  crypto2.readPublicKey(certificate, (err, publicKey) => {
    crypto2.encrypt.rsa('buffer', publicKey, (err, encrypted) => {
      return {
        error: err,
        token: encrypted
      }
    });
  });



};
