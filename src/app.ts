import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import usersRouter from './app/modules/users/user.route'

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users/', usersRouter)

// for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Work Successfully')
})

export default app

// "no-console": "error",
// "no-undef": "error",
// "no-unused-expressions": "error",
// "no-unreachable": "error",

// .vscode, setting.json file e {
//     "editor.codeActionsOnSave":{
//       "source.fixAll.eslint":true,
//       "source.organizeImports":true
//   }
// }
