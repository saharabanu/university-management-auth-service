import { generateUserId } from './user.utils'
import { Request, Response } from 'express'
import userService from './user.service'

const createUserController = async (req: Request, res: Response) => {
  try {
    const id = await generateUserId()
    // const password = await config.default_user_pass;

    const { user } = req.body
    user.id = id
    user.password = 'password'

    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
    console.log(result)
  } catch (error) {
    console.log(error)

    res.status(400).json({
      success: false,
      message: 'Failed to create User',
    })
  }
}

export default {
  createUserController,
}
