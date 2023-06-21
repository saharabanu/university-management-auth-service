import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentValidation } from './managementDepartment.validation';
import { ManagementDepartmentController } from './managementDepartment.controller';

const router = express.Router();

router.post(
  '/create-management-department',
  validateRequest(
    ManagementDepartmentValidation.createAndUpdateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);

router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.createAndUpdateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);

router.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartment
);
router.get('/', ManagementDepartmentController.getAllManagementDepartments);

export const ManagementDepartmentRoute = router;
