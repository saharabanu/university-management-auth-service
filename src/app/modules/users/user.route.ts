import express from 'express';
import { UserController } from './user.controller';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from '../faculty/faculty.validation';
import { FacultyController } from '../faculty/faculty.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(userValidation.createUserZodSchema),
  UserController.createStudent
);
router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyZodSchema),
  FacultyController.createFaculty
);

export const UserRoute = router;
