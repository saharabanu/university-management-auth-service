import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import {
  ILoggedInUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { JwtPayload, Secret } from 'jsonwebtoken';
//login
const logInUser = async (
  payload: ILoggedInUser
): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // to create new use for instance method

  const isUserExist = await User.isUserExist(id);
  // for is userExist
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // for is is PasswordMatched
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
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

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

//refresh token

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  // verify token
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    // err
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh token');
  }

  const { userId }: any = verifiedToken;
  // checking deleted User refresh token
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //generate token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

//change password

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword } = payload;

  // const isUserExist = await User.isUserExist(user?.userId);
  // alternative way

  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );
  console.log(isUserExist);

  // for is userExist
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // checking old password

  // for is is PasswordMatched
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  // // hass password

  // const newHashPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bcrypt_salt_round)
  // );

  // // update password

  // const updatedData = {
  //   password: newHashPassword,
  //   needsPasswordChange: false,
  //   passwordChangeAt: new Date(),
  // };

  // const query = { id: user?.userId };
  // await User.findOneAndUpdate(query, updatedData);

  // updating

  isUserExist.needsPasswordChange = false;
  // isUserExist = newPassword
  isUserExist.save();
};

export const AuthService = {
  logInUser,
  refreshToken,
  changePassword,
};
