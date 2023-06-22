/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
// for methods
userSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { id },
    {
      id: 1,
      password: 1,
      needsPasswordChange: 1,
      role: 1,
    }
  );
};
userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// for hashing password

userSchema.pre('save', async function (next) {
  // hashing password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
