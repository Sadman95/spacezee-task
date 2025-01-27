import ApiError from '@errors/ApiError';
import httpStatus from 'http-status';
import { CreateProfileDTO } from './profile.interface';
import { Profile } from './profile.model';

/**
 * ===============
 * Profile service
 * ===============
 */
export class ProfileService {
  /**
   * @summary create profile service
   * @param payload
   */
  static async createProfile(payload: CreateProfileDTO) {
    const { userId, bio, interests } = payload;

    const profile = new Profile({ userId, bio, interests });

    return profile.save();
  }

  /**
   * @summary get profile service
   * @param userId
   * @returns Promise<Document>
   */
  static async getProfileById(userId: string) {

    const profile = await Profile.findOne({ userId }).select('bio interests -_id');

    if (!profile)
      throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found!');

    return profile;
    
  }
}
