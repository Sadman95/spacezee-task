import express from 'express'
import { ProfileController } from './profile.controller'
import validateRequest from '@middlewares/validateRequest';
import { ProfileValidation } from './profile.validation';
import { SecureCommunication } from '@utils/SecureCommunication';
const router = express.Router()

/* 
==============
Profile Routes
==============
*/

router
  .post(
    '/',
    validateRequest(ProfileValidation.createProfileZodValidation),
    SecureCommunication.verifyRequest,
    ProfileController.createProfile
  )
  .get(
    '/:userId',
    validateRequest(ProfileValidation.getProfileValidation),
    SecureCommunication.verifyRequest,
    ProfileController.getProfile
  );

export const ProfileRoutes = router
