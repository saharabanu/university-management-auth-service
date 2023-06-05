import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

async function databaseConnection() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database connected successfully')

    app.listen(config.port, () => {
      logger.info(
        `university management project is  listening on port ${config.port}`
      )
    })
  } catch (error) {
    errorLogger.error('Failed to connect database', error)
  }
}

databaseConnection()
