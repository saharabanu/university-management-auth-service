import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'

// middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Work Successfully')
})

export default app
