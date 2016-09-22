'use strict';
const config = require('../../config.js');
const path = require('path');
const x509 = require('x509');
const forge = require('node-forge');

module.exports = function (req, res) {
  const certificate = path.join(__dirname + '../../..' + config.web.cert);
  const cert = x509.parseCert(certificate);
  const pubPem  = forge.pki.publicKeyToPem(cert.publicKey);
  const pub = forge.pki.publicKeyFromPem(pubPem);

  const options = {
    userId: '1682004',
    programId: '04018984',
    currDate: '092120161426'
  };

  const tokenStr = `<?xml version="1.0" encoding="utf-8" ?><login><puid>${options.userId}</puid><programid>${options.programId}</programid><timestamp>${options.currDate}</timestamp></login>`;
  const buffer = new Buffer(tokenStr, 'utf-8');
  const encrypted = pub.encrypt(buffer);
  const value = forge.util.encode64(encrypted);

  res.send({
    key: cert.publicKey,
    tokenStr: tokenStr,
    token: value
  });
};
