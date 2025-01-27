import catchAsync from '@shared/catchAsync';
import sendResponse from '@shared/sendResponse';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ProfileService } from './profile.service';

/**
 * =================
 * ProfileController
 * =================
 */
export class ProfileController {
  // create profile controller
  public static readonly createProfile = catchAsync(
  
    async (req: Request, res: Response) => {

      const { ...payload } = req.body;

      const profile = await ProfileService.createProfile(payload);

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        data: profile,
        message: 'Profile created successfully!',
      });

    }
  );

  // get uprofile controller
  public static readonly getProfile = catchAsync(
  
    async (req: Request, res: Response) => {

      const userId = req.params.userId;

      const profile = await ProfileService.getProfileById(userId);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: profile,
      });

    }
  );
}
