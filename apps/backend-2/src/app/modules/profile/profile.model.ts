/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IProfileSchema, ProfileModel } from './profile.interface';


/**
 * ==============
 * Profile Schema
 * ==============
 */
const ProfileSchema = new Schema<IProfileSchema, ProfileModel>(
  {
    id: {
      type: String,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    interests: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);


/* check user exist or not */
ProfileSchema.static(
  'isProfileExists',
  async function (obj: {
    id?: string;
    userId?: string;
  }): Promise<Pick<
    IProfileSchema,
    'id' | 'userId'
  > | null> {
    return Profile.findOne(obj, {
      id: 1,
      userId: 1,
      bio: 1,
      interests: 1,
    }).lean();
  }
);


export const Profile = model<IProfileSchema, ProfileModel>('Profile', ProfileSchema)
