import bcrypt from 'bcrypt';
import { User } from './user.model';
import { CreateUserDTO, IUserSchema } from './user.interface';
import ApiError from '@errors/ApiError';
import httpStatus from 'http-status';
import { SecureCommunication } from '@utils/SecureCommunication';

/**
 * ============
 * User service
 * ============
 */
export class UserService {
  /**
   * @summary create new user service
   * @param payload
   */
  static async createUser(payload: CreateUserDTO) {
    const { username, email, password, bio, interests } = payload;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });

    await SecureCommunication.postToBackend2('/profile', {
      userId: user._id,
      bio,
      interests,
    });

    return user.save();
  }

  /**
   * @summary get user service
   * @param userId
   * @returns Promise<IUserSchema>
   */
  static async getUserById(userId: string): Promise<IUserSchema> {
    const user = await User.findById(userId).select('username email');

    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');

    const profileResponse = await SecureCommunication.fetchFromBackend2(
      `/profile/${user._id.toString()}`
    );

    if (!profileResponse.data)
      throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found!');

    return {
      ...user?.toObject(),
      ...profileResponse.data,
    };
  }
}
