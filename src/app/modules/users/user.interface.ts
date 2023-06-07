import { Model } from 'mongoose'

export type IUser = {
  id: string
  role: string
  password: string
}

// we can use static method in future so it is defined
export type UserModel = Model<IUser, Record<string, unknown>>
