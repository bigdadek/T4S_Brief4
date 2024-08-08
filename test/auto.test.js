const request = require('supertest')(server);
const User = require('../models/User');
const jwt = require('jsonwebtoken'); 


const mockUser = {
  email: 'testuser@example.com',
  password: 'password123'
};

describe('Authentication', () => {
  let createdUser;

  beforeEach(async () => {
    const response = await request.post('/api/users/register')
      .send(mockUser);
    createdUser = response.body;
  });

  afterEach(async () => {
    await User.findByIdAndDelete(createdUser._id);
  });

  it('should register a new user', async () => {
    const response = await request.post('/api/users/register')
      .send(mockUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should login a user', async () => {
    const response = await request.post('/api/users/login')
      .send(mockUser);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should fail to login with incorrect credentials', async () => {
    const response = await request.post('/api/users/login')
      .send({ email: 'wrong@example.com', password: 'wrongpassword' });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('should protect a route', async () => {
    const token = jwt.sign({ userId: createdUser._id }, 'your_secret_key'); // Replace with your secret key
    const response = await request.get('/api/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  it('should not access a protected route without a valid token', async () => {
    const response = await request.get('/api/protected');

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
  });
});
