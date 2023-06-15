import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);
router.delete('/:id', FacultyController.deleteFaculty);
router.patch('/:id');
router.get('/', FacultyController.getAllFacultys);

export const FacultyRoute = router;
