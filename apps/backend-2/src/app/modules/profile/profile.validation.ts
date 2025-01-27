import mongoose from 'mongoose';
import { z } from 'zod';


/*
===================================
Schema validation -> create profile
===================================
*/
const createProfileZodValidation = z.object({
  body: z.object({
    userId: z.string().refine(id => mongoose.Types.ObjectId.isValid(id), {
      message: 'Invalid ID',
    }),
    bio: z.string({
      required_error: 'Bio is required',
    }),
    interests: z.array(z.string()).nonempty("Can't be empty!"),
  }),
});



/* 
=============================== 
Param validation -> get profile
===============================
*/
const getProfileValidation = z.object({
  params: z.object({
    userId: z.string().refine(id => mongoose.Types.ObjectId.isValid(id), {
      message: 'Invalid ID',
    }),
  }),
});

export const ProfileValidation = {
  createProfileZodValidation,
  getProfileValidation,
};
