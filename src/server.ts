import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function databaseConnection() {
  await mongoose.connect(config.database_url as string)
  console.log('Database connected successfully')

  app.listen(config.port, () => {
    console.log(
      `university management project is  listening on port ${config.port}`
    )
  })
}

databaseConnection()
