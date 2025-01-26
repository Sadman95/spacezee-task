import catchAsync from '@shared/catchAsync';
import sendResponse from '@shared/sendResponse';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserService } from './user.service';

/**
 * ==============
 * UserController
 * ==============
 */
export class UserController {
  // create user controller
  public static readonly createUser = catchAsync(
    async (req: Request, res: Response) => {
      const { ...payload } = req.body;
      const user = await UserService.createUser(payload);
      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        data: user,
        message: 'User crested successfully!',
      });
    }
  );

  // get user controller
  public static readonly getUser = catchAsync(
    async (req: Request, res: Response) => {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: user,
      });
    }
  );
}
