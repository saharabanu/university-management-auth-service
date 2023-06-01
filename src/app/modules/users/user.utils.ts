import { User } from './user.model'

// find user by Id
export const findUserById = async () => {
  //if any user admit first time then he will get default id or he can get his last id
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastUser?.id
}

// to find creating current user id

export const generateUserId = async () => {
  const lastUserId = await findUserById()
  const currentId = lastUserId || (0).toString().padStart(5, '0')
  const incrementById = parseInt(currentId) + 1
  return incrementById.toString().padStart(5, '0')
}
