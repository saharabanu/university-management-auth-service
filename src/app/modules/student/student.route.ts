import express from 'express';
import { StudentsController } from './student.controller';

const router = express.Router();

router.get('/', StudentsController.getAllStudents);
router.get('/:id');
router.delete('/:id');
router.patch('/:id');

export const StudentRoute = router;
