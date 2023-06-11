import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemister/academicSemester.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema)
);

export const UserRoute = router;
