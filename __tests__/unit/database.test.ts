import { Users, Startups, Comments, Votes, Notifications, Discounts } from '../models';
import { expect } from 'chai';

describe('Database Unit Tests', () => {
  it('should create a new user', async () => {
    const user = await Users.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password_hash: 'hashedpassword',
      role: 'user'
    });
    expect(user).to.have.property('id');
  });

  it('should retrieve a startup by ID', async () => {
    const startup = await Startups.findByPk(1);
    expect(startup).to.not.be.null;
    expect(startup).to.have.property('name');
  });

  it('should add a comment to a startup', async () => {
    const comment = await Comments.create({
      user_id: 1,
      startup_id: 1,
      content: 'Great startup!'
    });
    expect(comment).to.have.property('id');
  });

  it('should upvote a startup', async () => {
    const vote = await Votes.create({
      user_id: 1,
      startup_id: 1,
      vote_type: 'upvote'
    });
    expect(vote).to.have.property('id');
  });

  it('should create a notification', async () => {
    const notification = await Notifications.create({
      user_id: 1,
      type: 'comment',
      content: 'You have a new comment',
      is_read: false
    });
    expect(notification).to.have.property('id');
  });

  it('should create a discount code', async () => {
    const discount = await Discounts.create({
      startup_id: 1,
      code: 'SAVE10',
      description: '10% off on all services',
      expiry_date: new Date()
    });
    expect(discount).to.have.property('id');
  });
});