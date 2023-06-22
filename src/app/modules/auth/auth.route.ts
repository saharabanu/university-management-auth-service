import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

export const AuthRoute = router;
