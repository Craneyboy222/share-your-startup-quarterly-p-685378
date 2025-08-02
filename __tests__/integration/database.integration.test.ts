import request from 'supertest';
import app from '../app';
import { expect } from 'chai';

describe('Database Integration Tests', () => {
  it('GET /api/startups should return all startups', async () => {
    const response = await request(app).get('/api/startups');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('POST /api/startups should create a new startup', async () => {
    const response = await request(app).post('/api/startups').send({
      user_id: 1,
      name: 'New Startup',
      url: 'http://newstartup.com',
      location: 'New York',
      stage: 'seed',
      goals: 'Expand user base',
      discount: '10% off'
    });
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
  });

  it('POST /api/startups/:id/comments should add a comment to a startup', async () => {
    const response = await request(app).post('/api/startups/1/comments').send({
      user_id: 1,
      content: 'Amazing startup!'
    });
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
  });

  it('POST /api/startups/:id/vote should upvote a startup', async () => {
    const response = await request(app).post('/api/startups/1/vote').send({
      user_id: 1,
      vote_type: 'upvote'
    });
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('id');
  });

  it('GET /api/user/notifications should return user notifications', async () => {
    const response = await request(app).get('/api/user/notifications');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
});