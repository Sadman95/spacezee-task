import { Model } from 'mongoose'

export type IUserSchema = {
  id: string
  username: string
  email: string
  password: string
}

// type for creating user
export type CreateUserDTO = {
  bio: string;
  interests: string[];
} & Pick<IUserSchema, 'username' | 'email' | 'password'>;

//types for instance methods
export type IUserMethods = {
  isUserExists(obj: {
    id?: string
    email?: string
  }): Promise<Partial<IUserSchema> | null>
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}

export type UserModel = {
  //types for static methods
  /*
   * Pick<type, properties we want to access(or)>
   * */
  isUserExists(obj: {
    id?: string
    email?: string
  }): Promise<Pick<
    IUserSchema,
    | 'id'
    | 'username'
    | 'email'
    | 'password'
  > | null>
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUserSchema, Record<string, unknown>, IUserMethods>

export type IUserFilterableOptions = {
  searchTerm?: string
  id?: string
}

