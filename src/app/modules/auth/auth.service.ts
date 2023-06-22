import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { ILoggedInUser } from './auth.interface';
import bcrypt from 'bcrypt';

const logInUser = async (payload: ILoggedInUser) => {
  const { id, password } = payload;

  const isUserExist = await User.findOne(
    { id },
    {
      id: 1,
      password: 1,
      needsPasswordChange: 1,
    }
  );
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isPasswordExist = await bcrypt.compare(password, isUserExist?.password);
  if (!isPasswordExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  return {};
};
export const AuthService = {
  logInUser,
};
