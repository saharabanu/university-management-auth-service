import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { ILoggedInUser, ILoginUserResponse } from './auth.interface';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';

const logInUser = async (
  payload: ILoggedInUser
): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // to create new use for instance method
  const user = new User();
  const isUserExist = await user.isUserExist(id);
  // for is userExist
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // for is is PasswordMatched
  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  // create access and refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  console.log(accessToken, refreshToken, needsPasswordChange);

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};
export const AuthService = {
  logInUser,
};
