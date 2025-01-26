/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { IUserSchema, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '@config/index';

const UserSchema = new Schema<IUserSchema, UserModel>(
  {
    id: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//hash password
UserSchema.pre('save', async function (next) {

  const user = this

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  )

  next()

})

/* check user exist or not */
UserSchema.static(
  'isUserExists',
  async function (obj: {
    id?: string;
    email?: string;
  }): Promise<Pick<
    IUserSchema,
    'id' | 'email' | 'password'
  > | null> {
    return User.findOne(obj, {
      id: 1,
      username: 1,
      password: 1,
      email: 1,
    }).lean();
  }
);

/* check password match or not */
UserSchema.static(
  'isPasswordMatch',
  async function (
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword)
  }
)

export const User = model<IUserSchema, UserModel>('User', UserSchema)
