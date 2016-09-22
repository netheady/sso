'use strict';
const NodeRSA = require('node-rsa');

//  THIS IS USING PUBLIC KEY
module.exports = function (req, res) {
  const keyData = '-----BEGIN PUBLIC KEY-----\n' +
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp3WDbytqM5kapjHIXtM6\n'+
  '+0Vbuzqj6BFuvGYkGBTLN12lE7LsNNkyWPhgspua+YOpjmiyWNx1rXnxXyCMxtT4\n'+
  'E8nSZ4D7q8RqsLDE8TixBDWsQh8wrKdLsdW8tCAzLRnGCGHrb8rowqBPAOae8kk3\n'+
  'oHN57FrO0DCuwrOu/c7abx3+MOmc41DN+QkYGvitCH7idi3ciliAQ0raGrFGMS3a\n'+
  'Uz5xlC98UOlGygjO3VBc94Tlm6S/l8KaU7tEFf/grPtqiK8/drM2KZCfznoEVpRY\n'+
  'oS6uDmJjHko/YltgRdgepRoQzXkhWEBvAybXK5EczH3/545p6/Z4Mbc3Xqd5G+TL\n'+
  'HwIDAQAB\n'+
  '-----END PUBLIC KEY-----\n';

  var key = new NodeRSA();
  key.importKey(keyData);

  const options = {
    userId: '1682004',
    programId: '04018984',
    currDate: '092120161426'
  };

  const tokenStr = `<?xml version="1.0" encoding="utf-8" ?><login><puid>${options.userId}</puid><programid>${options.programId}</programid><timestamp>${options.currDate}</timestamp></login>`;
  const buffer = new Buffer(tokenStr, 'utf-8');

  const encrypted = key.encrypt(buffer, 'base64');

  res.send({
    token: encrypted
  });

};
