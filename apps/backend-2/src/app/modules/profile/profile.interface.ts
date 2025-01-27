import { Model } from 'mongoose'

/* Profile Schema Type */
export type IProfileSchema = {
  id: string
  userId: string
  bio: string
  interests: string[]
}

// type for creating profile
export type CreateProfileDTO = Pick<IProfileSchema, 'userId' | 'bio' | 'interests'>;

//types for instance methods
export type IProfileMethods = {
  isProfileExists(obj: {
    id?: string
    userId?: string
  }): Promise<Partial<IProfileSchema> | null>
}

//types for static methods
export type ProfileModel = {
  /*
   * Pick<type, properties we want to access(or)>
   * */
  isProfileExists(obj: {
    id?: string
    userId?: string
  }): Promise<Pick<
    IProfileSchema,
    | 'id'
    | 'userId'
    | 'bio'
    | 'interests'
  > | null>
} & Model<IProfileSchema, Record<string, unknown>, IProfileMethods>


