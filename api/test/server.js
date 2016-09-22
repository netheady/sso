var config = require('../config');
var createServer = require('../server');
var log = require('bunyan').createLogger({ name: 'test', level: 'fatal' });
var stats = require('stats')();
var supertest = require('supertest');

describe('web server', function () {
  var server;
  before(function (done) {
    server = createServer({ config: config, logger: log, stats: stats }, done);
  });

  after(function () {
    server.close();
  });

  describe('/', function () {
    it('responds', function (done) {
      supertest(server)
        .get('/')
        .expect(200, /Hello World!/, done);
    });
  });

  describe('/health', function () {
    it('responds with process information', function (done) {
      supertest(server)
        .get('/health')
        .expect('content-type', /application\/json/)
        .expect(200, /"sso.api"/, done);
    });
  });

  describe('/health/errors', function () {
    it('responds with 500 error', function (done) {
      supertest(server)
        .post('/health/errors')
        .send({ messages: ['bob'] })
        .expect('content-type', /text/)
        .expect(500, /bob/, done);
    });

    it('responds with json when requested', function (done) {
      supertest(server)
        .post('/health/errors')
        .set('accept', 'application/json')
        .send({ messages: ['bob'] })
        .expect('content-type', /application\/json/)
        .expect(500, /bob/, done);
    });
  });

  describe('404', function () {
    it('handles broken URLs', function (done) {
      supertest(server)
        .get('/brokenurl')
        .expect(404, done);
    });
  });
});
