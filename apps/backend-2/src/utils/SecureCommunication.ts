import config from '@config/index';
import ApiError from '@errors/ApiError';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

/**
 * Secure communication channel
 */
export class SecureCommunication {
  private static readonly secretKey = config.secret_key;

  /**
   * verify request from backend-1
   * @param endpoint
   * @param data
   */
  static verifyRequest(req: Request, response: Response, next: NextFunction) {
    
    const authHeader = req.headers.authorization

    if (!authHeader || authHeader !== `Bearer ${SecureCommunication.secretKey}`) throw new ApiError(httpStatus.FORBIDDEN, "Unauthorized access!")
    
    next()

  }

}
