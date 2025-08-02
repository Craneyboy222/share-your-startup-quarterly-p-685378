import { getUserProfile, updateUserProfile } from '../services/user';
import { mockUser, updatedUserProfile } from '../test-utils/mocks';

describe('User Unit Tests', () => {
  it('should return user profile', async () => {
    const profile = await getUserProfile(mockUser.id);
    expect(profile).toMatchObject({ username: mockUser.username });
  });

  it('should update user profile', async () => {
    const updatedProfile = await updateUserProfile(mockUser.id, updatedUserProfile);
    expect(updatedProfile).toMatchObject(updatedUserProfile);
  });
});