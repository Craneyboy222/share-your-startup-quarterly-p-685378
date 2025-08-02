import { authenticateUser, registerUser } from '../services/auth';
import { mockUser } from '../test-utils/mocks';

describe('Authentication Unit Tests', () => {
  it('should authenticate a user with valid credentials', async () => {
    const result = await authenticateUser(mockUser.email, 'validPassword');
    expect(result).toHaveProperty('token');
  });

  it('should throw an error for invalid credentials', async () => {
    await expect(authenticateUser(mockUser.email, 'invalidPassword')).rejects.toThrow('Invalid credentials');
  });

  it('should register a new user', async () => {
    const result = await registerUser(mockUser);
    expect(result).toHaveProperty('id');
  });
});