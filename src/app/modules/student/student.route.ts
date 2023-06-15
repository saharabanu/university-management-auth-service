import express from 'express';
import { StudentsController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/:id', StudentsController.getSingleStudent);
router.delete('/:id', StudentsController.deleteStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentsController.updateStudent
);
router.get('/', StudentsController.getAllStudents);

export const StudentRoute = router;
