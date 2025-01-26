import bcrypt from 'bcrypt';
import { User } from './user.model';
import { CreateUserDTO } from './user.interface';
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

    await SecureCommunication.postToBackend2('/profile', { userId: user._id, bio, interests });

    return user.save();
  }

  /**
   * @summary get user service
   * @param userId
   * @returns Promise<CreateUserDTO>
   */
  static async getUserById(userId: string): Promise<CreateUserDTO> {

    const user = await User.findById(userId).select("username email")
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!")
    
    const { bio, interests } = await SecureCommunication.fetchFromBackend2(`/profile/${userId}`)
    
    if(!bio || !interests) throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found!');

    return {
      ...user?.toObject(),
      bio,
      interests
    }
  }
}
