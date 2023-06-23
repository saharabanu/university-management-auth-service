import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponse } from './auth.interface';
import config from '../../../config';

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
export const AuthController = {
  loginUser,
};
