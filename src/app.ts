import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'


// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users/', usersRouter)

// for testing
// app.get('/', (req: Request, res: Response) => {
//   res.send('Work Successfully')
// })
app.get('/', async (req: Request, res: Response) => {
  // const {user} = req.body;
  await userService.createUser({
    id: '5555',
    role: 'student',
    password: '123456',
  })
  res.send('Work Successfully')
})

export default app
