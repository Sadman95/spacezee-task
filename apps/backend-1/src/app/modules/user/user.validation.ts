import mongoose from 'mongoose';
import { z } from 'zod';


/*
================================
Schema validation -> create user
================================
*/
const createUserZodValidation = z.object({
  body: z.object({
    username: z
      .string({
        required_error: 'Name is required',
      })
      .min(3)
      .max(20),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Please enter a valid email address',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
    bio: z.string({
      required_error: 'Bio is required',
    }),
    interests: z.array(z.string()).nonempty("Can't be empty!"),
  }),
});



/* 
============================= 
Param validation -> get user
=============================
*/
const getUserValidation = z.object({
  id: z.string().refine(id => mongoose.Types.ObjectId.isValid(id), {
    message: 'Invalid ID',
  }),
});

export const UserValidation = {
  createUserZodValidation,
  getUserValidation,
};
