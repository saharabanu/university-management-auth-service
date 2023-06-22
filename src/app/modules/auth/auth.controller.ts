import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponse } from './auth.interface';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...logInUserData } = req.body;
  const result = await AuthService.logInUser(logInUserData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'LoggedIn User  successfully !',
    data: result,
  });
});
export const AuthController = {
  loginUser,
};
