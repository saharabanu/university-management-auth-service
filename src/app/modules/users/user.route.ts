import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.post('/create', UserController.createUserController)

export const UserRoute = router
