import express from 'express'
import { UserController } from './user.controller'
import { userValidation } from './user.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create',
  validateRequest(userValidation.createUserZodSchema),
  UserController.createUserController
)

export const UserRoute = router
