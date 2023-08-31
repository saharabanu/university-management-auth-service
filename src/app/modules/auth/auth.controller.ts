import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import config from '../../../config';

// Post for login
const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...logInUserData } = req.body;
  const result = await AuthService.logInUser(logInUserData);

  const { refreshToken, ...others } = result;
  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  // delete result.refreshToken // it is not recommended
  // if("refreshToken" in result) {
  //   delete result.refreshToken
  // }

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'LoggedIn User  successfully !',
    data: others,
  });
});

// post for refresh token
const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'LoggedIn User RefreshToken done successfully !',
    data: result,
  });
});

// change password
const changePassword: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  console.log(req.user);
  const { ...passwordData } = req.body;
  await AuthService.changePassword(user, passwordData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'change password User  successfully !',
  });
});
export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
