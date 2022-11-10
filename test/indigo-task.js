/*
 * Title: Cron router
 * Description: Hits here when the client requests for Cron job manually
 * Author: Saud M.
 * Date: 2022-11-09
 */


const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../index');

// assertion
chai.should();

chai.use(chaiHTTP);

describe('Tasks API', () => {
  // test cron job to find whether the data from APIs goes to the DB or not
  /* describe('GET /api/v1/cron', () => {
    it('It should get all the stations at given time', async () => {
      const res = await chai.request(server).get('/api/v1/cron');
      
      res.should.have.status(200);
    });
  }); */

  // test to get all the stations with a valid timestamp
  const timestamp = '2022-11-08T13:33:24';

  describe(`GET /api/v1/stations?at=${timestamp}`, () => {
    it('It should get all the stations at given time', async () => {
      const res = await chai.request(server).get(`/api/v1/stations?at=${timestamp}`);
      
      res.should.have.status(200);
    });
  });

  // test to get all the stations with an invalid timestamp
  const timestamp2 = '2023-11-08T13:33:24';

  describe(`GET /api/v1/stations?at=${timestamp2}`, () => {
    it('It should not get all the stations at given time', async () => {
      const res = await chai.request(server).get(`/api/v1/stations?at=${timestamp2}`);
      
      res.should.have.status(404);
    });
  });

  // test to get a station with a valid kioskID
  const kioskID = 3004;
  const timestamp3 = '2022-11-08T13:33:24';

  describe(`GET /api/v1/stations/${kioskID}?at=${timestamp3}`, () => {
    it('It should get the station by kioskID at given time', async () => {
      const res = await chai.request(server).get(`/api/v1/stations/${kioskID}?at=${timestamp3}`);
      
      res.should.have.status(200);
      res.body.should.be.an('object');
    });
  });

  // test to get a station with an invalid kioskID
  const kioskID2 = 3003;

  describe(`GET /api/v1/stations/${kioskID2}?at=${timestamp3}`, () => {
    it('It should get the station by kioskID at given time', async () => {
      const res = await chai.request(server).get(`GET /api/v1/stations/${kioskID2}?at=${timestamp3}`);
      
      res.should.have.status(404);
    });
  });
});